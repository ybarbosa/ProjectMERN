import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import history from './config/history'
import SignIn from './module/auth/signIn'
import SignUp from './module/auth/signUp'
import Home from './module/home/home.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'

const PrivateRouterHome = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={props =>{
            const AUTH = props.location.state || localStorage.key(0) ? true : false
            
            if(!props.location.state || AUTH ) props.location.state = { email : localStorage.key(0), id: localStorage.getItem("id") }
                
            return AUTH ? (
                <Component {...props} />
            ) : (
              <Redirect 
                to={{
                
                    pathname: "/login",
                    state: { from : props.location }
                }}
              />
            )}
        } 
    />
)
const PrivateRouterLogin = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={props =>{
            const AUTH = !localStorage.key(0) ? true : false
            return AUTH ? (
                <Component {...props} />
            ) : (
              <Redirect 
                to={{
                    pathname: "/",
                }}
              />
            )}
        } 
    />
)
const PrivateRouterSignUp = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={props =>{
            const AUTH = !localStorage.key(0) ? true : false
            return AUTH ? (
                <Component {...props} />
            ) : (
              <Redirect 
                to={{
                    pathname: "/",
                }}
              />
            )}
        } 
    />
)


ReactDOM.render(
    <Router history={history}> 
        <Switch>
         <PrivateRouterLogin path="/login" exact component={ SignIn } />
         <PrivateRouterSignUp path="/cadastro" component={ SignUp } />
         <PrivateRouterHome  exact path="/" component={ Home }/>
      </Switch> 
    </Router>, document.getElementById('root'));
