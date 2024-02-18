import React,{useContext} from 'react'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import {Link} from "react-router-dom"
import {DataContext} from '../DataProvider/DataProvider'
import {auth} from "../../Utility/firebase"
function Header() {
    const [{user,basket},dispatch]=useContext(DataContext);
    const totalItem=basket?.reduce((amount,item)=>{
        return item.amount + amount
    },0)
    
  return (
    <section className={classes.fixed}>
        <section>
            <div className={classes.header_container}>
                <div className={classes.logo_container}>
 {/* logo */}
 <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon" />
                </Link>
                <div className={classes.delivery}>
                    {/* delivery */}
                <span>
                    {/* icon */}
                    <SlLocationPin /> 

                </span>
                <div >
                    <p> Deliver to</p>
                    <span>America</span>
                </div>
                </div>
                
                </div>
                
               
                <div className={classes.search}>
                {/* search */}
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" name="" id="" placeholder="search product" />
                {/* icon */}
                <BsSearch size={38} />
            </div>
            <div className={classes.order_container}>
                {/* right side link */}
                
                    <Link to="" className={classes.language}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="" />
                    
                    <select name="" id="">
                       <option value=""> EN</option> 
                    </select>
                    </Link>
                    {/* three components */}
<Link to={!user && "/auth"}>
    <div>
       {
         user?(
            <>
            <p>Hello {user?.email?.split("@")[0]}</p>
            <span onClick={()=>auth.signOut()}>Sign Out</span>

            </>
            
        ):(
            <>
            <p>Hello, Sign In</p>
            <span>Account & Lists</span>
            </>
        )
       }
    
    </div>
    
        
        

    
</Link>
{/* orders */}
<Link to="/orders">
    
        <p>returns</p>
        <span>& Orders</span>

    
</Link>
{/* cart */}
<Link to="/cart" className={classes.cart}>
    
        {/* icon */}
        <BiCart size={35} />
        <span>{totalItem}</span>

    
</Link>
            </div>
            </div>
          
            




        </section>
        <LowerHeader />
    </section>
    
  )
}

export default Header