// import React, { useState } from "react";
import styled from "styled-components";
import {
	StyledContainer,
	StyledInputInfo,
} from "../../components/Registr/Registr";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
	StyledAddErrorInputBox,
	StyledAddForm,
	StyledAddImg,
	StyledAddInput,
	StyledAddInputBox,
	StyledAddInputs,
	StyledAddInputsTitle,
	StyledAddSelect,
	StyledAddSelectOption,
	StyledAddTexare,
	StyledCreateBtn,
	StyledFormImgBox,
} from "../AddAuthor/AddAuthor";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
	const navigate = useNavigate();
	const [author, setAuthor] = useState([]);

	const [file, setFile] = useState(null);
	const { t } = useTranslation();
	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};
	const handleClick = (e) => {
		e.preventDefault();
	};
	const [genre, setGenre] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/genre")
			.then((res) => {
				if (res.status === 201) {
					setGenre(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [genre]);
	const token = localStorage.getItem("token");
	const formik = useFormik({
		initialValues: {
			title: "",
			page: "",
			year: "",
			price: "",
			genre_id: "",
			author_id: "",
			description: "",
			image: "",
		},
		onSubmit: (values) => {
			const formData = new FormData();

			formData.append("title", values.title);
			formData.append("page", values.page);
			formData.append("year", values.year);
			formData.append("price", values.price);
			formData.append("genre_id", values.genre_id);
			formData.append("author_id", values.author_id);
			formData.append("description", values.description);
			formData.append("image", file);

			console.log(formik.values.genre_id);

			axios
				.post("http://localhost:5000/book", formData, {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					if (response.status === 201) {
						console.log(response);
						console.log(formik.values.genre_id);
						navigate("/")
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},

		
	});
	
	useEffect(() => {
		console.log(formik.values.genre_id);
		axios
			.get(`http://localhost:5000/author/genreId/${formik.values.genre_id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setAuthor(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [formik.values.genre_id, token]);

	return (
		<StyledContainer>
			<StyledAddForm onSubmit={formik.handleSubmit}>
				<StyledFormImgBox>
					<StyledAddImg>
						<input type="file" onChange={handleChange} className="file-input" />
						<button onClick={handleClick}>Upload</button>
					</StyledAddImg>
				</StyledFormImgBox>
				<StyledAddInputBox>
					<StyledAddInputs>
						<StyledAddInputsTitle>{t("addbook.topic")}</StyledAddInputsTitle>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="text"
								placeholder={t("addbook.title")}
								name="title"
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="text"
								placeholder={t("addbook.pages")}
								name="page"
								value={formik.values.page}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="number"
								placeholder={t("addbook.year")}
								name="year"
								value={formik.values.year}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="text"
								name="price"
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("addbook.price")}
							/>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddSelect
								name="genre_id"
								value={formik.values.genre_id}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}>
								<option selected defaultValue={"dsfs"}>
									genre
								</option>
								{genre.map((item) => (
									<StyledAddSelectOption key={item.id} value={item.id}>
										{item.name}
									</StyledAddSelectOption>
								))}
							</StyledAddSelect>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddSelect
								name="author_id"
								value={formik.values.author_id}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}>
								<StyledAddSelectOption
									selected
									defaultValue={t("addbook.author")}>
									Author
								</StyledAddSelectOption>
								{author.map((item) => (
									<StyledAddSelectOption key={item.id} value={item.id}>
										{item.first_name} {item.last_name}
									</StyledAddSelectOption>
								))}
							</StyledAddSelect>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddTexare
								type="textarea"
								placeholder={t("addbook.bio")}
								name="description"
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</StyledAddErrorInputBox>
						<StyledCreateBtn type="submit">
							{t("addbook.create")}
						</StyledCreateBtn>
					</StyledAddInputs>
				</StyledAddInputBox>
			</StyledAddForm>
		</StyledContainer>
	);
};

export const StyledAddBook = styled.div``;
