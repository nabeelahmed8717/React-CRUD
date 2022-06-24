import { Route, Redirect } from "react-router-dom";

import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
   <div>
    


     <Route exact path="/">
        <Redirect to="/Login" />
      </Route>


      <Route path="/Login">
        <Login/>
      </Route>

      <Route path="/Register">
        <Register/>
      </Route>
   </div>
  );
}

export default App;
