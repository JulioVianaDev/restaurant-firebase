import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'

import { useContext,useEffect, useState } from "react";
import CartContext from "../context/cart-context";

const HeaderCartButton = props =>{
  const cartCtx = useContext(CartContext);
  const [btnIsHigh,setBtnIsHigh] = useState(false)
  const {items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber,item)=>{
    return currentNumber + item.amount
  },0);
  const btnClasses= `${classes.button} ${ btnIsHigh? classes.bump : ''}`
  useEffect(()=>{
    if(items.length ===0){
      return
    }
    setBtnIsHigh(true)
    const timer = setTimeout(()=>{
      setBtnIsHigh(false)
    },300);
    return()=>{
      clearTimeout(timer)
    }
  },[items])
  return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon/>
    </span>
    <span>You Cart</span>
    <span className={classes.badge}>
      {numberOfCartItems}
    </span>
  </button>
}

export default HeaderCartButton;