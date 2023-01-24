import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BookCard } from "../Cards/Cards";
import { StyledBooksCardList } from "../Sovet/SovetBooks";

export const MustaqillikBooks = () => {
	const token = localStorage.getItem("token");
	const [mustaqillikBooks, setMustaqillikBooks] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/book/genreId/16`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setMustaqillikBooks(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [token]);

	return (
		<StyledBooksCardList>
			{mustaqillikBooks.map((item) => (
				<BookCard key={item.id} item={item} />
			))}
		</StyledBooksCardList>
	);
};
