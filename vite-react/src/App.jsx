import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Body from "./components/Body";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminLayout from "./components/AdminLayout";
import About from "./components/About";
import BoatAdditionForm from "./components/admin components/BoatAdditionForm";
import AddBoat from "./components/admin components/AddBoat";
import ShowBoats from "./components/admin components/ShowBoats";
import UserLayout from "./components/UserLayout";
import ShowBoatCards from './components/user components/ShowBoatCard'
import BookingPage from "./components/user components/BookingPage";

function App() {
  return (
    <>
      <div className="pages">
        <BrowserRouter>
          <Routes className="components">
            <Route element={<Layout />} path="/">
              <Route element={<Body />} index />
              <Route element={<Register />} path="register" />
              <Route element={<Login />} path="login" />
              
              
            </Route>
            <Route element={<AdminLayout />} path="/admin">
            <Route element={<Body/>} index/>
            <Route element={<About/>} path="about"/>
            <Route element={<AddBoat/>} path="add-boat"/>
            <Route element={<ShowBoats/>} path="boats"/>
            
          </Route>
          <Route element={<UserLayout/> } path="/user">
          <Route element={<Body/>} index/>
          <Route element={<About/>} path="about"/>
          <Route element={<ShowBoatCards/>} path="boats"/>
          <Route element={<BookingPage/>} path="booking/:id"/>
          

          </Route>

          
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
