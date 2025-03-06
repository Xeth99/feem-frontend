import React from "react";
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/MoviesPage";
import SingleMovie from "./Screens/SingleMovie";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboards/Profile";
import Password from "./Screens/Dashboards/Password";
import FavoriteMovies from "./Screens/Dashboards/FavoriteMovies";
import MoviesList from "./Screens/Dashboards/Admin/MoviesList";
import Dashboard from "./Screens/Dashboards/Admin/Dashboard";
import Categories from "./Screens/Dashboards/Admin/Categories";
import AddMovies from "./Screens/Dashboards/Admin/AddMovies";
import Users from "./Screens/Dashboards/Admin/Users";
import NotFound from "./Screens/NotFound";
import ScrollOnTop from "./ScrollOnTop";
import ToastContainer from "./Components/Notifications/ToastContainer";
// import DrawerContext from './Context/DrawerContext'

function App() {
  Aos.init();
  return (
    <>
      <ToastContainer />
      {/* <DrawerContext></DrawerContext>  From the ScrollOnTop will enter
      it. */}
      <ScrollOnTop>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/favorites" element={<FavoriteMovies />} />
          <Route path="/movieslist" element={<MoviesList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/addmovie" element={<AddMovies />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollOnTop>
    </>
  );
}

export default App;
