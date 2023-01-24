import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/auth-context";
import {
	StlyedHeaderLogoLink,
	StyledAvatarLinksBtn,
	StyledBoxWithout,
	StyledDropdownBtn,
	StyledHeaderAvatarBox,
	StyledHeaderAvatarImg,
	StyledHeaderNav,
	StyledHeaderNavList,
	StyledHeaderNavListItem,
	StyledHeaderNavListItemLink,
	StyledHeroBg,
	StyledHeroBgimg,
	StyledHeroCarousel,
	StyledMainHeader,
	StyledMainLogo,
	StyledMainPageGenreList,
	StyledMainPageGenreListItem,
	StyledMainPageGenreListItemLink,
	StyledMainPageTitle,
	StyledNavBox,
	StyledSearchBox,
	StyledSearchBtn,
	StyledSearchForm,
	StyledSearchInput,
	StyledSearchTitle,
} from "../../components/MainPage/MainPage";
import { StyledContainer } from "../../components/Registr/Registr";
import { SovetBooks } from "../../components/Sovet/SovetBooks";
import { TemuriylarBooks } from "../../components/Temuriylar/TemuriylarBooks";
import { JadidBooks } from "../../components/Jadid/JadidBooks";
import { MustaqillikBooks } from "../../components/Mustqaillik/MustaqillikBooks";
import axios from "axios";
import { t } from "i18next";
import herobg from "../../assets/images/hero.png";
import { BookCard } from "../../components/Cards/Cards";

export const Books = () => {
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

	const [data, setData] = useState(null);
	const inputRef = useRef("");

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.get(`http://localhost:5000/book/search?book=${inputRef.current.value}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(error));
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

	return (
		<StyledContainer>
			<StyledMainHeader>
				<StyledMainLogo>
					<StlyedHeaderLogoLink to="/">Badiiyat</StlyedHeaderLogoLink>
				</StyledMainLogo>
				<StyledNavBox>
					<StyledHeaderNav>
						<StyledHeaderNavList>
							<StyledHeaderNavListItem>
								<StyledHeaderNavListItemLink to="/" activeClassName="active">
									Bosh sahifa
								</StyledHeaderNavListItemLink>
							</StyledHeaderNavListItem>
							<StyledHeaderNavListItem>
								<StyledHeaderNavListItemLink
									to="/books"
									activeClassName="active">
									Kitoblar
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
								<StyledAvatarLinksBtn>Profile</StyledAvatarLinksBtn>
							</MenuItem>
							<MenuItem
								sx={{ width: "150px", backgroundColor: "#F5F5F5" }}
								onClick={() => navigate("/addauthor")}>
								<StyledAvatarLinksBtn>Add author</StyledAvatarLinksBtn>
							</MenuItem>
							<MenuItem
								sx={{ width: "150px", backgroundColor: "#F5F5F5" }}
								onClick={() => navigate("/addbook")}>
								<StyledAvatarLinksBtn>Add book</StyledAvatarLinksBtn>
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
									Log out
								</StyledAvatarLinksBtn>
							</MenuItem>
						</Menu>
					</StyledHeaderAvatarBox>
				</StyledNavBox>
			</StyledMainHeader>

			<StyledContainer>
				<StyledHeroBg>
					<StyledHeroCarousel>
						<StyledHeroBgimg src={herobg} alt="img" />
						<StyledHeroBgimg src={herobg} alt="img" />
						<StyledHeroBgimg src={herobg} alt="img" />
						<StyledHeroBgimg src={herobg} alt="img" />
					</StyledHeroCarousel>
				</StyledHeroBg>
			</StyledContainer>

			<StyledSearchBox>
				<StyledSearchTitle>{t("mainpage.search")}</StyledSearchTitle>
				<StyledSearchForm onSubmit={handleSubmit}>
					<StyledSearchInput
						type="text"
						ref={inputRef}
						placeholder={t("mainpage.searchinput")}
					/>
					<StyledSearchBtn type="submit">
						{t("mainpage.searchbtn")}
					</StyledSearchBtn>
				</StyledSearchForm>
			</StyledSearchBox>

			<StyledSearchItems>
				{data?.length !== 0 ? (
					<StyledSearchItemsList>
						{data?.map((item) => (
							<BookCard key={item.id} item={item} />
						))}
					</StyledSearchItemsList>
				): ""}
			</StyledSearchItems>

			<StyledBoxWithout>
				<StyledMainPageTitle>{t("mainpage.category")}</StyledMainPageTitle>
				<StyledMainPageGenreList>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="/books">
							{t("mainpage.temuriy")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="jadidbooks">
							{t("mainpage.jadid")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="sovetbooks">
							{t("mainpage.sovet")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
					<StyledMainPageGenreListItem>
						<StyledMainPageGenreListItemLink to="mustaqillikbooks">
							{t("mainpage.mustaqillik")}
						</StyledMainPageGenreListItemLink>
					</StyledMainPageGenreListItem>
				</StyledMainPageGenreList>

				<Routes>
					<Route index element={<TemuriylarBooks />} />
					<Route path="/sovetbooks" element={<SovetBooks />} />
					<Route path="/jadidbooks" element={<JadidBooks />} />
					<Route path="/mustaqillikbooks" element={<MustaqillikBooks />} />
				</Routes>
			</StyledBoxWithout>
		</StyledContainer>
	);
};

export const StyledSearchItems = styled.div``;
export const StyledSearchItemsList = styled.ul`
display: flex;
flex-wrap: wrap;
margin: 0;
padding: 0;
list-style-type: none;
`;
