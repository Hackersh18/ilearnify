import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import CourseInfo from './Components/CourseInfo';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/LoginForm';
import Catalog from './Components/Catalog';
import Cart from './Components/Cart';
import Questions from './Components/Questions';
import Failed from './pages/Failed';
import Success from './pages/Success';
import Product from './pages/Product';


function App() {
  return (
    <div className="w-full min-h-screen bg-[#3b48aa] flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route
          path="signup"
          element={
              <Signup />
          }
        />
      <Route
          path="login"
          element={
              <Login/>
          }
        />
      <Route
          path="profile"
          element={
              <Profile />
          }
        />
      <Route
          path="course"
          element={
              <CourseInfo />
          }
        />
        <Route
          path="About"
          element={
              <About />
          }
        />
        <Route
          path="Contact"
          element={
              <Contact/>
          }
        />
        {/* <Route
          path="/catalog"
          Component={Product}
        /> */}
        <Route
          path="cart"
          element={
              <Cart/>
          }
        />
        <Route
          path="question"
          element={
              <Questions/>
          }
        />
        <Route
          path="/success"
          Component={Success}
        />
         <Route
          path="/product"
          Component={Product}
        />
        <Route
          path="/failed"
          Component={Failed}
        />
    </Routes>
    </div>
  );
}

export default App;
