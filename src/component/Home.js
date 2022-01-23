// import logo from "./logo.svg";
import "../App.css";
import  Navbar from "../component/Navbar";
import Hotel from './img/Hotel.png';

function Home(){
return(
<div>
    <Navbar />


 <div style={{backgroundColor: "#b3babb",
    marginTop: "69px",
    height: "200px"}}> <h1  style={{color:"white",paddingTop:"85px",textAlign:"center"}}>Welcome to Maha Hotel Group</h1></div>

  <img src={Hotel} alt="Hotel" className="hotel" />
  
  
  
  
  </div>

);
}
export default Home;


