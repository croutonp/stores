import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const DashboardPage = () => {
    const [storeList, setstoresList] = useState([])    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/stores`)
        .then(response => setstoresList(response.data))
        .catch(err=>console.log(err))


    }, [])
 
    const removeFromDom = (deleteId) => {
        const filteredList = storeList.filter((eachstore, idx) => eachstore._id !== deleteId )
        setstoresList(filteredList)
    }
 
 
    const handleDelete = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/stores/${deleteId}`)
        // .then(response =>
        //     
        //     ) --->this method will only show you the deleted ones when you refresh because it has the same link as the dashboard
        .then(response => {
            removeFromDom(deleteId);
        })
        .catch(err => console.log(err))
    }
 
 
  return (
    <div>
        <h1>Store Finder</h1>
        <h4>Find stores in your area!</h4>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Store</th>
                        <th>Store Number</th>
                        <th>Open</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storeList.map((eachStore, idx)=>(
                            <tr key={eachStore._id}>
                                <td><Link to={`/stores/${eachStore._id}`}> {eachStore.store}</Link></td>
                                <td>{eachStore.number}</td>
                                <td>{eachStore.isOpen?"True":"False"}</td>
            
                                <td>
                                     <button onClick={()=>{handleDelete(eachStore._id)}} >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <Link to="/stores/add"><button>Can't find your store?</button></Link>

       </div>


  )
}



        
        
        
           

export default DashboardPage