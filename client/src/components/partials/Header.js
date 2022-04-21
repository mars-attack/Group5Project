import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

import AuthContext from "../../contexts/Context";

// Nav bar modified from https://mui.com/components/app-bar/
const defaultPages = [
  { route: "/home", text: "Home" },
  { route: "/login", text: "Login" },
  { route: "/register", text: "Register" },
];

const  nursePages = [
  { route: "/home", text: "Home" },
  { route: "/patientlist", text: "Patient List" },
  { route: "/alertlist", text: "Alerts" },
  { route: "/motivation/list", text: "Motivational Tips" }
];

const  patientPages = [
  { route: "/home", text: "Home" },
  { route: "/vitalslist", text: "Vitals History" },
  { route: "/motivation/list", text: "Motivational Tips" }
];

const settings = [
  { route: "/profile", text: "Profile" },
  { route: "/login", text: "Logout" },
];

const Header = () => {
  const [pages, setPages] = useState(defaultPages);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { auth, setAuth } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (e) => {
    setAnchorElUser(null);
    if (e.target.innerHTML === "Logout") {
      localStorage.clear();
      setAuth({ user: null, token: null });
    }
  };

  // Styled Components
  const StyledLinkWhite = styled(Link)`
    color: white;
    text-decoration: none;
  `;

  const StyledLinkBlack = styled(Link)`
    color: black;
    text-decoration: none;
  `;

  useEffect(() => {
    if (!auth?.user) {
      setPages(defaultPages);
    } else if (auth?.user.userType === 'nurse') {
      setPages(nursePages);
    } else {
      setPages(patientPages);
    }
  },[auth?.user]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
             {pages.map((page) => (
               <span key={page.text}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}>
                  <StyledLinkBlack to={page.route}> {page.text} </StyledLinkBlack>
                </Button>
               </span>
            ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <span key={page.text}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <StyledLinkWhite  to={page.route} > {page.text} </StyledLinkWhite>
                </Button>
              </span>
            ))}
          </Box>

          {auth?.user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth.user.name}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                    <StyledLinkBlack to={setting.route}>{setting.text}</StyledLinkBlack>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
