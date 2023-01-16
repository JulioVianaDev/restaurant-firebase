import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../context/cart-context.js'
import CartItem from './CartItem';
const Cart = (props) => {
  const cartContext =  useContext(CartContext);
  const totalAmount = `$ ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = id =>{
    cartContext.removeItem(id)
  }

  const cartItemAddHandler = item=>{
    cartContext.addItem(item);
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item,index) => (
        <CartItem 
          key={item.id} 
          name={item.name} 
          amount={item.amount} 
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
         {hasItems &&<button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;