import React,{useContext, useState} from 'react'
import Layout from "../../Components/Layout/Layout"
import classes from './payment.module.css'
import{DataContext} from "../../Components/DataProvider/DataProvider"
import ProductCard from "../../Components/Product/ProductCard"
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import {axiosInstance} from '../../API/axios'
// import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import {db} from '../../Utility/firebase'
import {useNavigate} from 'react-router-dom'
import {Type} from '../../Utility/action.type'

function Payment() {
  const [{user,basket},dispatch]=useContext(DataContext);

  const [cardError,setCardError]=useState(null)
  // console.log(user)
  const [processing,setProcessing]= useState(false)

  const totalItem=basket?.reduce((amount,item)=>{
      return item.amount + amount
  },0)

  const total=basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

  const stripe = useStripe();
  const elements = useElements();
  const navigate= useNavigate()
   
 const handleChange = (e)=>{
    e?.error?.message? setCardError(e?.error?.message): setCardError("")   
 }

 const handlePayment = async (e) => {
  e.preventDefault();

  try {
    setProcessing(true);

    // Ensure user is defined before accessing user.uid
    if (!user) {
      throw new Error("User is not authenticated");
    }

    // Ensure stripe is properly initialized
    if (!stripe) {
      throw new Error("Stripe is not initialized");
    }

    // Backend request to get client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`,
    });

    const clientSecret = response.data?.clientSecret;

    // Confirm card payment with stripe
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // Save order data to Firestore
    await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });
    //empty the basket
  dispatch({type: Type.EMPTY_BASKET});

    setProcessing(false);
    navigate("/orders", { state: { msg: "You have placed a new order" } });
  } catch (error) {
    console.error(error);
    setProcessing(false);
  }
};


  return (
    <Layout>
      {/* header  */}
    <div className={classes.payment_header}>Checkout {totalItem} items</div>

{/* payment method */}

<section className={classes.payment}>

{/* address */}

<div className={classes.flex}>
  <h3>Delivery Address</h3>
  <div>
  <div>{user?.email}</div>
  <div>123 React Lane</div>
  <div>Chicago, IL</div>
  </div>
  
</div>
<hr />

{/* product */}
<div className={classes.flex}>
  <h3>Review items and delivery</h3>
  <div>
    {
      basket?.map((item)=><ProductCard product={item} flex={true}/>)
    }
  </div>
</div>
<hr />
{/* card form */}
<div className={classes.flex}>
  <h3>Payment methods</h3>
  <div className={classes.payment_card_container}>
<div className={classes.payment_details}>
  <form onSubmit={handlePayment} >
    {/* error */}
    {
      cardError && <small style={{color:"red"}}>{cardError}</small>
    }
    {/* card element */}
  <CardElement onChange={handleChange}/>

  {/* price */}
  <div className={classes.payment_price}>
    <div>
      <span style={{display:"flex", gap:"10px"}}>

        <p>Total Order |</p> <CurrencyFormat amount={total} /> 
      </span>
      </div>
      <button type='submit'>
        {processing?(
<div className={classes.loading}>
  <ClipLoader color="grey" size={12} />
  <p>Please Wait ...</p>
</div>
        ):"Pay Now"
        }
        
        </button>
  </div>
  </form>
</div>
  </div>
</div>

</section>
</Layout>
  )
}

export default Payment