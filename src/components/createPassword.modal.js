
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import dotenv from 'dotenv'

dotenv.config()

const CreatePasswordModal = props  => {
  const [accountName, setAccountName] = useState('')
  const [accountUrl, setAccountUrl] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

  const handleCreate = async () => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY).toString()
    const payload = {
      accountName, 
      accountUrl,
      email,
      encryptedPassword
    }
    props.handleCreate(payload)
    setAccountName('')
    setAccountUrl('')
    setEmail('')
    setPassword('')
    window.flash('Password created successfully', 'success')
  }

  const onHide = () => {
    props.onHide(accountUrl, password, email, accountName)
  }

  return (
    <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header style={{backgroundColor : "#d1e1f0"}}  closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
        <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control placeholder="Account URL" defaultValue={`https://${accountUrl}`} onChange={(e) => setAccountUrl(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button variant="success" onClick={handleCreate} disabled={(!accountUrl || !accountName || !email) ? true : false}>
          <FontAwesomeIcon icon={faPlus} size="1x" className="" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default CreatePasswordModal