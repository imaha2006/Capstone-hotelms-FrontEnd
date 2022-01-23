import React, { Component } from "react";
import axios from "axios"
import Navbar2 from "./Navbar2"
import { Link,} from "react-router-dom";


export default class MealsDetails extends Component {
    constructor(props) {
        super(props);
               this.state = {
            BranchsList: [],
        };
        this.handleChange=this.handleChange.bind(this)
       this.handleClickAdd=this.handleClickAdd.bind(this)
    }
    handleChange(event){
     let name=event.target.name
      let value=event.target.value
      this.setState({[name]:value})
      
   }
   deleteUseGarden(nameMeal) {
    axios.delete(`/api/Restaurant/delete/${nameMeal}`)
        .then(res => {
          
            /* const MealList = this.state.MealList.filter(item => item.nameMeal !== nameMeal);
            this.setState({ MealList }); */
            this.getBranchMeals()
        })
}
    componentDidMount() {
   
            axios.get("/api/Restaurant").then(response => {
                const MealList = response.data
                this.setState({ MealList });
               
            }); 
            this.getBranchMeals() 
    }


    getBranchMeals(){
      let pathname=window.location.pathname
     
      let branch   
      if (pathname) {
        let patharray=pathname.split("/")
       branch=patharray[2]
      } 
     
        
        
            axios.get("/api/Restaurant").then(response => {
              const MealList = response.data
              console.log(" MealList");
              console.log( MealList);
              let branch_meals=[]
              MealList.forEach(item=>{
                if (item.branch.id==branch) {
                  branch_meals.push(item)
                }
              })
            //let branch_meals=MealList.filter(item=>item.brach.id==branch)
            console.log("branch_meals");
            console.log(branch_meals);
            this.setState({branch_meals
            })
          }); 
   }



    //            const MealList = response.data
    //            console.log(" MealList");
    //            console.log( MealList);
    //            let branch_meals=[]
    //            MealList.forEach(item=>{
    //              if (item.branch.id==branch) {
    //               branch_meals.push(item)
    //              }
    //            })
            
    //          this.setState({branch_meals
    //          })
    //        }); 
    // }
  handleClickAdd(e){
      e.preventDefault()
    let Myhotel={
        idHotel:this.state.idHotel,
    }
    let MyBranch={
      id:this.state.id,
    }
    let MyMeal ={
        nameMeal:this.state.nameMeal,
        price:this.state.price,
        type:this.state.type,
        hotel:Myhotel,
        branch:MyBranch,
        img:this.state.img,

    }
        axios({
        method:'post',
        url:'/api/Restaurant/add',
          data: MyMeal,
        }).then(res=>{
          alert("New Meal was added successfully")
          this.getBranchMeals()
        });
        }
 render() {
  //let {MealList}=this.state
  let {branch_meals}=this.state



let Meals=[]
if(branch_meals){
    Meals=  branch_meals.map((item => {
       

      
      return<tr>


        
     <td>{item.nameMeal}</td>
     <td>{item.type}</td>
     <td>{item.price}</td>
     
     <td><img src={item.img} width={200} height={100}/></td>
     <td><button className="btn2"  onClick={(e) => this.deleteUseGarden(item.nameMeal, e)}>Delete Meal</button>
     <Link to="/AdminHome"><button button className="btn2" >Go To Branch</button></Link></td>
     </tr>
     })) 
}




                       
                            
          
    return (
      <div>
          <Navbar2/>


<hr/>
<div className="container">
<table id="customers" style={{width:"90%",margin:"100px auto"}}>
  <tr>
      
    <th>Meal Name</th>
    <th>Meal Type</th>
    <th>Meal price </th>
    
    <th>Image</th>
    <th></th>
    
  </tr> 
   {Meals} 
 
</table>
</div>


<div style={{ width: "30%", margin: "auto", height: "500px" }}>
        {" "}
        <form onSubmit={this.handleClickAdd} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="nameMeal"
              onChange={this.handleChange}
              placeholder="Meal Name"
              required  />
          </div>
          <div className="form-group">
           {/*  <input
              type="text"
              name="type"
              onChange={this.handleChange}
              placeholder="Type"
            /> */}
              <select onChange={this.handleChange} name="type">
              <option>Type</option>
              <option value="Normal">Normal</option>
              <option value="Double">Double</option>
              <option value="Trible">Trible</option>
            
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
              type="img"
              name="img"
              onChange={this.handleChange}
              placeholder="Image"
              required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="id"
              onChange={this.handleChange}
              placeholder="Branch ID"
              required />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="idHotel"
              onChange={this.handleChange}
              placeholder="Hotel ID"
              required/>
          </div>
          <input   className="btn1" type="submit" value="Add New Meal"  required/>

        </form>
      </div>
      </div>
  )
}
}
