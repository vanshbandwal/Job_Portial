import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState('user')

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    handleCloseUserMenu();
    let res = await axios.post(
      "http://localhost:3000/api/logout",
      {},
      { withCredentials: true }
    );
    window.location.href = "/";
    alert(res.data.message)
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true, // 👈 send cookies
        });

        if (res.data.success) {
          console.log("User from backend:", res.data.user);
          setUser(res.data.user.userRole)
          console.log(res.data.user.userRole)
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Not logged in:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'arial',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Nokari
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Job</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Browser</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Job
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Browser
            </Button>
          </Box>
          {
            (user === 'user' || user === 'admin') ? <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box> : <Box
              sx={{ display: 'flex', gap: '20px' }}
            ><a href="/signup"><Button variant="contained"
              sx={{ color: "#dee0e1", background: "#7d7878" }}
            >Signup</Button></a>
              <a href="/login"><Button
                variant="contained"
                sx={{ color: "#1976d2", background: "#e2e4e5" }}
              >
                Login
              </Button></a>
            </Box>

          }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
