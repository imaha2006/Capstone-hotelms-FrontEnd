import React, { Component } from "react";
import axios from "axios"
export default class MyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InfoList: [],
        };
    }
    componentDidMount() {
        axios.get("/api/branch").then(response => {
            const InfoList = response.data
            this.setState({ InfoList });
        });
    }
    
   
render() {
    return (
        <div >
            <div >
               <p></p>
                    {this.state.InfoList.map((item => (
                        <tr key={item.id}>
                       <div >
                        <div ></div>
                         <div >
                           <div >
                         </div>
                        </div>
                      <div >
                      </div>
                        <div>
                            <p></p>
                         <p>Name :{item.typeRoom} </p>
                        <p> Price : {item.price}</p> 
                         <p>Meal Name :{item.nameMeal} </p>
                        <p> IMG :{item.img} </p> 
                        </div>
                       <div >
                      </div>
                     </div>
                        </tr>
                    )))
                    }
        </div>
        </div>
  )
}
}
