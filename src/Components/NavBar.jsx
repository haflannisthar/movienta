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
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Logo } from '../assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { MovieContext } from "../Context/Context";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';



const pages = ['Home', 'Movie', 'Favorites'];
const settings = ['Logout'];

// Styled Search Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    width: '250px', // Reduced width for PC
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { lastSearchMovie, setLastSearchMovie, logout } = useContext(MovieContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => logout();

  // Fetch movies based on search term
  // This function is debounced to avoid excessive API calls
  // It fetches movies from the TMDB API based on the search term
  // and filters out duplicates and invalid entries
  const fetchMovies = async (term) => {
    if (!term.trim()) return;

    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=e9db7b0ad0fc429854328f635110a391`);
      let results = res.data.results || [];

      // Filter out duplicates and invalid entries
      const uniqueTitles = new Set();
      results = results.filter((movie) => {
        const title = movie.title?.trim();
        if (!title || uniqueTitles.has(title.toLowerCase())) return false;
        uniqueTitles.add(title.toLowerCase());
        return true;
      });

      setSearchResults(results);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setSearchResults([]);
    }
  };

  // Debounce the fetchMovies function to limit the number of API calls
  const debouncedSearch = React.useMemo(
    () => debounce(fetchMovies, 300),
    []
  );

  // Cleanup function to cancel the debounced search when the component unmounts
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <Box sx={{ position: 'absolute', top: 20, left: 20, right: 20, zIndex: 20, borderRadius: 3, overflow: 'hidden' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box component="a" onClick={() => navigate('/home')} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', textDecoration: 'none', mr: 2 }}>
              <Box component="img" src={Logo} alt="Logo" sx={{ height: 60, mr: 1 }} />
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                {pages.map((page) => {
                  const isDisabled = page === "Movie";
                  const path = `/${page.toLowerCase()}`;
                  const isActive = location.pathname === path;

                  return (
                    <MenuItem key={page} disabled={isDisabled} onClick={() => { if (!isDisabled) navigate(path); }}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  );
                })}
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center" color={setting === 'Logout' ? 'red' : 'inherit'}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => {
                const path = `/${page.toLowerCase()}`;
                const isActive = location.pathname === path;
                const isDisabled = page === "Movie";

                return (
                  <Button
                    key={page}
                    onClick={() => !isDisabled && navigate(path)}
                    sx={{
                      my: 2,
                      color: isDisabled ? 'rgba(255, 255, 255, 0.5)' : 'white',
                      borderBottom: isActive ? '2px solid white' : 'none',
                      borderRadius: 0,
                      cursor: isDisabled ? 'default' : 'pointer',
                      pointerEvents: isDisabled ? 'none' : 'auto',
                    }}
                  >
                    {page}
                  </Button>
                );
              })}
            </Box>

            {/* Search Input */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onClick={() => setSearchModalOpen(true)}
                readOnly
              />
            </Search>

            {/* User Avatar */}
            <Box sx={{ flexGrow: 0, ml: 2, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Search Modal */}
      <Modal open={searchModalOpen} onClose={() => setSearchModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" mb={2}>Search Movie</Typography>
          <TextField
            fullWidth
            label="Movie Name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          {lastSearchMovie && (
            <Typography mt={2} variant="body2" color="text.secondary">
              Last searched: <strong>{lastSearchMovie}</strong>
            </Typography>
          )}
          <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {searchResults.map((movie) => (
              <ListItem
                key={movie.id}
                button
                onClick={() => {
                  setLastSearchMovie(movie.title);
                  setSearchModalOpen(false);
                  setSearchTerm('');
                  setSearchResults([]);
                  navigate(`/movie?id=${movie.id}&name=${movie.title}`);
                }}
                className='cursor-pointer'
              >
                {movie.title}
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
}
export default NavBar;
