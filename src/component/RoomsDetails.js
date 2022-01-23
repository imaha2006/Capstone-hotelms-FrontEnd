import React, { Component } from "react";
import axios from "axios"
import Navbar2 from "./Navbar2"
import { Link,} from "react-router-dom";


export default class RoomsDetails extends Component {
    constructor(props) {
        super(props);
      ;
this.state = {
            BranchsList: [],
        };
        this.handleChange=this.handleChange.bind(this)
       this.handleClickAdd=this.handleClickAdd.bind(this)
    }
    handleChange(event){
    //console.log("handle>>>>>>>..");
     let name=event.target.name
      let value=event.target.value
      console.log(name);
      console.log(value);
      this.setState({[name]:value})
      
   }
   deleteUseGarden(numberRoom) {
    axios.delete(`https://hotelmanagmentplus.herokuapp.com/api/room/delete/${numberRoom}`)
        .then(res => {
           /*  const RoomList = this.state.RoomList.filter(item => item.numberRoom !== numberRoom);
            this.setState({ RoomList }); */
            // من هنا جبنا branch 
            this.getBranchRooms()
        })
}

// 
getBranchRooms(){
  // url لصفحةالي انافيها يحتوي على branch id
  let pathname=window.location.pathname
 
  let branch 
   // نتاكد انه في قيمه url
  if (pathname) {
    let patharray=pathname.split("/")
    // branch مخزنه index رقم 2
   branch=patharray[2]
  } 
 
    
    // end point
        axios.get("https://hotelmanagmentplus.herokuapp.com/api/room").then(response => {
           const RoomList = response.data
           console.log(" RoomList");
           console.log( RoomList);
           let branch_rooms=[]
          //  arr الي خزنا فيها
           RoomList.forEach(item=>{
            //  اي وحده فيها تساوي branch
             if (item.branch.id==branch) {
              //  الي خاصين في هذا branch
               branch_rooms.push(item)
             }
           })
         //let barnch_rooms=RoomList.filter(item=>item.brach.id==branch)
         console.log("barnch_rooms");
         console.log(branch_rooms);
        //  خزناها هنا
         this.setState({branch_rooms
         })
       }); 
}
    componentDidMount() {
 this.getBranchRooms()
   
      }
    handleClickAdd(event){
        event.preventDefault();
        let Myhotel={
            idHotel:this.state.idHotel,
        }
        let MyBranch={
          id:this.state.id,
        }
        let MyRoom ={
            numberRoom:this.state.numberRoom,
            typeRoom:this.state.typeRoom,
            price:this.state.price,
            hotel:Myhotel,
            branch:MyBranch,
             img:this.state.img,
        }
    
        axios({
        method:'post',
        url:'https://hotelmanagmentplus.herokuapp.com/api/room/add',
          data: MyRoom,
        }).then(res=>{
          alert("New room was added successfuly")
          this.getBranchRooms()})
        }
  render() {
   
  let {branch_rooms}=this.state



let Rooms=[]
if(branch_rooms){
    Rooms=  branch_rooms.map((item => {
      
      
      return<tr>
     <td>{item.numberRoom}</td>
     <td>{item.typeRoom}</td>
     <td>{item.price}</td>
     
     <td><img src={item.img} width={200} height={100}/></td>
     <td><button button className="btn2" onClick={(e) => this.deleteUseGarden(item.numberRoom, e)}>Delete Room</button>
     <Link to="/AdminHome"><button button className="btn2" >Go To Branch</button></Link></td>

     </tr>
     
     })) 
}
      
    return (
      <div>
          <Navbar2/>




<div className="container">
<table style={{ width:"90%", margin:"100px auto"}} id="customers">
  <tr>
    <th>Room Number</th>
    <th>Room Type</th>
    <th>Room price </th>
    
    <th>Image</th>
    <th></th>
    
  </tr> 
   {Rooms} 
 
</table>
</div>

<div style={{ width: "30%", margin: "auto", height: "500px" }}>
        {" "}
        <form  onSubmit={this.handleClickAdd}  className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="numberRoom"
              onChange={this.handleChange}
              placeholder="Room Number"
         required />
          </div>
          <div className="form-group">
            {/* <input
              type="text"
              name="typeRoom"
              onChange={this.handleChange}
              placeholder="Room Type"
            /> */}
            <select onChange={this.handleChange} name="typeRoom">
              <option>Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Queen">Queen</option>
            
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="price"
              onChange={this.handleChange}
              placeholder="Price"
          required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="img"
            onChange={this.handleChange}
              placeholder="Image URL"
           required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="idHotel"
             onChange={this.handleChange}
              placeholder="Hotel ID"
           required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="id"
              onChange={this.handleChange} 
              placeholder="Branch ID"
            required/>
          </div>
           <input className="btn1" type="submit" value="Add New Room" required/> 
        
        </form>
      </div>
      </div>
  )
}
}
