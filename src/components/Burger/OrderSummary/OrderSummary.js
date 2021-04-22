import React, {Component} from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class OrderSummary extends Component{
    
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients || [] )
    .map(igkey=>{
        return ( <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>:{this.props.ingredients[igkey]}
        </li>
        )
        
    });

        return(
            <Aux>
            <Card>
            <Card.Header>Your Order!</Card.Header>
            <Card.Body>
               <p>A delicious burger with following ingredients:</p>
               <ul>
                   {ingredientSummary}
               </ul>
               <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
               <p>Continue to checkout?</p>
               <Button btntype={'Danger'} variant="primary" clicked={this.props.purchaseCancledHandler}>CANCEL</Button>
               <Button btntype={'Success'} clicked={this.props.purchaseContinuedHandler}>CONTINUE</Button>
           </Card.Body>
           </Card>
       </Aux>

        )
    }
}

export default OrderSummary;