
import './App.css';
import Cart from './Cart/Cart';
import Header from './Layout/Header';
import Meals from './Meals/Meals';
import { useState } from 'react';


function App() {
  const  [cartIsShow,setCartIsShow] = useState(false)

  const showCartHandler=()=>{
    setCartIsShow(true);
  }

  const hideCartHandler=()=>{
    setCartIsShow(false);
  }
  return (
    <div className="App">
      {cartIsShow && <Cart onClose={hideCartHandler}/>}
     <Header onShowCart={showCartHandler}/>
     <Meals/>
    </div>
  );
}

export default App;
