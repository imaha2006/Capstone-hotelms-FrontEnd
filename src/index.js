import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import AdminHome from './AdminHome';
import './index.css';
import Information from './component/Information'
import RoomsDetails from "./component/RoomsDetails"
import MealsDetails from "./component/MealsDetails"

ReactDOM.render(
<BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} > </Route> 
             <Route path="/App" element={<App/>}></Route> 
              <Route path="/Login" element={<Login />} ></Route>  
              <Route path="/AdminHome" element={< AdminHome />}></Route>
             <Route path="/Information" element={<Information />} /> 
              <Route  path="/rooms/:branchId" element={< RoomsDetails/>}/> 
             <Route  path="/meals/:branchId" element={< MealsDetails/>}/>  
          
          </Routes>
       </BrowserRouter>

, document.getElementById("root"));

