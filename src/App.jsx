import '@fontsource/roboto';
import './App.css'
import { MovieContext } from "./Context/Context";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Loading from "./Components/Loading";
import { useContext } from 'react';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
import MoviePage from './Pages/MoviePage';
import FavoriteMoviesPage from './Pages/FavoriteMoviesPage';


function App() {

  const { isAuthenticated, loading } = useContext(MovieContext);
  const location = useLocation()

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <LandingPage />
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <LoginPage />
        }
      />




      <Route
        path="/home"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" state={{ from: location }} />
        }

      />


      <Route
        path="/movie"
        element={
          isAuthenticated ? <MoviePage /> : <Navigate to="/login" state={{ from: location }} />
        }
      />

      <Route
        path="/favorites"
        element={
          isAuthenticated ? <FavoriteMoviesPage /> : <Navigate to="/login" state={{ from: location }} />
        }
      />


    </Routes>
  )
}

export default App
