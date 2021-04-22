import React, { Component } from "react";
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
class App extends Component {
  // state={   //vid:543  removing old inceptors
  //   show:true,
  // }
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show: false});
  //   }
  //     ,5000)
  // }
  render() {
    return(
      <div>
        <Layout>
         {/* { this.state.show ? <BurgerBuilder /> : null}; */}
         <BurgerBuilder />
        </Layout>
    </div>
    )
    
  }
}

export default App;
