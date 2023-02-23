import { Route, Switch, } from 'react-router-dom'
import Home from "../Home/Home";
import CreateDiscount from "../CreateDiscount/CreateDiscount";


function App() {


  return (
    <div className="app">

      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/createOffer' exact>
          <CreateDiscount/>
        </Route>


      </Switch>


    </div>
  );

}






export default App;








