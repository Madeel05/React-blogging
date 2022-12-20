import React, { useEffect, useState } from 'react';
import NavbarTop from './NavbarTop';
import { Container, Card, Form, Button, Col, Nav, Row, Tab } from 'react-bootstrap';
import { clientRequest, userRequest } from '../axiosRequestFunc';
import { Alert } from './Alert';
import Post from "../components/Post";

const Profile = () => {
    const userId = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)._id : null;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState();
    const [Posts, setPosts] = useState();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const count = await clientRequest.get('posts/user');
                setPosts(count.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, []);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const user = await userRequest.get(`users/${userId}`);
                setUsername(user.data.username);
                setEmail(user.data.email);
                setDescription(user.data.description);
            }
            catch (err) {
                console.log(err);
            }
        }
        getUserById();
    }, [])

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const user = await userRequest.put(`users/${userId}`, { username, email, description });
            Alert('success', 'Profile Updated', 'success');
            console.log(user);
        } catch (error) {
            Alert('ERROR', `${error}`, 'danger');
            console.log(error);
        }
    }

    return (
        <>

            <NavbarTop />
            <Container className='mt-5'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column mt-3">
                                <Nav.Item variant="success">
                                    <Nav.Link eventKey="first">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Posts</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Card className='gedf-card my-3 mr-2 ml-2'>
                                        <Card.Body>
                                            <Row>
                                                <Col sm={12}>
                                                    <h5>Your Profile</h5>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={12}>
                                                    <Form autoComplete='off' onSubmit={updateUser} >
                                                        <Form.Group className='mb-3'>
                                                            <Form.Label>Username:</Form.Label>
                                                            <Form.Control type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your Name" required />
                                                        </Form.Group>
                                                        <Form.Group className='mb-3'>
                                                            <Form.Label>Email:</Form.Label>
                                                            <Form.Control type='eamil' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required />
                                                        </Form.Group>
                                                        <Form.Group className='mb-3'>
                                                            <Form.Label>Description:</Form.Label>
                                                            <Form.Control as='textarea' rows='3' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="About Yourself" required />
                                                        </Form.Group>
                                                        <Button type="submit">Update</Button>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row>
                                        {Posts?.map(item => <Col lg={6} md={6}> <Post data={item} key={item._id} /></Col>)}
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

        </>
    )
}

export default Profile