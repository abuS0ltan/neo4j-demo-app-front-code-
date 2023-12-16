import { Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './App.css';
import Home from './Componnents/Home/Home.jsx';
import Navbar from './Componnents/Navbar/Navbar.jsx';
import Register from './Componnents/Register/Register.jsx';
import Students from './Componnents/Students/Students.jsx';
import Courses from './Componnents/Courses/Courses.jsx';
import Registercourses from './Componnents/Registercourses/Registercourses.jsx';
import Fotter from './Componnents/Fotter/Fotter.jsx';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='home' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/students' element={<Students/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/registercourses' element={<Registercourses/>}/>
      </Routes>
      <Fotter/>
    </div>
  );
}

export default App;
