import classes from './MealItem.module.css'
import { useContext } from 'react';
import CartContext from '../../context/cart-context';
import MealItemForm from './MealItemForm';
const MealItem = props =>{
  
  const price = `R$${props.price.toFixed(2)}`
  const ctx = useContext(CartContext)
  const addCartHandler = amount =>{
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price

    })
  }
  return <li className={classes.meal}>
    <div>
      <div><h3>{props.name}</h3></div>
      <div className={classes.description}>{props.descriptin}</div>
      <div className={classes.price}>{price}</div>
    </div>
    <div>
      <MealItemForm onAddToCart={addCartHandler}/>
    </div>
  </li>
}
export default MealItem;