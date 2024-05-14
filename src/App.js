import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';

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
    </Routes>
    </div>
  );
}

export default App;
