import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Facebook, Twitter, Google } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loginData  = async (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
        window.location.reload(false);
    }    

    return (
        <>
            <Container>
                <div className="omb_login my-5">
                    <h3 className="omb_authTitle">Login or <Link to="/signup">Sign up</Link></h3>
                    <Row className='omb_socialButtons text-center mt-5'>
                        <Col lg={3} md={3}></Col>
                        <Col md={2} lg={2} sm={4} xs={4}>
                            <Link className='btn btn-lg btn-block omb_btn-facebook width-100' to=''>
                                <Facebook className='d-lg-none d-md-none'/>
                                <span className="d-lg-block d-md-block d-none">Facebook</span>
                            </Link>
                        </Col>
                        <Col md={2} lg={2} sm={4} xs={4}>
                            <Link className="btn btn-lg btn-block omb_btn-twitter width-100" to=''>
                            <Twitter className='d-lg-none d-md-none'/>
                                <span className="d-lg-block d-md-block d-none">Twitter</span>
                            </Link>
                        </Col>
                        <Col md={2} lg={2} sm={4} xs={4}>
                            <Link className="btn btn-lg btn-block omb_btn-google width-100" to=''>
                            <Google className='d-lg-none d-md-none'/>
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
                    <Row className='my-5 mx-lg-5 mx-md-5'>
                        <Col lg={4} md={3}></Col>
                        <Col xs={12} lg={4} md={6} className="text-center">
                            <Form className='omb_loginForm' autoComplete='off'>
                                <div className='input-group-md mb-3'>
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required>
                                    </Form.Control>
                                </div>
                                <span className="help-block"></span>
                                <div className='input-group-md mb-3'>
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="password" required >
                                    </Form.Control>
                                </div>
                                <Button className='btn btn-md btn-primary' style={{ width: "100%" }} onClick={loginData}>
                                    Login
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={4} md={3}></Col>
                    </Row>
                    <Row className='text-center'>
                        <Col lg={4} md={4}></Col>
                        <Col xs={12} lg={2} sm={3}>
                            <Form.Label className='checkbox'>
                                <input type="checkbox" value="remember-me"></input>
                                Remember Me
                            </Form.Label>
                        </Col>
                        <Col xs={12} lg={2} sm={3}>
                            <p className="omb_forgotPwd text-center">
                                <Link to="">Forgot password?</Link>
                            </p>
                        </Col>
                        <Col lg={4} md={3}></Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default Login