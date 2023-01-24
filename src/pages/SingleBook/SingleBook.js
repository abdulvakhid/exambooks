import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";
import {
	StlyedHeaderLogoLink,
	StyledAvatarLinksBtn,
	StyledDropdownBtn,
	StyledHeaderAvatarBox,
	StyledHeaderAvatarImg,
	StyledHeaderNav,
	StyledHeaderNavList,
	StyledHeaderNavListItem,
	StyledHeaderNavListItemLink,
	StyledMainHeader,
	StyledMainLogo,
	StyledNavBox,
} from "../../components/MainPage/MainPage";
import { StyledContainer } from "../../components/Registr/Registr";
import { AuthContext } from "../../context/AuthContext/auth-context";

import { useTranslation } from "react-i18next";
import { BookCard } from "../../components/Cards/Cards";
import { StyledAsar, StyledAsarAll, StyledAuthorAbout, StyledAuthorBooks, StyledAuthorBooksWrap, StyledAuthorContent, StyledAuthorImg, StyledAuthorImgBox, StyledAuthorName, StyledBooksList } from "../SingleAuthor/SingleAuthor";

export const SingleBook = () => {
	const { id } = useParams();
	const { t } = useTranslation();
	const token = localStorage.getItem("token");
	const [singlebook, setSinglebook] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:5000/book/bookId/${id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setSinglebook(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [id, token]);
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const { setToken } = useContext(AuthContext);

	const [books, setBooks] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/books/${singlebook.author_id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setBooks(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [singlebook.author_id, token]);


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
						<StyledHeaderAvatarImg src={`http://localhost:5000/${user.image}`} alt="avatar img" />
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
			<StyledAuthorAbout>
				<StyledAuthorImgBox>
					<StyledAuthorImg
						src={`http://localhost:5000/${singlebook.image}`}
						alt="mkj"
					/>
				</StyledAuthorImgBox>
				<StyledAuthorContent>
					<StyledAuthorName>
						{singlebook.first_name} {singlebook.last_name}
					</StyledAuthorName>
					<StyledBooktitle>{singlebook.title}</StyledBooktitle>
					<StyledSingleBookInfo><StyledSingetext>{t("booksingle.sahifa")}:</StyledSingetext> <StyledSingetextinfo>{singlebook.page} {t("booksingle.pages")}</StyledSingetextinfo></StyledSingleBookInfo>
					<StyledSingleBookInfo><StyledSingetext>{t("booksingle.publish")}:</StyledSingetext> <StyledSingetextinfo>{singlebook.year} {t("booksingle.years")}</StyledSingetextinfo></StyledSingleBookInfo>
					<StyledSingleBookInfo><StyledSingetext>{t("booksingle.price")}:</StyledSingetext> <StyledSingetextinfo>${singlebook.price}</StyledSingetextinfo></StyledSingleBookInfo>
         
          <StyledBookFull>
            <StyledFullInfo>{t("booksingle.info")}</StyledFullInfo>
            <StyledBookLine></StyledBookLine>
          </StyledBookFull>
          <StyledSingleBookBio>{singlebook.description }</StyledSingleBookBio>
				</StyledAuthorContent>
			</StyledAuthorAbout>

			<StyledAuthorBooksWrap>
				<StyledAuthorBooks>
					<StyledAsar>{t("singleauthor.asar")}</StyledAsar>
					<StyledAsarAll to={"/books"}>{t("singleauthor.see")}</StyledAsarAll>
				</StyledAuthorBooks>
				<StyledBooksList>
					{books.map((item) => (
						<BookCard key={item.id} item={item} />
					))}
				</StyledBooksList>
			</StyledAuthorBooksWrap>
		</StyledContainer>
	);
};

export const StyledBooktitle = styled.h2`
margin: 0;
margin-bottom: 12px;
	font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 48px;
line-height: 72px;
color: #D1B89D;
`;
export const StyledSingleBookInfo = styled.p`
display: flex;
justify-content: space-between;
align-items: center;
`;
export const StyledSingetext = styled.span`
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 30px;
color: rgba(13, 13, 13, 0.6);
`;
export const StyledSingetextinfo = styled.span`
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 30px;
color: #0D0D0D;
`;
export const StyledBookFull = styled.div`
display: flex;
align-items: center;
margin-top: 40px;
`;
export const StyledFullInfo = styled.p`
margin: 0;
margin-right: auto;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #D1B89D;

`;

export const StyledBookLine = styled.span`
width: 70%;
height: 1px;
background-color: rgba(209, 184, 157, 0.6);
`;

export const StyledSingleBookBio = styled.p`
margin: 0;
margin-top: 12px;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
color: rgba(13, 13, 13, 0.8);
`;