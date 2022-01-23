import React, { Component } from "react";
import axios from "axios"
import Navbar2 from "./component/Navbar2"
import {  Link,} from "react-router-dom";


export default class MyBranchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BranchsList: [],
        };
        // عشان نعمل ربط مع this 
        this.handleChange=this.handleChange.bind(this)
        this.handleClickAdd=this.handleClickAdd.bind(this)
    }
    // عبارة عن function
    componentDidMount() {
        axios.get("api/branch").then(response => {
            const BranchsList = response.data
            
            this.setState({ BranchsList });
        });
    }



        
   handleClickAdd(e){

    let Myhotel={
      idHotel:this.state.idHotel,
  }
let n=localStorage.getItem("LogIn")//
  e.preventDefault()
  if(n=="welcome you Authentication"){//

    axios({
    method:'post',
    url:'api/branch/add',
      data: {
        id:this.state.id,
        branchName:this.state.branchName,
        address:this.state.address,
        phone:this.state.phone,
        hotel:Myhotel,

    //     hotel:{
    //         idHotel:1
    // }
      }
    })
    .then((res)=>{
      alert("New branch was aded successfully")
      //display branches again
      axios.get("api/branch").then(response => {
        const BranchsList = response.data
        
        this.setState({ BranchsList });
    });
     
    });}//IF
    }

   handleChange(event){
    console.log(event.target.name);
    console.log(event.target.value);
    // this.setState({[event.targert.name]:event.target.value}) //
    let name=event.target.name
    let value=event.target.value
    // عشان اخزن قيمة المتغير في state
    this.setState({[name]:value})
    
 }
    deleteUseGarden(id) {
       // console.log("Delete after Entering")
      //  عشان ارسل قيمة مع string$
        axios.delete(`api/branch/delete/${id}`)
            .then(res => {
                const BranchsList = this.state.BranchsList.filter(item => item.id!== id);
                this.setState({ BranchsList });
            })
    }
    
render() {
  let {BranchsList}=this.state
let branches=[]
//if (BranchsList) {
  branches=  BranchsList.map((item => {
   
   
    return<tr>
<td>{item.id}</td>
<td>{item.branchName}</td>
<td>{item.address}</td>

<td>{item.phone}</td>
<td><button button  className="btn2"  onClick={(e) => this.deleteUseGarden(item.id, e)}>Delete Branch</button>
<Link  /* className="btn2" */ to={`/rooms/${item.id}`} >Rooms </Link>

<Link  /* className="btn2" */ to={`/meals/${item.id}`}>Meals</Link>
</td>

</tr>
}))


                       
                       
                             
          
    return (
        <div >
          <Navbar2/>
   <div className="container">
   <table border style={{width:"100%",marginTop:"70px"}} id="customers"
     >
       <br/>
       <br/>
      
  <tr>
    <th>Branch id</th>
    <th>Branch Name</th>
    <th>Branch Address</th>
    
    <th>Brach Telephone</th>
    <th></th>
  </tr> 
   {branches} 
 
</table>

   </div>
<div style={{ width: "30%", margin: "auto", height: "500px" }}>
        {" "}
        <form onSubmit={this.handleClickAdd} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="branchName"
              onChange={this.handleChange}
              placeholder="BranchName"
         required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              placeholder="Address"
           required /> 
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              onChange={this.handleChange}
              placeholder="Phone"
         required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="id"
              onChange={this.handleChange}
              placeholder="id"
         required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="idHotel"
              onChange={this.handleChange}
              placeholder="idHotel"
            required />
          </div>
          <input className="btn1" type="submit" value="Add New Branch" required />
{/* <Link to="/Branchs"><td><button onClick={this.handleClickAdd} >add..</button></td></Link> */}
        </form>
      </div>
        </div>
  )
}
}
