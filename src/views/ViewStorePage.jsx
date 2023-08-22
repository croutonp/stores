import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom';

const ViewStorePage = () => {
    const [store, setStore] = useState()
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/stores/${id}`)
        .then(response=>setStore(response.data))
        .catch(err => console.log(err))
    }, [])
 
    return (
        <div>
          <h1>Store Finder</h1>
          <Link to="/"><h5>go back home</h5></Link>
            {
                store ?
                    <div>
                        <p>Store Name: {store.store}</p>
                        <p>Store Number: {store.number}</p>
                        <p>{store.isOpen?"Open":"Closed"}</p>
                        <Link to={`/stores/edit/${id}`}><button>Edit Store Details</button></Link>
                    </div>:
                    <p>....loading....</p>
        }
        </div>
    )
 
}

export default ViewStorePage