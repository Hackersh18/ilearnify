import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
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
