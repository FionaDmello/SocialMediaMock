import { useContext } from "react";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

// for routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from "./context/authContext";

// Context API offered by react acts in ways similar to redux
// by helping pass data is supposed to be available in multiple disconnected components of the app,
// without having to rely on parent-child relations between components. 

// Since this is a small app, and because of the time constraint, 
// I shall use the context api instead of using redux to maintain a app level global data state for this app.
// For bigger, extensively complex apps use Redux for state management instead of the Context API.

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user ? <Home /> : <Register /> }
        </Route>
        <Route path="/register">
          { user ? <Redirect to="/"/> : <Register /> } 
        </Route>
        <Route path="/login">
          { user ? <Redirect to="/"/> : <Login /> }
        </Route>
        <Route path="/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
