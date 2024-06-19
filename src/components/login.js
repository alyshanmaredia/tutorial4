import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "./login.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate()
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState("true");
    const [pwValid, setPwValid] = useState("true");

    const submitHandler = async (e) => {
        e.preventDefault();

        if (pwValid && emailValid) {

            setEmailAddress("");
            setPassword("");


            try {
                const response = await axios.post('https://express-t4.onrender.com/api/login', {
                    username: emailAddress,
                    password: password,
                });

                if (response.status === 200) {
                    toast.success("You have Successfully logged in!", {
                        position: "bottom-right"
                    });
                    
                    navigate("/profile");
                }
            } catch (error) {
                toast.error("Invalid email or password!", {
                    position: "bottom-right"
                });
                console.error("Login failed:", error);
            }
        }
    };

    const handleEmailAddressInput = (e) => {
        if (e.target.value === "") {
            setEmailAddress("");
            setEmailValid(false);
        } else {
            const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

            const isEmailValid = emailRegex.test(e.target.value);
            setEmailValid(isEmailValid);
            setEmailAddress(e.target.value);
        }
    };

    const handlePasswordInput = (e) => {
        if (e.target.value === "") {
            setPassword("");
            setPwValid(false);
        } else {
            const passwordRegex =
                /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

            const isPasswordValid = passwordRegex.test(e.target.value);
            setPwValid(isPasswordValid);
            setPassword(e.target.value);
        }
        console.log(e.target.value);
    };
    return (
        <Container className='d-flex align-items-center justify-content-center min-vh-100'>
            <Row className='row-border rounded-5  box-area shadow p-4 bg-white'>
                <Col md={12}>
                    <Form className='w-100' onSubmit={submitHandler}>
                        <h1 className='text-center mb-5'>Login</h1>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                className='form-control form-control-lg fs-6 bg-light'
                                required
                                placeholder='Email Address'
                                isInvalid={!emailValid}
                                value={emailAddress}
                                onChange={handleEmailAddressInput}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a valid email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                className='form-control form-control-lg fs-6 bg-light'
                                type='password'
                                required
                                placeholder='Password'
                                isInvalid={!pwValid}
                                value={password}
                                onChange={handlePasswordInput}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Password should have minimum 8 characters length and must be alphanumeric.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='d-flex justify-content-between mb-3'>
                            <Form.Check
                                label={<small>Remember Me</small>}
                                type='checkbox'
                                className='text-secondary'
                            />
                            <div>
                                <small>
                                    <a href='/'>Forgot Password?</a>
                                </small>
                            </div>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Button className='btn btn-lg fs-6 w-100' type='submit'>
                                Submit
                            </Button>
                            <ToastContainer />
                        </Form.Group>
                        <div className='text-center'>
                            <small>
                                Don't have an account? <a href='/'>Register</a>
                            </small>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
