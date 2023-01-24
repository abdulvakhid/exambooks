import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import styled from "styled-components";
import registerimg from "../../assets/images/registimg.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTokenRedux } from "../redux/token/tokenAction";
import { AuthContext } from "../../context/AuthContext/auth-context";
import { useTranslation } from "react-i18next";

export const Registr = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { setToken } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name: "",
			phone: "",
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			axios
				.post("http://localhost:5000/user/register", {
					first_name: values.first_name,
					last_name: values.last_name,
					phone: values.phone,
					email: values.email,
					password: values.password,
				})
				.then((response) => {
					if (response.status === 201) {
						setToken(response.data.token);
						dispatch(setTokenRedux(response.data.token));
						navigate("/");
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		validationSchema: Yup.object({
			first_name: Yup.string().required("Required"),
			last_name: Yup.string().required("Required"),
			phone: Yup.string().required("Required"),
			email: Yup.string().email("Email format is invalid").required("Required"),
			password: Yup.string()
				.min(4, "Password must be at least 3 characters")
				.max(8, "Password must be no longer 8 characters ")
				.required("Required"),
		}),
	});

	return (
		<StyledContainer>
			<StyledRegistBox>
				<StyledRegistrImgBox>
					<StyledRegistrImg src={registerimg} alt="registr img" />
				</StyledRegistrImgBox>
				<StyledRegistrFormBox>
					<StyledRegistrForm onSubmit={formik.handleSubmit}>
						<StyledRegistrFormTitle>
							{t("register.title")}
						</StyledRegistrFormTitle>
						<StyledRegistrFormTitleText>
							{t("register.desc")}
							<StyledRegistrFormLoginLink to="/login">
								{t("register.login")}
							</StyledRegistrFormLoginLink>
						</StyledRegistrFormTitleText>

						<StyledRegistrFormInputBox>
							<StyledRegistrFormInput
								type="text"
								name="first_name"
								value={formik.values.first_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("register.fistName")}
							/>
							{formik.touched.first_name && formik.errors.first_name ? (
								<StyledInputInfo>{formik.errors.first_name}</StyledInputInfo>
							) : (
								""
							)}
						</StyledRegistrFormInputBox>
						<StyledRegistrFormInputBox>
							<StyledRegistrFormInput
								type="text"
								name="last_name"
								value={formik.values.last_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("register.lastName")}
							/>
							{formik.touched.last_name && formik.errors.last_name ? (
								<StyledInputInfo>{formik.errors.last_name}</StyledInputInfo>
							) : (
								""
							)}
						</StyledRegistrFormInputBox>
						<StyledRegistrFormInputBox>
							<StyledRegistrFormInput
								type="tel"
								name="phone"
								value={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("register.phone")}
							/>
							{formik.touched.phone && formik.errors.phone ? (
								<StyledInputInfo>{formik.errors.phone}</StyledInputInfo>
							) : (
								""
							)}
						</StyledRegistrFormInputBox>
						<StyledRegistrFormInputBox>
							<StyledRegistrFormInput
								type="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("register.email")}
							/>
							{formik.touched.email && formik.errors.email ? (
								<StyledInputInfo>{formik.errors.email}</StyledInputInfo>
							) : (
								""
							)}
						</StyledRegistrFormInputBox>
						<StyledRegistrFormInputBox>
							<StyledRegistrFormInput
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("register.password")}
							/>
							{formik.touched.password && formik.errors.password ? (
								<StyledInputInfo>{formik.errors.password}</StyledInputInfo>
							) : (
								""
							)}
						</StyledRegistrFormInputBox>
						<StyledRegistrBtn
							disabled={!formik.dirty || !formik.isValid}
							type="submit">
							{t("register.nextBtn")}
						</StyledRegistrBtn>
					</StyledRegistrForm>
				</StyledRegistrFormBox>
			</StyledRegistBox>
		</StyledContainer>
	);
};

export const StyledContainer = styled.div`
	width: 100%;
	max-width: 1280px;
	margin: 0 auto;
	padding: 0 20px;
`;

export const StyledRegistBox = styled.div`
	display: flex;
	width: 100%;
	max-width: 1250px;
	margin: 0 auto;
`;

export const StyledRegistrImgBox = styled.div`
	background: rgba(201, 172, 140, 0.93);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const StyledRegistrImg = styled.img`
	width: 500px;
	height: 500px;
`;

export const StyledRegistrFormBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const StyledRegistrForm = styled.form`
	width: 100%;
	max-width: 350px;
	margin: 0 auto;
`;
export const StyledRegistrFormTitle = styled.h2`
	margin: 0;
	margin-bottom: 10px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 900;
	font-size: 36px;
	line-height: 51px;
	color: #000000;
`;
export const StyledRegistrFormTitleText = styled.p`
	margin: 0;
	margin-bottom: 21px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	color: #000000;
`;
export const StyledRegistrFormLoginLink = styled(Link)`
	margin-left: 5px;
	font-family: "Roboto";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	color: #549ff9;
	text-decoration: none;
`;

export const StyledRegistrFormInputBox = styled.div`
	margin-bottom: 25px;
`;

export const StyledRegistrFormInput = styled.input`
	width: 100%;
	margin-bottom: 0;
	padding: 12px 30px;
	background: #ffffff;
	border: 1px solid #b4b4bb;
	border-radius: 10px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;

	&::placeholder {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #aaaaaa;
	}
`;
export const StyledRegistrBtn = styled.button`
	padding: 5px 20px;
	width: 117%;
	margin: 0 auto;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 36px;
	text-align: center;
	color: #ffffff;
	background: #152540;
	border-radius: 99px;
	cursor: pointer;
`;

export const StyledInputInfo = styled.p`
	margin: 0;
	color: red;
`;
