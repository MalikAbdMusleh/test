import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import Link from "next/link";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Fab, Grid, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";

import { setLogout } from "@/redux/slices/auth.slice";
import {
  notificationApi,
  useChangeNotificationStatusMutation,
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
} from "../../redux/apis/notificationApi.js";
import { setNotification } from "@/redux/slices/notifications";
import NotificationCard from "../NotificationCard/NotificationCard";
import {
  chatApi,
  useGetTotalUnreadChatQuery,
} from "@/redux/apis/chat/chatApi.js";
import { useRouter } from "next/router.js";
import { authApi, useLogoutMutation } from "@/redux/apis/authApi.js";
import { walletApi } from "@/redux/apis/walletApi.js";
import { makeStore } from "@/redux/store.js";
import { myActivityApi } from "@/redux/apis/account/myActivity.api.js";
import { watchlistsApi } from "@/redux/apis/account/myWatchList.api.js";
import { profileApi } from "@/redux/apis/profile.api.js";
import { favoritesApi } from "@/redux/apis/favouriteApi.js";

import { useMemo } from "react";
import SlectedLanguage from "../SlectedLanguage/SlectedLanguage.js";
export default function Header({ route }) {
  const router = useRouter();
  const authed = useSelector((state) => state?.auth?.authed);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [logoutQ] = useLogoutMutation();
  const notificationOpen = Boolean(anchorElNotification);
  const dispatch = useDispatch();

  const handleNotificationClick = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorElNotification(null);
  };

  const hidden = useMemo(() => {
    let path = router.pathname;
    return (
      path === "/login" ||
      path === "/signup" ||
      path === "/auth" ||
      path === "/reset-password"
    );
  }, [router]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logoutQ()
      .unwrap()
      .then((res) => {
        dispatch(authApi.util.resetApiState());
        dispatch(notificationApi.util.resetApiState());
        dispatch(chatApi.util.resetApiState());
        dispatch(walletApi.util.resetApiState());
        dispatch(myActivityApi.util.resetApiState());
        dispatch(watchlistsApi.util.resetApiState());
        dispatch(profileApi.util.resetApiState());
        dispatch(favoritesApi.util.resetApiState());
        dispatch(favoritesApi.util.resetApiState());
        dispatch(setLogout());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const menuId = "primary-search-account-menu";
  const countQuery = useGetUnreadCountQuery();
  const getChatUnread = useGetTotalUnreadChatQuery();
  const notificationQuery = useGetNotificationsQuery("unread");
  const renderNotification = notificationQuery?.data?.data?.map((note) => {
    return (
      <Grid item key={note?.id}>
        <NotificationCard
          onClick={() => dispatch(setNotification(note.id))}
          date={note?.createdAt}
          description={note?.text}
          title={note?.title}
          img={note?.imageUrl}
          createdAt={note?.createdAt}
          popUp
        />
      </Grid>
    );
  });

  React.useEffect(() => {
    getChatUnread.refetch();
    countQuery.refetch();
  }, [route]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ zIndex: 999 }}
    >
      {authed && (
        <div>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href="/profile"
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href="/account"
          >
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href="/auth"
            onClick={() => {
              handleLogout();
            }}
          >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Link>
        </div>
      )}
      {!authed && (
        <Link style={{ textDecoration: "none", color: "white" }} href="/auth">
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </Link>
      )}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ zIndex: 999 }}
    >
      {authed && (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="primary"
            >
              <Badge
                badgeContent={getChatUnread?.data?.totalUnreadChats || 0}
                color="primary"
              >
                <MailIcon />
              </Badge>
            </IconButton>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/chat"
              onClick={handleMobileMenuClose}
            >
              <p>Messages</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <IconButton
              size="large"
              aria-label="show number of new notifications"
              color="primary"
            >
              <Badge
                badgeContent={countQuery?.data?.unreadCount || 0}
                color="primary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/notifications/new"
              onClick={handleMobileMenuClose}
            >
              <p>Notifications</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="primary"
            >
              <AccountCircle />
            </IconButton>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/profile"
            >
              <p>Profile</p>
            </Link>
          </MenuItem>
        </div>
      )}
      {!authed && (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="primary"
            >
              <AccountCircle />
            </IconButton>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/auth"
            >
              <p>Signin</p>
            </Link>
          </MenuItem>
        </div>
      )}
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-menu"
          aria-haspopup="true"
          color="primary"
        >
          <SearchIcon />
        </IconButton>

        <Link style={{ textDecoration: "none", color: "white" }} href="/search">
          <p>Search</p>
        </Link>
      </MenuItem>
      {authed && (
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountBalanceWalletIcon />
          </IconButton>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            href="/account"
          >
            <p>My Account</p>
          </Link>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          <ApartmentIcon />
        </IconButton>

        <Link
          style={{ textDecoration: "none", color: "white" }}
          href="/buisness"
        >
          <p>Partners</p>
        </Link>
      </MenuItem>
      {authed && (
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AddIcon fontSize={"15px"} />
          </IconButton>

          <Link style={{ textDecoration: "none", color: "white" }} href="/c2c">
            <p>Add</p>
          </Link>
        </MenuItem>
      )}
      {authed && (
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <LogoutIcon />
          </IconButton>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href="/auth"
            onClick={() => {
              handleLogout();
            }}
          >
            <p>Logout</p>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="back-to-top-anchor">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "end", flexGrow: 1 }}>
            <Link style={{ textDecoration: "none", color: "white" }} href="/">
              <Image
                src="/imgs/logo1.png"
                width={40}
                height={25}
                alt="Mazadak"
              />
            </Link>
          </Box>

          {!hidden && (
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {authed && (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href={"/c2c"}
                >
                  <Fab
                    size={"small"}
                    style={{
                      background: theme.palette.primary.main,
                      width: 20,
                      minHeight: 20,
                      maxHeight: 20,
                      marginRight: 15,
                      marginBottom: 3,
                    }}
                    aria-label="add"
                  >
                    <AddIcon fontSize={"15px"} />
                  </Fab>
                </Link>
              )}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/buisness"
              >
                <IconButton size="large" aria-label="Search" color="primary">
                  <ApartmentIcon />
                </IconButton>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/search"
              >
                <IconButton size="large" aria-label="Search" color="primary">
                  <SearchIcon />
                </IconButton>
              </Link>

              <SlectedLanguage />
              {authed && (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/chat"
                >
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="primary"
                  >
                    <Badge
                      sx={{
                        "& .MuiBadge-standard": {
                          color: "black",
                        },
                      }}
                      badgeContent={getChatUnread?.data?.totalUnreadChats || 0}
                      color="primary"
                    >
                      <MailIcon />
                    </Badge>
                  </IconButton>
                </Link>
              )}

              {authed && (
                <IconButton
                  size="large"
                  aria-label="show number of new notifications"
                  color="primary"
                  onClick={handleNotificationClick}
                >
                  <Badge
                    sx={{
                      "& .MuiBadge-standard": {
                        color: "black",
                      },
                    }}
                    badgeContent={countQuery?.data?.unreadCount || 0}
                    color="primary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}

          {!hidden && (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {!hidden && renderMobileMenu}
      {!hidden && renderMenu}
      <Menu
        id="notification-menu"
        anchorEl={anchorElNotification}
        open={notificationOpen}
        onClose={handleNotificationClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
        PaperProps={{
          style: {
            width: "30%",
            borderRadius: 12,
          },
        }}
      >
        <Grid container flexDirection={"column"} spacing={2} padding={2}>
          <Grid item>
            <Grid container justifyContent={"space-between"} padding={1}>
              <Grid item>
                <Typography fontWeight={700}>New</Typography>
              </Grid>
              <Grid item>
                <Link
                  href={"/notifications/new"}
                  style={{ textDecoration: "none" }}
                  onClick={handleNotificationClose}
                >
                  <Typography fontSize={14} fontWeight={500} color={"primary"}>
                    See All
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              flexDirection={"column"}
              spacing={2}
              overflowX={"scroll"}
              padding={1}
            >
              {renderNotification}
              <Typography fontSize={14} px={2}>
                {!renderNotification?.length && "No new notifications"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Menu>
    </Box>
  );
}
