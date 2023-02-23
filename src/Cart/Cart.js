import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext,useState } from 'react';
import CartContext from '../context/cart-context.js'
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
  const cartContext =  useContext(CartContext);
  const totalAmount = `$ ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const [showForm,setShowForm]= useState(false)
  const cartItemRemoveHandler = id =>{
    cartContext.removeItem(id)
  }

  const cartItemAddHandler = item=>{
    cartContext.addItem(item);
  }
  const onClickHandler=()=>{
    setShowForm(true)
  }
  const CloseForm=()=>{
    setShowForm(false)
  }

  const submitOrder = (userData)=>{
    fetch(`https://react-restaurant-http-default-rtdb.firebaseio.com/orders.json`,{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    })
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
  const modalActions = (<div className={classes.actions}>
                        <button className={classes['button--alt']} onClick={props.onClose}>
                          Close
                        </button>
                        {hasItems &&<button className={classes.button} onClick={onClickHandler}>Order</button>}
                      </div>)
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && <Checkout onConfirm={submitOrder} CloseForm={CloseForm}/> }
      {!showForm && modalActions}
    </Modal>
  );
};

export default Cart;