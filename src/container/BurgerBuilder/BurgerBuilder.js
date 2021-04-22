import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Sipnner from '../../components/UI/Spinners/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
  salad: 0.9,
  bacon: 0.99,
  cheese: 0.69,
  meat: 1,
  lettuce: 0.4,
};

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state={};
  // }
  state = {
    ingredients:null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading:false,
    error:false,
  };
componentDidMount(){
  axios.get('https://burger-builder-cd0c9-default-rtdb.firebaseio.com/ingredients.json')
       .then(response=>{
          this.setState({
            ingredients:response.data
          });
  }).catch(error =>{
    this.setState({
        error:true,
    })
  });
}
  //Order Now button.
  updatePurchaseState(ingredients) {
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    // debugger;
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients,
    };
    updateIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredient,
    });
    this.updatePurchaseState(updateIngredient);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredient = {
      ...this.state.ingredients,
    };
    updateIngredient[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredient,
    });
    this.updatePurchaseState(updateIngredient);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancleHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("You Continue");
    this.setState({loading:true});
    const orders = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Ravina Nikam",
        address: {
          street: "Barn Hill",
          zipcode: "HA99JX",
          country: "UK",
        },
        email: "test128@test.com",
      },
      delivery: "Fastest",
    };
    axios
      .post("/orders.json", orders)
      .then((response) => {
        this.setState({loading:false, purchasing:false});
      })
      .catch((error) => {
        console.log({loading:false, purchasing:false});
      });
  };

  render() {
   
    const disableInfo = {
      ...this.state.ingredients,
    };
    //{salad= true, bacon=false}
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let  ordersummary=null;
    let burger =this.state.error ? <p>Ingredients can't be loaded!</p> : <Sipnner />
    if(this.state.ingredients){
      burger=(
        <Aux>
          <Burger ingredients={this.state.ingredients} />,
          <BuildControls
              ingredientsAdded={this.addIngredientHandler}
              ingredientsRemoved={this.removeIngredientHandler}
              disabled={disableInfo}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              price={this.state.totalPrice}
            />
          </Aux>
          );
          ordersummary = <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancledHandler={this.purchaseCancleHandler}
          purchaseContinuedHandler={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
    }
    if(this.state.loading){
      ordersummary = <Sipnner />
    }

     
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancleHandler}
        >
            {ordersummary}
        </Modal>
          {burger}
        <div>
          
        </div>
      
        
        
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
