import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import CourseInfo from './Components/CourseInfo';

function App() {
  return (
    <div className="w-screen min-h-screen bg-[#87bcc7] flex flex-col font-inter">
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
    </Routes>
    </div>
  );
}

export default App;
