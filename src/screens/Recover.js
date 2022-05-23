import { useState } from 'react'
import { createUser } from '../models';
import {useHistory} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    try {
      if (body.firstName && body.lastName && body.password && body.email && body.password === e.target.confirm_password.value) {
        const user = await createUser(body.firstName, body.lastName, body.email, body.password)
        if (!user) {
          window.flash('Email has been chosen', 'error')
        } else {
          localStorage.setItem('userId', user.id)
          localStorage.setItem('email', user.email)
          history.push('/')
          window.flash('Account created sucessfully, signed in', 'success')
        }
      } else if (!body.firstName || !body.email || !body.lastName || !e.target.confirm_password.value) {
        setValidated(true)
      } else {
        setValidated(true)
      }
    } catch (error) {
      console.log(error)
      window.flash('Something went wrong', 'error')
    }
  }
  
  return (
    <>
      <NavbarComponent /> 
      <Flash /> <br/><br/>
      <Container className='d-flex flex-column align-items-center justify-content-center pt-5' style={{height : '80vh'}}>
        <p className="h3 display-4 mt-5"><FontAwesomeIcon icon={faUserCircle} size="1x" /></p>
        <p className="h2 display-5">Recover Password</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{minWidth : '300px' }}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
                name='email'
              />
              <Form.Control.Feedback type="invalid">
                Please Enter your email. 
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Recover Password</Button>
        </Form>
      </Container>
    </>
  )
}
