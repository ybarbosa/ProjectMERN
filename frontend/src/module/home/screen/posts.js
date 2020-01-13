import React, { useState, useEffect } from 'react'
import { Toast, ToastBody, ToastHeader, Row, Input, Button,Card, Alert ,Badge, CardText, InputGroupAddon, InputGroup} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons'
import "../styles/posts.scss"
import HTTP from '../../../config/http'


export default function ({userID}){
    const iconHeader = <FontAwesomeIcon icon={faEdit} /> 
    const [visableCommet, setComment ] = useState(false)
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState('')
    const [newComment, setNewComment] = useState('')
    const fetchNewPost = (event)=> setNewPost(event.target.value)
    const getPost = async () => {  
        try {
            const { data } = await HTTP.get("posts")
            await setPosts(data)
          
        }
        catch(e){
            return e.response
        }
    }
    const like = async (postID, userID)=> {
        await HTTP.patch("/posts/likes",{postID, userID})
        await getPost()
    }
    const pushComment = async (postID, userID) => {
        if(!newComment) return 
        await HTTP.patch(`posts/comment/${postID}`,{comment: newComment, userID} )
        setNewComment('')
        getPost()
    }
    const submitNewPost = async ()=> {
        const body =  { post: newPost, userID}
        setNewPost('')
        setComment(false)
        await HTTP.post('posts',body) 
        await getPost() 
    }
    useEffect(()=>{
        getPost()
    }, [])

        
    return (
        <> 
        <Row className="mb-5">
            <Toast className="mt-3 col-12"> 
            <ToastHeader icon={ iconHeader }>
                Nova postagem
            </ToastHeader>
            <ToastBody>
                <Input placeholder="Digite sua postagem" bsSize="lg" value={newPost} onChange={fetchNewPost} />
                <div className="d-flex flex-row-reverse ">
                <Button outline color="success" className="mt-2" onClick={submitNewPost} disabled={newPost === '' ? true : false}> Enviar</Button>
                </div>

            </ToastBody>
            </Toast>
        </Row>

                {
                posts.length === 0
                ? 
                <Alert color="light"> 
                    Nenhum postagem foi feita
                </Alert>
                : 
                posts.map(value => 
                
                <Row key={value._id} className="mb-2">
                    <Card body> 
                        <CardText>{value.post}</CardText>
                        <div>
                            <Button  size="sm" outline className="buttonActive mr-2" onClick={() => like(value._id, userID)} >Curtidas <Badge color="indigo">{value.likes.length}</Badge></Button>
                            <Button  size="sm" outline  color="success"  onClick={() => visableCommet !== value._id ? setComment(value._id) : setComment(null) } >Comentar <Badge color="indigo">{value.comments.length}</Badge></Button>
                        </div>
                        <div >
                            <Toast className="mt-4 comments" isOpen={visableCommet === value._id ? true : false}> 
                                <ToastHeader >
                                    Comentarios
                                    
                                </ToastHeader>
                                <ToastBody>
                                    {value.comments.length > 0 
                                    ? 
                                    value.comments.map((valueComment, idx)=> 
                                    
                                        <div className="d-flex " key={ idx}>
                                            <span ><FontAwesomeIcon  className="mr-1"icon={faUser} />{valueComment.name }</span> : 
                                            <span className="text-muted ml-2">{valueComment.comment}</span>
                                        </div>
                                    )
                                    :
                                    <Alert color="light"> 
                                        Nenhum comentario nessa postagem
                                    </Alert>
                                    }
                                    <InputGroup className="mt-4 mb-2" onClick={() => pushComment(value._id, userID) } >
                                        <Input placeholder="digite seu comentario"  value={newComment} onChange={(e)=>(setNewComment(e.target.value) )}/>
                                        <InputGroupAddon addonType="append">
                                        <Button disabled={!newComment ? true : false} color="primary">Comentar</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </ToastBody>
                            </Toast>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <span className="text-muted mt-1"> Postado Por: {value.createdBy} </span> 
                        </div>  
                    </Card>
                </Row>
                )}
        </>
    )
}