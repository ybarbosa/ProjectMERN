import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import HTTP from '../../config/http'
import GateWay from './views/gateway'
import Profile from './views/profile'

export default function (props) {
    const styleContainer = {
        backgroundColor: '#916dd5',
        color: 'white'
    }
    const { history: { location } } = props
    const [ user, setUser ] = useState('')
    const [activeTabs, setActiveTabs] = useState('1')
    const getUser =  async () => {
        const { data } = await HTTP.get(`/users/${location.state.id} `)
         setUser(data.find(u => u))
        
    }
    useEffect(()=>{ 
      getUser()
    }, [])
    return <> 

    <Container style={styleContainer} fluid={true} className="mb-1">
        <Row xs="2">
        <Col className="d-flex justify-content-end p-2">
            {user.name}
        </Col>
          
        </Row>
     
    </Container>

    <Container>
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={activeTabs==='1' ? 'active': ''}
                    onClick={()=> setActiveTabs('1')}
                >
                    Postagens
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={activeTabs==='2' ? 'active': ''}
                    onClick={()=> setActiveTabs('2')}
                >
                    Configuração
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTabs}>
            <TabPane tabId="1">
                <GateWay userID = {location.state.id} />
            </TabPane>
            <TabPane tabId="2">
                <Profile user = {user} />
            </TabPane>
        </TabContent>
    </Container>
    </>
}