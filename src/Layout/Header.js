import image from '../Assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = props =>{
  return(
    <>
      <header className={classes.header}>
        <h1>my restaurant</h1>
        <HeaderCartButton/>
      </header>
      <div className={classes['main-image']}>
        <img src={image}  alt=""/>

      </div>
    </>
  )
}

export default Header;