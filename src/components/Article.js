import React, { useState, useEffect } from "react";
import Axios from "axios";

const endpoint = "https://rickandmortyapi.com/api/character/";

function Article() {
	const [article, setArticle] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const fetchData = async () => {
		try {
			Axios.get(`${endpoint}?page=${page}`).then((response) => {
				setLoading(true);
				setArticle(response.data.results);
			});
		} catch (error) {
			setError(false);
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, [article]);

	const handleRefresh = () => {
		setArticle(article);
		setPage(1);
		setLoading(false);
		setRefresh(false);
	};
	return (
		<>
			{article.length > 0 ? (
				<div>
					{error && <p>Sorry Cannot Connect!</p>}
					<div class="d-flex justify-content-center my-2">
						<button
							className="btn btn-sm btn-outline-info mx-3"
							disabled={loading}
							onClick={() => setPage((c) => c + 1)}
						>
							Next Character
						</button>
						<button
							className="btn btn-sm btn-outline-primary "
							onClick={handleRefresh}
							disabled={refresh ? <p>Loading...</p> : ""}
						>
							Refresh
						</button>
					</div>
					<div className="container">
						<div class="row">
							{article.map((item, index) => {
								return (
									<div key={index + 1} class="col-sm">
										<div
											className="card mb-3"
											style={{ width: "20rem", maxWidth: "100%" }}
										>
											<div className="card-header">
												<h5 className=" font-weight-light">
													Name: {item.name}
												</h5>
											</div>
											<div className="card-body">
												<a href={item.url}>
													<img
														src={item.image}
														className="img-fluid"
														style={{ width: "100%" }}
														alt={item.name}
													/>
												</a>
											</div>
											<div className="card-footer">
												<p>Status Character: {item.status}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			) : (
				<p className="text-center">Loading...</p>
			)}
		</>
	);
}

export default Article;
