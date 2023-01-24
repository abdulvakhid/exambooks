import React from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Demo } from "../../components/Demo/Demo";
import { StyledContainer } from "../../components/Registr/Registr";
import { Security } from "../Security/Security";
import { Settings } from "../Settings/Settings";
import {useTranslation} from "react-i18next"

export const Profile = () => {
	const {t} = useTranslation();
	return (
		<StyledProilbg>
			<StyledContainer>
				<StyledProfileRoutes>
					<StyledProfileRoute activClassname="active">
						<StyledProfileRouteLink to="/profile">
							<StyledPortfolioNum>1</StyledPortfolioNum> {t("profile.profile")}
						</StyledProfileRouteLink>
					</StyledProfileRoute>
					<StyledProfileRoute>
						<StyledProfileRouteLink to="security">
							<StyledPortfolioNum>2</StyledPortfolioNum>
							{t("profile.security")}
						</StyledProfileRouteLink>
					</StyledProfileRoute>
					<StyledProfileRoute>
						<StyledProfileRouteLink to="settings">
							<StyledPortfolioNum>3</StyledPortfolioNum>
							{t("profile.settings")}
						</StyledProfileRouteLink>
					</StyledProfileRoute>
				</StyledProfileRoutes>

				<StyledSimple>
					<Routes>
						<Route index element={<Demo />} />
						<Route path="/security" element={<Security />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</StyledSimple>
			</StyledContainer>
		</StyledProilbg>
	);
};

export const StyledProilbg = styled.div`
	background-color: #fff;
`;

export const StyledProfileRoutes = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	list-style-type: none;
`;
export const StyledProfileRoute = styled.li`
	width: 100%;
	padding: 23px;
	background: #f3f6f9;
	border-radius: 4px 4px 0px 0px;
	&.active {
		background: #dde6f5;
	}
`;

export const StyledProfileRouteLink = styled(NavLink)`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 21px;
	color: #464e5f;
	text-decoration: none;
`;

export const StyledPortfolioNum = styled.span`
	padding: 6px 12px;
	margin-right: 5px;
	width: 35px;
	height: 35px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	color: #3699ff;
	background: #e5eaee;
	border-radius: 4px;
`;
export const StyledSimple = styled.div``;
