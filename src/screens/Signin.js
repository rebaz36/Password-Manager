import { useState} from 'react'
import { useHistory } from 'react-router-dom';
import {loginUser} from '../models'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import NavbarComponent from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Flash } from '../components/Flash/flash';

export default function SignIn() {
  const history = useHistory()
  if (localStorage.getItem('userId')) {
    setTimeout(() => {
      window.flash('You are logged in', 'warning')
    }, 100)
    history.push('/') 
  }
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    // Handle login logic
    if (!body.email || !body.password) {
      setValidated(true)
    } else {
      const user = await loginUser(body.email, body.password)
      if (user) {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('email', user.email)
        history.push('/')
        window.flash('Logged in successfully!', 'success')
      } else {
        window.flash('Invalid email or password', 'error')
      }
    }
  }
  return (
    <>
      <NavbarComponent />
      <Flash />
      <Container className='d-flex flex-column align-items-center justify-content-center' style={{height : '80vh'}}>
        <p className="h3 display-4"><FontAwesomeIcon icon={faUserCircle} size="1x" /></p>
        <p className="h2 display-5">Sign in</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{minWidth : '300px' }}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control required name='email' type="email" placeholder="Email" />
              <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control required name='password' type="password" placeholder="Password" />
              <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Sign in</Button>
          <p className="text-center"><Link to="/register">Register</Link> to create account!</p>
        </Form>
      </Container>
    </>
  )
}