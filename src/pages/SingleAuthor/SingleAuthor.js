import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AvatarImg from "../../assets/images/avatar.png";
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
// import avatarImg from "../../assets/images/avatar.png";
import { useTranslation } from "react-i18next";
import { BookCard } from "../../components/Cards/Cards";
import { Link } from "react-router-dom";

export const SingleAuthor = () => {
	const { id } = useParams();
	const { t } = useTranslation();
	const token = localStorage.getItem("token");
	const [singleA, setSingleA] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/authorId/${id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setSingleA(res.data);
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
			.get(`http://localhost:5000/author/books/${id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					setBooks(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [id, token]);


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
						<StyledHeaderAvatarImg src={`http://localhost:5000/${user.image}`}alt="avatar img" />
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
						src={`http://localhost:5000/${singleA.image}`}
						alt=""
					/>
				</StyledAuthorImgBox>
				<StyledAuthorContent>
					<StyledAuthorName>
						{singleA.first_name} {singleA.last_name}
					</StyledAuthorName>
					<StyledAuthorDesc>{singleA.bio}</StyledAuthorDesc>
					<StyledAuthorInfo>
						<StyledAuthorInfoBox>
							<StyledAuthorInfoText>
								{t("singleauthor.birth")}
							</StyledAuthorInfoText>
							<StyledAuthorInfoYear>
								{singleA.date_of_birth}
							</StyledAuthorInfoYear>
							<StyledAuthorInfoText>{singleA.country}</StyledAuthorInfoText>
						</StyledAuthorInfoBox>
						<StyledAuthorSpan>-</StyledAuthorSpan>
						<StyledAuthorInfoBox>
							<StyledAuthorInfoText>
								{t("singleauthor.death")}
							</StyledAuthorInfoText>
							<StyledAuthorInfoYear>
								{singleA.date_of_death}
							</StyledAuthorInfoYear>
							<StyledAuthorInfoText>{singleA.country}</StyledAuthorInfoText>
						</StyledAuthorInfoBox>
					</StyledAuthorInfo>
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

export const StyledAuthorBooksWrap = styled.div`
	margin-top: 100px;
`;

export const StyledAuthorBooks = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
`;

export const StyledAsar = styled.p`
	margin: 0;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 31px;
	line-height: 46px;
	text-align: center;
	color: #d1b89d;
`;
export const StyledAsarAll = styled(Link)`
	margin: 0;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	color: #0d0d0d;
	text-decoration: none;
`;

export const StyledBooksList = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	margin: 0;
	padding: 0;
	list-style: none;
	li {
		flex: 0 0 auto;
	}
	&::-webkit-scrollbar{
	display: none;
	}
`;

export const StyledAuthorAbout = styled.div`
	display: flex;
`;
export const StyledAuthorImgBox = styled.div`
	margin-right: 64px;
`;

export const StyledAuthorImg = styled.img`
	width: 400px;
	height: 550px;
	border-radius: 20px;
`;

export const StyledAuthorContent = styled.div`
	width: 650px;
`;
export const StyledAuthorName = styled.h2`
	margin: 0;
	margin-bottom: 10px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 48px;
	line-height: 72px;
	color: #d1b89d;
`;

export const StyledAuthorDesc = styled.p`
	margin: 0;
	margin-bottom: 44px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: rgba(13, 13, 13, 0.8);
`;

export const StyledAuthorInfo = styled.div`
	display: flex;
	align-items: center;
`;

export const StyledAuthorInfoBox = styled.div`
	/* margin-right: 54px; */
`;

export const StyledAuthorInfoText = styled.p`
	margin: 0;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;
	color: rgba(13, 13, 13, 0.6);
`;
export const StyledAuthorInfoYear = styled.p`
	margin: 0;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 39px;
	line-height: 144.4%;
	color: #d1b89d;
`;

export const StyledAuthorSpan = styled.span`
	display: block;
	margin: 0 25px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 39px;
	line-height: 144.4%;
	color: #d1b89d;
`;
