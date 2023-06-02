import React,{Fragment} from 'react';
import mealsImage from '../../asset/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
   return (
     <Fragment>
       <header className={classes.header}>
         <h1 className={classes.h1}>THE DINING CORNER</h1>
         <HeaderCartButton onClick={props.onShowCart} />
       </header>
       <div className={classes['main-image']}>
         <img src={mealsImage} alt='A table full of delicious food!' />
       </div>
     </Fragment>
   );
 };
 
 export default Header;