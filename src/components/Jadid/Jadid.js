import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthorCard } from "../Cards/Cards";
import { StyledAuthList } from "../Temuriylar/Temuriylar";

export const Jadid = () => {
	const token = localStorage.getItem("token");
	const [jadid, setJadid] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/genreId/14`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setJadid(res.data);
                    console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [token]);

	return (
		<StyledAuthList>
			{jadid.map((item) => <AuthorCard item={item}/>)}
		</StyledAuthList>
	);
};
