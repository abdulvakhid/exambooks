import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthorCard } from "../Cards/Cards";
import { StyledAuthList } from "../Temuriylar/Temuriylar";

export const Sovet = () => {
    const token = localStorage.getItem("token");
	const [sovet, setSovet] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/genreId/15`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setSovet(res.data);
                    console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [token]);

	return (
		<StyledAuthList>
			{sovet.map((item) => <AuthorCard item={item}/>)}
		</StyledAuthList>
	);
}
