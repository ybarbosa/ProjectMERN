import React, { useState } from 'react'
import { Card, Form, FormGroup, Label, Input, CardBody, CardHeader, Button, FormFeedback } from 'reactstrap'
import { Link } from 'react-router-dom'
import HTTP from '../../config/http'
import Alert from '../../components/alert'
import { saveJWT } from '../../config/jwt'
import history from '../../config/history'

const SignUp = ()=> {
    
    const [ name, setName ] = useState(null)
    const [ lastname, setLastName ] = useState(null)
    const [ age, setAge ] = useState(null)
    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ validationName, setValidationName ] = useState(null)
    const [ validationLastName, setValidationLastName ] = useState(null)
    const [ validationAge, setValidationAge ] = useState(null)
    const [ validationEmail, setValidationEmail ] = useState(null)
    const [ validationPassword, setValidationPassword ] = useState(null)
    const [ visible, setvisible ] = useState(true) 
    const [ createdUser, setCreatedUser] = useState({})

    const handleName = (event) => setName(event.target.value)
    const handlelastName = (event) => setLastName(event.target.value)
    const handlesetAge = (event) => setAge(event.target.value)
    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)
    const setAlert = () => setvisible( !visible )

    const createUser = async () => {
        try{
            const user = await HTTP.post('users/create', { name , lastname, age, email, password })
            await setCreatedUser(user)
            await saveJWT(user.data.token, email)
            history.push({
                pathname:'/',
                state: { email }
              })

        }
        catch(e) {
            setCreatedUser(e.response)
            return e.response
        }
    }


    const validate = ( e )=> {

        if( e.target.value.length === 0 && e.target.name === 'name' ){
            setValidationName('invalid')
            return
        } else if (e.target.name === 'name') { 
            setValidationName('valid') 
            return
        }
        if( e.target.value.length === 0 && e.target.name === 'lastname' ){
            setValidationLastName('invalid')
            return
        }  else if (e.target.name === 'lastname') { 
            setValidationLastName('valid') 
            return
        }
        if( ( !e.target.value ||  parseInt(e.target.value) < 1 ) && e.target.name === 'age'){
            setValidationAge('invalid')
            return 
        }  else if (e.target.name === 'age') { 
            setValidationAge('valid') 
            return 
        }
        if( e.target.value.length === 0  && e.target.name === 'email' ){
            setValidationEmail('invalid')
            return 
        }  else if (e.target.name === 'email') { 
            if(!email.match( /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i )) {
                setValidationEmail('invalid')
                return
            }
            setValidationEmail('valid') 
            return 
        }
        if( e.target.value.length  === 0 && e.target.name === 'password' ){
            setValidationPassword('invalid')
            return 
        }  else if (e.target.name === 'password') { 
            setValidationPassword('valid') 
            return 
        }
       
    }

  
    return <div className="container d-flex justify-content-center col-lg-12"> 
            <header className="col-lg-5 mt-5">
                <Card className="col-sm-12 p-0">
                    <CardHeader tag="h4" className="text-muted"> Cadastro</CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup >
                                <Label for="name">Nome</Label>
                                <Input valid={ validationName === 'valid' ? true : false } invalid={ validationName === 'invalid' ? true : false } type="text" name="name" id="name" placeholder="Digite seu nome" onChange={ handleName } onBlur={ validate } />
                                <FormFeedback >Nome invalido</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastname">Sobrenome</Label>
                                <Input valid={ validationLastName === 'valid' ? true : false } invalid={ validationLastName === 'invalid' ? true : false} type="text" name="lastname" id="lastname" placeholder="Digite seu sobrenome" onChange={ handlelastName } onBlur={ validate } />
                                <FormFeedback >Sobrenome Invalido</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="age">Idade</Label>
                                <Input valid={ validationAge === 'valid' ? true : false } invalid={ validationAge === 'invalid' ? true : false} type="number" name="age" id="age" placeholder="Digite sua Idade" onChange={ handlesetAge } onBlur={ validate }/>
                                <FormFeedback >Idade invalida</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input valid={ validationEmail === 'valid' ? true : false } invalid={ validationEmail === 'invalid' ? true : false} type="text" name="email" id="email" placeholder="Digite seu email" onChange={ handleEmail } onBlur={ validate } />
                                <FormFeedback >Email invalido</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Senha</Label>
                                <Input valid={ validationPassword === 'valid' ? true : false } invalid={ validationPassword === 'invalid' ? true : false} type="password" name="password" id="password" placeholder="Digite seu password" onChange={ handlePassword } onBlur={ validate } />
                                <FormFeedback >Senha invalida</FormFeedback>
                            </FormGroup>
                        </Form>
                    <div className="mb-2 mt-2 d-flex " >
                        <Button color="success" onClick={ createUser }>Criar Conta</Button>
                        <Link to="/login" className="btn btn-outline-primary ml-3"  role="button" aria-pressed="true">Login</Link>
                    </div>
                    </CardBody>
                </Card>
            { createdUser.status > 400  ? <Alert colorAlert="danger" isOpen={ visible } titleAlert="Erro no login" toggle={ setAlert } /> : '' }
           
            </header>
           </div>
}


export default SignUp;