import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom';

const UpdateStorePage = () => {
    const [store, setStore] = useState ("")
    const [number, setNumber] = useState ("")
    const [isOpen, setIsOpen] = useState(false)
    const [errors, setErrors] = useState([])
    
 
 
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8000/api/stores/${id}`)
            .then(response => {
                console.log(response.data)
                const store = response.data
                setStore(store.store)
                setNumber (store.number)
                setIsOpen (store.isOpen)

                
            })
            .catch(err => console.log(err))
    }, [])
 

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/stores/${id}`,
            {
                store: store,
            number: number,
            isOpen: isOpen,
            open: "TBA"
            })
            .then(response => {
                navigate(`/stores/${id}`)
            })
            .catch(err => {
                const errResponse = err.response.data.errors
    
                const errArr = []
                for(const eachKey in errResponse){
                    errArr.push(errResponse[eachKey].message)
                }
                setErrors(errArr)
            })
    }
 
 
  return (
    
    <div>
        <div>
        <h1>Store Finder</h1>
   <h4>Edit store</h4>
   <Link to="/"><h5>go back home</h5></Link>
   <form onSubmit={handleSubmit}>
       <div>
           <label>Store Name</label>
           <input type="text" name="store" value={store} onChange={e => setStore(e.target.value)} />
       </div>
       <div>
           <label>Store Number</label>
           <input type="text" name="number" value={number} onChange={e => setNumber(e.target.value)} />
       </div>
       <div>
           <label>Open?</label>
           <input type="checkbox" name="open" value={isOpen} onChange={e => setIsOpen(e.target.checked)} />
       </div>
       
       <button type="submit">Edit Store</button>
       
   </form>
   {
        errors.map((eachErr, idx)=>
        
            <p key={idx}>{eachErr}</p>
            
        )
        
    }

</div>

    </div>
  )
}

export default UpdateStorePage