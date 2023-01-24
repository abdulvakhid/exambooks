import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/images/avatar.png";
import axios from "axios";

export const AuthorCard = ({ item }) => {
	const { id, image, first_name, last_name, date_of_birth, date_of_death } =
		item;
	return (
		<StyledAuthorCrd>
			<StyledAuthorSingleLink to={`/singleauthor/${id}`}>
				<StyledAuthorImg src={`http://localhost:5000/${image}`} alt="author img" />
				<StyledAuthorContent>
					<StyledAuthorName>
						{first_name} {last_name}
					</StyledAuthorName>
					<StyledAuthorBirth>
						{date_of_birth}-{date_of_death}
					</StyledAuthorBirth>
				</StyledAuthorContent>
			</StyledAuthorSingleLink>
		</StyledAuthorCrd>
	);
};

export const BookCard = ({ item }) => {
	const { id, image, title, author_id } = item;
	console.log(author_id );
	// const { id } = useParams();
	const token = localStorage.getItem("token");
	const [bookAuthor, setBookAuthor] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/authorId/${author_id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setBookAuthor(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [author_id, token]);

	return (
		<StyledAuthorCrd>
			<StyledAuthorSingleLink to={`/singlebook/${id}`}>
				<StyledBookCardImg src={`http://localhost:5000/${image}`} alt="book img" />
				<StyledBookContent>
					<StyledBookNames>{title}</StyledBookNames>
					<StyledBookAuthor>{bookAuthor.first_name} {bookAuthor.last_name}</StyledBookAuthor>
				</StyledBookContent>
			</StyledAuthorSingleLink>
		</StyledAuthorCrd>
	);
};

export const StyledAuthorCrd = styled.li`
	width: 300px;
	margin-bottom: 20px;
	&:not(:last-child) {
		margin-right: 20px;
	}
`;

export const StyledAuthorSingleLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

export const StyledAuthorImg = styled.img`
	width: 100%;
	height: 224px;
	border-radius: 22px 22px 0px 0px;
`;

export const StyledAuthorContent = styled.div`
	padding: 12px 30px 63px 16px;
	background: #f5f5f5;
	border-radius: 0 0 22px 22px;
	background-image: url("../../assets/images/white.png");
	background-repeat: no-repeat;
`;

export const StyledAuthorName = styled.p`
	margin: 0;
	margin-bottom: 8px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 24px;
	line-height: 36px;
	color: #000000;
`;

export const StyledAuthorBirth = styled.p`
	margin: 0;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: rgba(0, 0, 0, 0.6);
`;

export const StyledBookCardImg = styled.img`
	width: 100%;
	height: 283px;
	margin-bottom: 12px;
	border-radius: 15px;
`;
export const StyledBookContent = styled.div``;
export const StyledBookNames = styled.p`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 27px;
	color: #000000;
`;
export const StyledBookAuthor = styled.p`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: rgba(13, 13, 13, 0.6);
`;
