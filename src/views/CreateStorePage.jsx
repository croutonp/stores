import React, {useState} from 'react'
import axios from 'axios'
import { Link, isRouteErrorResponse, useNavigate } from 'react-router-dom'


const CreateStorePage = () => {
   const [store, setStore] = useState ("")
   const [number, setNumber] = useState ("")
   const [isOpen, setIsOpen] = useState(false)
   const [errors, setErrors] = useState([])
   
   
   const navigate = useNavigate()
   const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8000/api/stores`,
        {
            store: store,
            number: number,
            isOpen: isOpen,
            open: "TBA"
            
        })
        
        .then(response => {
            navigate(`/stores/${response.data._id}`)
        })
        .catch(err=>{
            const errResponse = err.response.data.errors
       
       
            const errArr = []
            for (const eachKey in errResponse){
              errArr.push(errResponse[eachKey].message)
            }
            setErrors(errArr)
            
          })
       
}


   return (
    <div>
        <h1>Store Finder</h1>
        <h4>Add a new Store!</h4>
        <Link to="/"><h5>go back home</h5></Link>
    <form onSubmit = {handleSubmit}>
        <div>
            <div>
                <label>Store Name</label>
                <input type ="text" name="store" value={store} onChange={e => setStore(e.target.value)} />
            </div>
            <div>
                <label>Store Number</label>
                <input type ="text" name="number" value={number} onChange={e => setNumber(e.target.value)} />
            </div>
            <div>
                <label>Open?</label>
                <input type="checkbox" checked={isOpen} onChange={e => setIsOpen(e.target.checked)}/>
            </div>
        </div>
        
        <button type="submit">Add a new Store</button>
        
    </form>
    {
        errors.map((eachErr, idx)=>
        
            <p key={idx}>{eachErr}</p>
            
        )
        
    }
    </div>
  )
}



export default CreateStorePage