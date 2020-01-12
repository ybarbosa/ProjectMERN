import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Button } from 'reactstrap'
import Alert from '../../components/alert'
import HTTP from '../../config/http'
import { validateJWT } from '../../config/jwt'
import { Link } from 'react-router-dom'
import history from '../../config/history'

const SignIn = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ visible, setvisible ] = useState(false) 
  const [ user, setUser ] = useState({})

  const setAlert = () => setvisible( false )
  const handleEmail = ( e ) => setEmail(e.target.value)
  const handlePassword = ( e ) => setPassword(e.target.value)
  
  const fetchUser = async () => {
    try{
      const auth = await validateJWT(localStorage.getItem(email), { email, password } )
      HTTP.defaults.headers['auth'] = auth
      const data = await HTTP.post('login', { email, password } )
      const [ { _id } ] = await data.data.user
      setvisible( true )
      setUser( data )
      history.push({
        pathname:'/',
        state: { email, id: _id }
      })
      

    }
    catch( e ){
      setvisible( true )
      setUser(true)
    }
  }


  return (
    <div className="App container d-flex justify-content-center col-lg-12">
      <header className="App-header col-lg-5 mt-5">
      
        <Card className="col-lg-12 p-0">
        <CardHeader  tag="h4" className="text-muted col-sm-12">Login</CardHeader>
        <CardBody>
          <Form className="col-lg-12 ">
            <FormGroup>
              <Label for="foremail">
                Email
              </Label>
              <Input 
                type='email' 
                name='email' 
                value={ email } 
                id='foremail' 
                onChange={ handleEmail }
                placeholder='Digite seu email'/>
            </FormGroup>
            <FormGroup>
              <Label for="forpassword">
                Senha
              </Label>
              <Input 
                type='password' 
                name='password' 
                id='forpassword'
                value={ password } 
                onChange={ handlePassword }
                placeholder='Digite sua senha' />
            </FormGroup>
          </Form>
         <div className="col-lg-12 mb-4">
            <Link  to="/cadastro" className="btn btn-outline-info mr-3" color="info" > 
             Cadastro
            </Link> 
            
            <Button color="primary"  disabled={ email.length && password.length ? false : true } onClick = { fetchUser }> 
            Login 
            </Button> 
            
         </div>
         </CardBody>
        </Card>
        { user
          ?
          <Alert  titleAlert="Erro no login " colorAlert="danger" isOpen={ visible } toggle={ setAlert } />
          :
          null
        }
       
      </header>
    </div>
  );
}

export default SignIn;
