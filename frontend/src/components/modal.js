import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export default function({isOpen, toggle, buttonNameAction, buttonNameCancel, colorButtonAction, colorButtonCancel,textModal, actionModal, headerModal }){
   return (
        <Modal isOpen={isOpen} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} toggle={toggle}>
            <ModalHeader toggle={toggle}>{headerModal}</ModalHeader>
            <ModalBody>
                {textModal}
            </ModalBody>
            <ModalFooter>
                <Button color={colorButtonAction} onClick={actionModal}>{buttonNameAction}</Button>{' '}
                <Button color={colorButtonCancel} onClick={toggle}>{buttonNameCancel}</Button>
            </ModalFooter>
        </Modal>
    )
}