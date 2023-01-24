import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BookCard } from "../Cards/Cards";

export const SovetBooks = () => {
	const token = localStorage.getItem("token");
	const [sovetBooks, setSovetBooks] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/book/genreId/15`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setSovetBooks(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [token]);

	return (
		<StyledBooksCardList>
			{sovetBooks.map((item) => (
				<BookCard key={item.id} item={item} />
			))}
		</StyledBooksCardList>
	);
};
export const StyledBooksCardList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin: 0;
	padding: 0;
	list-style: none;
`;
