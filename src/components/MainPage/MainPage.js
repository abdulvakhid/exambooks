import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledContainer } from "../Registr/Registr";
import { NavLink, Link, useNavigate, Routes, Route } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AvatarImg from "../../assets/images/avatar.png";
import { Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/auth-context";
import { Temuriylar } from "../Temuriylar/Temuriylar";
import { Jadid } from "../Jadid/Jadid";
import { Sovet } from "../Sovet/Sovet";
import { Mustaqillik } from "../Mustqaillik/Mustaqillik";
import axios from "axios";
import { useFormik } from "formik";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import herobg from "../../assets/images/hero.png";
import { Carousel } from "../Carousel/Carousel";

export const MainPage = () => {
	const { t } = useTranslation();
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { setToken } = useContext(AuthContext);

	const [value, setValue] = useState("");
	console.log(value);
	// const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:5000/author/search?${value}`)
		.then(res => console.log(res))
		.catch(err => console.log(err));
	},[value])


	//  image uchun
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

	return (
		<StyledContainer>
			<StyledMainHeader>
				<StyledMainLogo>
					<StlyedHeaderLogoLink to="/">
						{t("mainpage.logo")}
					</StlyedHeaderLogoLink>
				</StyledMainLogo>
				<StyledNavBox>
					<StyledHeaderNav>
						<StyledHeaderNavList>
							<StyledHeaderNavListItem>
								<StyledHeaderNavListItemLink to="/" activeClassName="active">
									{t("mainpage.homePage")}
								</StyledHeaderNavListItemLink>
							</StyledHeaderNavListItem>
							<StyledHeaderNavListItem>
								<StyledHeaderNavListItemLink
									to="/books"
									activeClassName="active">
									{t("mainpage.book")}
								</StyledHeaderNavListItemLink>
							</StyledHeaderNavListItem>
						</StyledHeaderNavList>
					</StyledHeaderNav>
					<StyledHeaderAvatarBox>
						<StyledHeaderAvatarImg
							src={`http://localhost:5000/${user.image}`}
							alt="avatar img"
						/>
						<StyledDropdownBtn onClick={handleOpenUserMenu}>
							<KeyboardArrowDownIcon />
						</StyledDropdownBtn>
						<Menu
							sx={{ mt: "45px", padding: "0" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem
								sx={{
									width: "150px",
									backgroundColor: "#F5F5F5",
									borderRadius: "10px 10px 0px 0px",
								}}
								onClick={() => navigate("/profile")}>
								<StyledAvatarLinksBtn>
									{t("mainpage.profile")}
								</StyledAvatarLinksBtn>
							</MenuItem>
							<MenuItem
								sx={{ width: "150px", backgroundColor: "#F5F5F5" }}
								onClick={() => navigate("/addauthor")}>
								<StyledAvatarLinksBtn>
									{t("mainpage.addauthor")}
								</StyledAvatarLinksBtn>
							</MenuItem>
							<MenuItem
								sx={{ width: "150px", backgroundColor: "#F5F5F5" }}
								onClick={() => navigate("/addbook")}>
								<StyledAvatarLinksBtn>
									{t("mainpage.addbook")}
								</StyledAvatarLinksBtn>
							</MenuItem>
							<MenuItem
								sx={{
									width: "150px",
									backgroundColor: "#F5F5F5",
									borderRadius: "0 0 10px 10px",
								}}>
								<StyledAvatarLinksBtn
									onClick={() => {
										setToken("");
										navigate("/login");
									}}>
									{t("mainpage.logout")}
								</StyledAvatarLinksBtn>
							</MenuItem>
						</Menu>
					</StyledHeaderAvatarBox>
				</StyledNavBox>
			</StyledMainHeader>

			<StyledContainer>
				<StyledHeroBg>
					<Carousel />
				</StyledHeroBg>
			</StyledContainer>

			<StyledSearchBox>
				<StyledSearchTitle>{t("mainpage.search")}</StyledSearchTitle>
				<StyledSearchForm onSubmit={(evt)=> {
				evt.preventDefault();
				console.log(evt.target.value);
				}}>
					<StyledSearchInput
					onKeyDown={(evt) => {
						if (evt.key === "Enter") {
							setValue(evt.target.value);
						}
					}}
						type="text"
						placeholder={t("mainpage.searchinput")}
					/>
					<StyledSearchBtn type="submit">
						{t("mainpage.searchbtn")}
					</StyledSearchBtn>
				</StyledSearchForm>
			</StyledSearchBox>
			<StyledBoxWithout>
				<StyledMainPageTitle>{t("mainpage.category")}</StyledMainPageTitle>
				<StyledMainPageGenreList>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="" activeClassName="active">
							{t("mainpage.temuriy")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="jadid">
							{t("mainpage.jadid")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="sovet">
							{t("mainpage.sovet")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="mustaqillik">
							{t("mainpage.mustaqillik")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
				</StyledMainPageGenreList>

				<Routes>
					<Route index element={<Temuriylar />} />
					<Route path="/jadid" element={<Jadid />} />
					<Route path="/sovet" element={<Sovet />} />
					<Route path="/mustaqillik" element={<Mustaqillik />} />
				</Routes>
			</StyledBoxWithout>
		</StyledContainer>
	);
};

export const StyledHeroBg = styled.div`
	position: relative;
`;
export const StyledHeroBgimg = styled.img`
	width: 100%;
	height: auto;
`;

export const StyledMainHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 27px 0;
`;

export const StyledMainLogo = styled.h2`
	margin: 0;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 25px;
	line-height: 38px;
	color: #d1b89d;
`;

export const StlyedHeaderLogoLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

export const StyledNavBox = styled.div`
	display: flex;
	align-items: center;
`;

export const StyledHeaderNav = styled.nav`
	margin-right: 33px;
	display: flex;
	align-items: center;
`;
export const StyledHeaderNavList = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	list-style: none;
`;
export const StyledHeaderNavListItem = styled.li`
	&:not(:last-child) {
		margin-right: 22px;
	}
`;
export const StyledHeaderNavListItemLink = styled(NavLink)`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 144.4%;
	color: rgba(13, 13, 13, 0.3);
	text-decoration: none;

	&.active {
		color: #000;
	}
`;
export const StyledHeaderAvatarBox = styled.div`
	display: flex;
	align-items: center;
`;
export const StyledHeaderAvatarImg = styled.img`
	width: 49px;
	height: 49px;
	border-radius: 50%;
`;
export const StyledDropdownBtn = styled.button`
	width: 20px;
	height: 20px;
	border: transparent;
	background-color: transparent;
	cursor: pointer;
`;

export const StyledAvatarLinksBtn = styled.button`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	color: #000000;
	border: transparent;
	background-color: transparent;
	&:not(:last-child) {
		margin-bottom: 8px;
	}
`;

export const StyledMainPageTitle = styled.h2`
	margin: 0;
	margin-bottom: 12px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 32px;
	line-height: 48px;
	color: #c9ac8c;
	text-align: center;
`;

export const StyledMainPageGenreList = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	margin-bottom: 30px;
	padding: 0;
	list-style: none;
`;

export const StyledMainPageGenreListItem = styled.li`
	&:not(:last-child) {
		margin-right: 34px;
	}
`;

export const StyledMainPageGenreListItemLink = styled(NavLink)`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 27px;
	color: rgba(13, 13, 13, 0.6);
	text-decoration: none;
	&.active {
		color: #c9ac8c;
	}
`;

export const StyledBoxWithout = styled.div``;

export const StyledSearchBox = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 29px 73px;
	background: #ffffff;
	box-shadow: 0px 4px 77px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	position: absolute;
    top: 223px;
    right: 514px;
	z-index: 5;
`;
export const StyledSearchTitle = styled.p`
	margin: 0;
	margin-bottom: 9px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 32px;
	line-height: 48px;
	text-align: center;
	color: #d1b89d;
`;
export const StyledSearchForm = styled.form`
	width: 100%;

	display: flex;
`;

export const StyledSearchInput = styled.input`
	width: 600px;
	margin-right: 14px;
	padding: 12px 27px;
	background: #f5f5f5;
	border-radius: 15px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	border: transparent;
	&::placeholder {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: rgba(13, 13, 13, 0.3);
	}
`;

export const StyledSearchBtn = styled.button`
	padding: 12px 45px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: #efdac3;
	background: #c9ac8c;
	border-radius: 15px;
	border: transparent;
`;
