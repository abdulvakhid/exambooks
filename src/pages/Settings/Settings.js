import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
	StyledProfileBtn,
	StyledProfileContentTitle,
	StyledProfileLabelinfo,
} from "../../components/Demo/Demo";
import { StyledSecurityForm } from "../Security/Security";
import "./setting.css"
import {useDispatch} from "react-redux"
import { setLangRedux } from "../../components/redux/language/langAction";

export const Settings = () => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	return (
		<div>
			<StyledSecurityForm
				onSubmit={(evt) => {
					evt.preventDefault();
				}}>
				<StyledProfileContentTitle>{t("settings.title")}</StyledProfileContentTitle>
				<StyledSettingPage>
					<StyledSettingLan>{t("settings.lang")}</StyledSettingLan>
					<StyledLangSelect
						onChange={(evt) => {
							dispatch(setLangRedux(localStorage.getItem("language")));
							localStorage.setItem("language", evt.target.value);
							i18n.changeLanguage(evt.target.value);
						}}
						defaultValue={i18n.language}>
						<StyledLangSelectoption value="en">English</StyledLangSelectoption>
						<StyledLangSelectoption value="uz">Uzbek</StyledLangSelectoption>
						<StyledLangSelectoption value="ru">Russian</StyledLangSelectoption>
					</StyledLangSelect>
					<StyledProfileLabelinfo>
						P{t("settings.elang")}
					</StyledProfileLabelinfo>
				</StyledSettingPage>
          <StyledSettingLan>{t("settings.theme")}</StyledSettingLan>
				<StyledLine>
				<StyledTheme type="checkbox" />
        </StyledLine>
        <StyledProfileBtn type="submit">{t("profile.save")}</StyledProfileBtn>
			</StyledSecurityForm>
		</div>
	);
};

export const StyledSettingPage = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`;

export const StyledSettingLan = styled.span`
	margin-bottom: 7px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
	color: #464e5f;
`;

export const StyledLangSelect = styled.select`
	margin-bottom: 10px;
	padding: 12px 20px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #464e5f;
	background: #f3f6f9;
	border-radius: 4px;
	border: transparent;
`;
export const StyledLangSelectoption = styled.option``;
export const StyledLine = styled.div`
width: 100%;
border-bottom: 2px solid #ECF0F3;
margin-bottom: 30px;
`;
export const StyledTheme = styled.input`
margin-top: 10px;
margin-bottom: 40px;
`;


