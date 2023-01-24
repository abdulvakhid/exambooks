import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

import { AuthorCard } from "../Cards/Cards";
export const Temuriylar = () => {
	const token = localStorage.getItem("token");
	const [temuriy, setTemuriy] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/genreId/13`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setTemuriy(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [token]);

	return (
		<StyledAuthList>
			{temuriy.map((item) => <AuthorCard key={item.id} item={item}/>)}
		</StyledAuthList>
	);
};

export const StyledAuthList = styled.ul`
margin: 0;
padding: 0;
display: flex;
flex-wrap: wrap;
list-style: none;
`;