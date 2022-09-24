import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch } from 'react-redux';
import AccountDetails from './AccountDetails';
import DeletAccount from './DeletAccount';
import UserQuestion from './UserQuestion';


function Account() {
    const dispatch = useDispatch();
    const [logStatus, setLogStatus] = useState('Logout');
    const handleLogout = () => {
        setLogStatus('Logging out...');
        let action = {
            type: 'Logout',
        };
        dispatch(action);
    }
    
    return (
        <div className='container w-100 py-2 py-md-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className='justify-content-around'>
                    <Col sm={4}>
                        <Nav variant="pills" className="flex-column bg-primary bg-opacity-10 shadow shadow-5 rounded-1">
                            <Nav.Item>
                                <Nav.Link className='py-3' eventKey="first">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='py-3' eventKey="second">My Questions</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={handleLogout}>
                                <Nav.Link className='py-3'>{logStatus}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='py-3' eventKey="fourth">Delete Account</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={7}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AccountDetails />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <UserQuestion />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <DeletAccount />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default Account;