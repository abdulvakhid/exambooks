import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import styled from "styled-components";
import loginimg from "../../assets/images/loginimg.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokenRedux } from "../redux/token/tokenAction";
import { AuthContext } from "../../context/AuthContext/auth-context";
import { useTranslation } from "react-i18next";
import {
	StyledContainer,
	StyledInputInfo,
	StyledRegistBox,
	StyledRegistrBtn,
	StyledRegistrForm,
	StyledRegistrFormBox,
	StyledRegistrFormInput,
	StyledRegistrFormInputBox,
	StyledRegistrFormLoginLink,
	StyledRegistrFormTitle,
	StyledRegistrFormTitleText,
	StyledRegistrImg,
	StyledRegistrImgBox,
} from "../Registr/Registr";

export const Login = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { setToken } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			axios
				.post("http://localhost:5000/user/login", {
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
					<StyledRegistrImg src={loginimg} alt="login img" />
				</StyledRegistrImgBox>
				<StyledRegistrFormBox>
					<StyledRegistrForm onSubmit={formik.handleSubmit}>
						<StyledRegistrFormTitle>{t("login.title")}</StyledRegistrFormTitle>
						<StyledRegistrFormTitleText>
							{t("login.desc")}{" "}
							<StyledRegistrFormLoginLink to="/register">
								{t("login.login")}
							</StyledRegistrFormLoginLink>
						</StyledRegistrFormTitleText>
						{/* <StyledRegistrFormLoginLink to="/login">
							Sign in
						</StyledRegistrFormLoginLink> */}
						<StyledRegistrFormInputBox>
							<StyledRegistrFormInput
								type="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder={t("login.email")}
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
								placeholder={t("login.password")}
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
							{t("login.nextBtn")}
						</StyledRegistrBtn>
					</StyledRegistrForm>
				</StyledRegistrFormBox>
			</StyledRegistBox>
		</StyledContainer>
	);
};

export const StyledLogin = styled.div``;
