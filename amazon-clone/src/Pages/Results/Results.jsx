import React,{useEffect,useState} from 'react'
import Layout from "../../Components/Layout/Layout"
import ProductCard from "../../Components/Product/ProductCard"
import classes from "./results.module.css"
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../API/endPoints'
import Loader from '../../Components/Loader/Loader'

function Results() {
  const [results,setResults]=useState([]);
  const {categoryName}= useParams();
  const [isLoading, setIsLoading]= useState(false);
  useEffect(()=>{
    axios.get(`${productUrl}/products/category/${categoryName}`).then((res)=>{
      console.log(res.data)
      setResults(res.data)
      setIsLoading(false)
  
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  },[])
 
  return (
    <Layout> 
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
      </section>E
</Layout>
  )
}

export default Results