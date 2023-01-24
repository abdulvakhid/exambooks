import React from "react";
import img from "../../assets/images/avatar.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledLine } from "../../pages/Settings/Settings";

export const Demo = () => {
	const token = localStorage.getItem("token");
	const [file, setFile] = useState(null);
	const { t } = useTranslation();

	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};

	const [user, setUser] = useState("");
	useEffect(() => {
		axios
			.get("http://localhost:5000/user/me", {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setUser(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [token]);

	const formik = useFormik({
		initialValues: {
			first_name: user.first_name,
			last_name: user.last_name,
			phone: user.phone,
			image: "",
		},
		onSubmit: (values) => {
			const formData = new FormData();
			formData.append("first_name", values.first_name);
			formData.append("last_name", values.last_name);
			formData.append("phone", values.phone);
			formData.append("image", file);

			axios
				.put("http://localhost:5000/user/account", formData, {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					if (response.status === 201) {
						setUser(response.data);
						console.log(response.data);
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
		<StyledProfileFormd onSubmit={formik.handleSubmit}>
			<StyledProofileFormBox>
				<StyledProfileImgBox>
					<StyledProfileImg src={`http://localhost:5000/${user.image}`} alt='img'/>
					<input type="file" onChange={handleChange} />
				</StyledProfileImgBox>
				<StyledProfileContent>
					<StyledProfileContentTitle>
						{t("profile.mypro")}
					</StyledProfileContentTitle>
					<StyledProfileLabel>
						{t("profile.fname")}
						<StyledProfileInput
							type="text"
							name="first_name"
							defaultValue={user.first_name}
							// value={formik.values.first_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder={user.first_name}
						/>
						<StyledProfileLabelinfo>
							{t("profile.fenter")}
						</StyledProfileLabelinfo>
					</StyledProfileLabel>
					<StyledProfileLabel>
						{t("profile.lname")}
						<StyledProfileInput
							type="text"
							name="last_name"
							defaultValue={user.last_name}
							// value={formik.values.last_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Wick"
						/>
						<StyledProfileLabelinfo>
							{t("profile.lenter")}
						</StyledProfileLabelinfo>
					</StyledProfileLabel>
					<StyledProfileLabel>
						{t("profile.phone")}
						<StyledProfileInput
							type="tel"
							name="phone"
							defaultValue={user.phone}
							// value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="+61412345678"
						/>
						<StyledProfileLabelinfo>
							{t("profile.penter")}
						</StyledProfileLabelinfo>
					</StyledProfileLabel>
					<StyledLine></StyledLine>
					<StyledProfileBtn type="submit">{t("profile.save")}</StyledProfileBtn>
				</StyledProfileContent>
			</StyledProofileFormBox>
		</StyledProfileFormd>
	);
};

export const StyledProfileFormd = styled.form`
	width: 100%;
	max-width: 990px;
	margin: 0 auto;
	padding-bottom: 100px;
	padding-top: 50px;
`;
export const StyledProofileFormBox = styled.div`
	display: flex;
	align-items: flex-start;
	flex-grow: 1;
`;

export const StyledProfileImgBox = styled.div``;

export const StyledProfileImg = styled.img`
	width: 175px;
	height: 175px;
	border-radius: 50%;
`;

export const StyledProfileContent = styled.div`
	flex-grow: 1;
`;
export const StyledProfileContentTitle = styled.h3`
	margin: 0;
	margin-bottom: 32px;
	padding-top: 43px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 27px;
	color: #212121;
`;
export const StyledProfileLabel = styled.label`
	margin-bottom: 22px;
	display: flex;
	flex-direction: column;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
	color: #464e5f;
`;
export const StyledProfileInput = styled.input`
	width: 94%;
	margin: 6px 0;
	padding: 12px 20px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	background: #f3f6f9;
	border-radius: 4px;
	border: transparent;
	&::placeholder {
		font-weight: 400;
		font-size: 14px;
		line-height: 21px;
		color: #464e5f;
	}
`;

export const StyledProfileLabelinfo = styled.span`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;
	color: #b5b5c3;
	opacity: 0.8;
`;
export const StyledProfileBtn = styled.button`
	display: flex;
	justify-content: end;
	margin-left: auto;
	padding: 12px 16px 11px 20px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 20px;
	color: #ffffff;
	background: #152540;
	border-radius: 4px;
	border: transparent;
`;
