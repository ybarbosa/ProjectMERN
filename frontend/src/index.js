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
            const AUTH = props.location.state ? true : false
            if(AUTH) localStorage.getItem(props.location.state.email)
            
            return AUTH ? (
                <Component {...props} />
            ) : (
              <Redirect 
                to={{
                
                    pathname: "/login",
                    state: { from: props.location }
                }}
              />
            )}
        } 
    />
)


ReactDOM.render(
    <Router history={history}> 
        <Switch>
         <Route path="/login" exact  /*component={ SignIn } */  render={ (props ) => <SignIn {...props}  />} />
         <Route path="/cadastro" component={ SignUp } />
         <PrivateRouterHome  exact path="/" component={ Home }/>
      </Switch> 
    </Router>, document.getElementById('root'));
