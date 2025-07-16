import { useAuthStore } from "@domains/auth/stores";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router";
import { Link as RouterLink } from "react-router";
import { ROUTES } from "@app/router/constants";

const MainLayout = () => {
  const { user, logout } = useAuthStore();

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          {!user ? (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Theme Designer
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexGrow: 1,
                }}
              >
                <Avatar
                  {...stringAvatar(user?.firstName + " " + user?.lastName)}
                  sx={{ width: 32, height: 32, fontSize: 16 }}
                >
                  {user?.firstName.charAt(0)}
                  {user?.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h6" component="div">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to={ROUTES.HOME}
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to={ROUTES.THEMES}
                  >
                    Themes
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to={ROUTES.PROFILE}
                  >
                    Profile
                  </Button>
                </Box>
              </Box>
            </>
          )}
          {user && (
            <Button
              color="inherit"
              onClick={() => logout()}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
