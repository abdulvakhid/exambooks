import styled from "styled-components";
import {
	StyledContainer,
	StyledInputInfo,
	StyledRegistrBtn,
} from "../../components/Registr/Registr";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const AddAuthor = () => {
	const [file, setFile] = useState(null);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};

	const [genre, setGenre] = useState([]);
	const [author, setAuthor] = useState([]);

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
			first_name: "",
			last_name: "",
			date_of_birth: "",
			date_of_death: "",
			country: "",
			genre_id: "",
			bio: "",
			image: "",
		},
		onSubmit: (values) => {
			const formData = new FormData();
			formData.append("first_name", values.first_name);
			formData.append("last_name", values.last_name);
			formData.append("date_of_birth", values.date_of_birth);
			formData.append("date_of_death", values.date_of_death);
			formData.append("country", values.country);
			formData.append("genre_id", values.genre_id);
			formData.append("bio", values.bio);
			formData.append("image", file);

			axios
				.post("http://localhost:5000/author", formData, {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					if (response.status === 201) {
						setAuthor(response.data);
						navigate("/");
					} else {
						alert("erre");
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});

	return (
		<StyledContainer>
			<StyledAddForm onSubmit={formik.handleSubmit}>
				<StyledFormImgBox>
					<StyledAddImg>
						<Styledimg>
							+
							<Styledimginput
								type="file"
								onChange={handleChange}
								style={{ width: "200px", backgroundColor: "lightgray" }}
							/>
							{file && (
								<img src={`http://localhost:5000/${file}`} alt="Preview" />
							)}
						</Styledimg>
					</StyledAddImg>
				</StyledFormImgBox>
				<StyledAddInputBox>
					<StyledAddInputs>
						<StyledAddInputsTitle>{t("addauthor.topic")}</StyledAddInputsTitle>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="text"
								placeholder={t("addauthor.firstName")}
								name="first_name"
								value={formik.values.first_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.first_name && formik.errors.first_name ? (
								<StyledInputInfo>{formik.errors.first_name}</StyledInputInfo>
							) : (
								""
							)}
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="text"
								placeholder={t("addauthor.lastName")}
								name="last_name"
								value={formik.values.last_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.last_name && formik.errors.last_name ? (
								<StyledInputInfo>{formik.errors.last_name}</StyledInputInfo>
							) : (
								""
							)}
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="number"
								placeholder={t("addauthor.birth")}
								name="date_of_birth"
								value={formik.values.date_of_birth}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.date_of_birth && formik.errors.date_of_birth ? (
								<StyledInputInfo>{formik.errors.date_of_birth}</StyledInputInfo>
							) : (
								""
							)}
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="number"
								name="date_of_death"
								value={formik.values.date_of_death}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("addauthor.death")}
							/>
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddInput
								type="text"
								placeholder={t("addauthor.country")}
								name="country"
								value={formik.values.country}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.country && formik.errors.country ? (
								<StyledInputInfo>{formik.errors.country}</StyledInputInfo>
							) : (
								""
							)}
						</StyledAddErrorInputBox>
						<StyledAddErrorInputBox>
							<StyledAddSelect
								name="genre_id"
								value={formik.values.genre_id}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}>
								<option selected>{t("addauthor.genre")}</option>
								{genre.map((item) => (
									<StyledAddSelectOption key={item.id} value={item.id}>
										{item.name}
									</StyledAddSelectOption>
								))}
							</StyledAddSelect>
						</StyledAddErrorInputBox>

						<StyledAddErrorInputBox>
							<StyledAddTexare
								type="textarea"
								placeholder={t("addauthor.bio")}
								name="bio"
								value={formik.values.bio}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.bio && formik.errors.bio ? (
								<StyledInputInfo>{formik.errors.bio}</StyledInputInfo>
							) : (
								""
							)}
						</StyledAddErrorInputBox>

						<StyledCreateBtn type="submit">
							{t("addauthor.create")}
						</StyledCreateBtn>
					</StyledAddInputs>
				</StyledAddInputBox>
			</StyledAddForm>
		</StyledContainer>
	);
};

export const Styledimg = styled.label`
	border-radius: 4px;
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	position: relative;
	transition: ease-in-out 750ms;

	&::after {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		text-align: center;
		transform: translateY(50%);
		content: "Choose a file...";
		font-style: italic;
		font-size: 1em;
	}

	.has-image::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(50, 50, 50, 0.5);
		content: " ";
		transition: ease-in-out 750ms;
	}

	.has-image::after {
		content: "Choose another file...";
		color: white;
	}
`;

export const Styledimginput = styled.input`
	display: none;
`;

export const StyledAddForm = styled.form`
	display: flex;
	height: 100%;
`;

export const StyledFormImgBox = styled.div`
	padding: 130px;
	background: rgba(243, 243, 243, 0.93);
`;
export const StyledAddImg = styled.div`
	width: 315px;
	height: 428px;
	margin: 0 auto;
	background: #f8f8f8;
	border: 1px dashed rgba(0, 0, 0, 0.3);
	border-radius: 17px;
`;

export const StyledAddInputBox = styled.div`
	background: #ffffff;
	display: flex;
	justify-content: center;
	flex-grow: 1;
`;

export const StyledAddInputs = styled.div`
	width: 350px;
	padding-top: 20px;
	padding-bottom: 30px;
`;

export const StyledAddInputsTitle = styled.h2`
	margin: 0;
	margin-bottom: 12px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 32px;
	line-height: 48px;
	color: #000000;
`;

export const StyledAddErrorInputBox = styled.div`
	margin-bottom: 10px;
`;

export const StyledAddInput = styled.input`
	width: 100%;
	padding: 13px 22px;
	background: #ffffff;
	border: 1px solid #b4b4bb;
	border-radius: 10px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #000;
	&::placeholder {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 21px;
		color: #aaaaaa;
	}
`;

export const StyledAddSelect = styled.select`
	width: 113%;
	padding: 13px 22px;
	background: #ffffff;
	border: 1px solid #b4b4bb;
	border-radius: 10px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #000;
	&option {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 21px;
		color: #aaaaaa;
	}
`;
export const StyledAddSelectOption = styled.option``;

export const StyledAddTexare = styled.textarea`
	width: 100%;
	padding: 13px 22px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #000;
	background: #ffffff;
	border: 1px solid #b4b4bb;
	border-radius: 10px;
	resize: none;
	&::placeholder {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 21px;
		color: #aaaaaa;
	}
`;
export const StyledCreateBtn = styled(StyledRegistrBtn)`
	margin-top: 30px;
`;
