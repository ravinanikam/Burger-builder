import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// debugger;
const burger=(props)=>{
   
    //video:129 and 130
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkeys=>{ 
        return[...Array(props.ingredients[igkeys])]
        .map((_,i)=>{
            return <BurgerIngredient key={igkeys + i} type={igkeys}/>;

        }) ;
        
        //[...Array[]]=>in [] it should be the length of the given ingredients i.e props.ingredients
    }).reduce((arr,ele)=>{
        // debugger;
        return arr.concat(ele);
    },[]);
    //reduce() transforms an array which takes previous value i.e( displayed  as arr) and current value i.e(displayed  as ele);
     // extracts the keys of given object and converts it to array.will give an array of string cheese, salad, meat...which is in the burger builder

     if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
     }


    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>

        </div>
    );
}

export default burger;