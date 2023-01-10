
import './App.css';
import Cart from './Cart/Cart';
import Header from './Layout/Header';
import Meals from './Meals/Meals';
import { useState } from 'react';
import CartProvider from './context/CartProvider';


function App() {
  const  [cartIsShow,setCartIsShow] = useState(false)

  const showCartHandler=()=>{
    setCartIsShow(true);
  }

  const hideCartHandler=()=>{
    setCartIsShow(false);
  }
  return (
    <CartProvider>
      <div className="App">
        {cartIsShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <Meals/>
      </div>
    </CartProvider>
  );
}

export default App;
