import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Facebook, Twitter, Google } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { localRequest } from '../axiosRequestFunc';

const Signup = () => {
    const loginNavigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signupData  = async (e) => {
        e.preventDefault();
        try{
            await  localRequest.post('auth/signup' , {username, email, password});
            loginNavigate('/login');
        }catch(err){
                console.log(err);
        }
    }

    return (
        <>
            <Container>
                <div className="omb_login my-5">
                    <h3 className="omb_authTitle"><Link to="/login">Login</Link> or Sign up</h3>
                    <Row className='omb_socialButtons text-center mt-5'>
                        <Col lg={3} md={3}></Col>
                        <Col md={2} lg={2} sm={4} xs={4}>
                            <Link className='btn btn-lg btn-block omb_btn-facebook width-100' to=''>
                                <Facebook className='d-lg-none d-md-none' />
                                <span className="d-lg-block d-md-block d-none">Facebook</span>
                            </Link>
                        </Col>
                        <Col md={2} lg={2} sm={4} xs={4}>
                            <Link className="btn btn-lg btn-block omb_btn-twitter width-100" to=''>
                                <Twitter className='d-lg-none d-md-none' />
                                <span className="d-lg-block d-md-block d-none">Twitter</span>
                            </Link>
                        </Col>
                        <Col md={2} lg={2} sm={4} xs={4}>
                            <Link className="btn btn-lg btn-block omb_btn-google width-100" to=''>
                                <Google className='d-lg-none d-md-none' />
                                <span className="d-lg-block d-md-block d-none">Google+</span>
                            </Link>
                        </Col>
                        <Col lg={3} md={3}></Col>
                    </Row>
                    <Row className='omb_loginOr mx-4'>
                        <Col xs={12}>
                            <hr className="omb_hrOr mx-5" />
                            <span className="omb_spanOr">or</span>
                        </Col>
                    </Row>
                    <Row className='mt-5 mb-4 mx-lg-5 mx-md-5'>
                        <Col lg={4} md={3}></Col>
                        <Col xs={12} lg={4} md={6} className="text-center">
                            <Form className='omb_loginForm' autoComplete='off'>
                                <div className='input-group-md mb-3'>
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <Form.Control type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" required>
                                    </Form.Control>
                                </div>
                                <div className='input-group-md mb-3'>
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required>
                                    </Form.Control>
                                </div>
                                <span className="help-block"></span>
                                <div className='input-group-md mb-3'>
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="password"required>
                                    </Form.Control>
                                </div>
                                <Button className='btn btn-md btn-primary' onClick={signupData} style={{ width: "100%" }}>
                                    Signup
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={4} md={3}></Col>
                    </Row>
                    <Row className='text-center'>
                        <Col lg={4} md={4}></Col>
                        <Col xs={12} lg={2} sm={3}>

                        </Col>
                        <Col xs={12} lg={2} sm={3}>
                            <p className="omb_forgotPwd text-center">
                                <Link to="login">Already Have an Account ?</Link>
                            </p>
                        </Col>
                        <Col lg={4} md={3}></Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default Signup