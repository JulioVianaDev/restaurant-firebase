import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext,useState } from 'react';
import CartContext from '../context/cart-context.js'
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
  const [isSubmiting,setIsSubmiting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false);
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

  const submitOrder = async  (userData)=>{
    setIsSubmiting(true);
    await fetch(`https://react-restaurant-http-default-rtdb.firebaseio.com/orders.json`,{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    })
    setIsSubmiting(false);
    setDidSubmit(true);
    cartContext.clearCart();
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
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && <Checkout onConfirm={submitOrder} CloseForm={CloseForm}/> }
      {!showForm && modalActions}
    </>
  );
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  return (
      <Modal onClose={props.onClose}>
        {!isSubmiting && !didSubmit && cartModalContent}
        {isSubmiting && isSubmittingModalContent}
        {!isSubmiting && didSubmit && didSubmitModalContent}
      </Modal>
    );
};

export default Cart;