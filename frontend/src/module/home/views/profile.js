import React, {useState} from 'react'
import {ListGroup,ListGroupItem, Button }  from 'reactstrap'
import Modal from '../../../components/modal'
import HTTP from '../../../config/http'
import history from '../../../config/history'

export default function ({user}) {
    const [modal, isOpen] = useState(false)
    const toggle = () => isOpen(!modal)
    const signOut = () => {
      localStorage.clear()

      history.push({
        pathname:'/login'
      }) 
    }
    const actionModal = async ()=> {
      await HTTP.delete(`/users/${user._id}`)
      await signOut()
    }
    
    return <>
        
         <ListGroup flush className="d-flex flex-column justify-content-center">
            <ListGroupItem tag="p" disabled ><span> Nome Completo: </span>{`${user.name} ${user.lastname}`}</ListGroupItem>
            <ListGroupItem tag="p" href="#" disabled><span> Idade: </span>{user.age}</ListGroupItem>
            <ListGroupItem tag="p" href="#" disabled><span> Email: </span>{user.email}</ListGroupItem>
            <ListGroupItem tag="p" href="#" disabled><span> Conteudo Postados: </span>5</ListGroupItem>
            <ListGroupItem tag="p" href="#" disabled><span> Comentarios enviados : </span> 10</ListGroupItem>
            <ListGroupItem tag="p" href="#" disabled><span> Total de comentarios em suas postagens : </span> 12</ListGroupItem>

            <div className="d-sm-flex flex-lg-column flex-sm-row bd-highlight ">
                <Button outline color="danger" className="col-lg-5 mt-2 mb-2 mr-sm-2 mr-lg-0  align-self-center flex-fill bd-highlight" onClick={signOut}>Sair</Button>
                <Button outline color="danger" className=" col-lg-5  align-self-center flex-fill bd-highlight" onClick={toggle}>Excluir Conta</Button>
            </div>
      </ListGroup>
      <Modal 
        isOpen={modal}
        toggle={toggle}
        buttonNameAction="Confirmar"
        buttonNameCancel="Cancelar"
        colorButtonAction="danger"
        colorButtonCancel="secondary"
        textModal="Tem certeza que deseja excluir sua conta?"
        headerModal="Apagar conta"
        actionModal={actionModal}
      />
    </>
}