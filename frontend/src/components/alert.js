import React from 'react'
import { Alert } from 'reactstrap'


const alert = (props) => {
    return <Alert className="col-lg-12 mt-2" color={props.colorAlert} isOpen={props.isOpen} toggle={props.toggle}>
            {props.titleAlert}
          </Alert>
}

export default alert