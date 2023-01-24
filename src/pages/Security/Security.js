import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
	StyledProfileBtn,
	StyledProfileContentTitle,
	StyledProfileFormd,
	StyledProfileInput,
	StyledProfileLabel,
	StyledProfileLabelinfo,
} from "../../components/Demo/Demo";

export const Security = () => {
	const token = localStorage.getItem("token");
	const { t } = useTranslation();

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
			email: user.email,
			currentPassword: "",
			newPassword: "",
		},
		onSubmit: (values) => {
			const formData = new FormData();
			formData.append("email", values.email);
			formData.append("currentPassword", values.currentPassword);
			formData.append("newPassword", values.newPassword);

			axios
				.put("http://localhost:5000/user/security", formData, {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					if (response.status === 201) {
						setUser(response.data);
						console.log(response);
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
		<StyledSecurityForm onSubmit={formik.handleSubmit}>
			<StyledProfileContentTitle>
			{t("security.title")}
			</StyledProfileContentTitle>

			<StyledProfileLabel>
			{t("security.email")}
				<StyledProfileInput
					type="email"
					name="email"
					defaultValue={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder="email"
				/>
				<StyledProfileLabelinfo>
				{t("security.eenter")}
				</StyledProfileLabelinfo>
			</StyledProfileLabel>

			<StyledProfileLabel>
			{t("security.currentspas")}
				<StyledProfileInput
					type="password"
					name="currentPassword"
					value={formik.values.currentPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder="*********"
				/>
				<StyledProfileLabelinfo>
				{t("security.ecurpas")}
				</StyledProfileLabelinfo>
			</StyledProfileLabel>

			<StyledProfileLabel>
			{t("security.newpas")}
				<StyledProfileInput
					type="password"
					name="newPassword"
					value={formik.values.newPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder="*********"
				/>
				<StyledProfileLabelinfo>
				{t("security.enternewpas")}
				</StyledProfileLabelinfo>
			</StyledProfileLabel>
			<StyledProfileBtn type="submit">{t("profile.save")}</StyledProfileBtn>
		</StyledSecurityForm>
	);
};

export const StyledSecurityForm = styled.form`
width: 100%;
	margin: 0 auto;
	padding-bottom: 100px;
	padding-top: 50px;
	max-width: 710px;
`;
