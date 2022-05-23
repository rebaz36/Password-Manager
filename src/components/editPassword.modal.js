
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import CryptoJS from "crypto-js";
import dotenv from 'dotenv'

dotenv.config()

const EditPasswordModal = props  => {
  const [accountName, setAccountName] = useState(props.accountName)
  const [accountUrl, setAccountUrl] = useState(props.accountUrl) 
  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState(props.password) 
  const [passwordType, setPasswordType] = useState('password')
  

  const onEdit = () => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY).toString()
    const payload = {
      accountName,
      accountUrl,
      email,
      encryptedPassword,
      id: props.id
    }
    props.editPassword(payload)
    props.closePreview()
  }

  return (
    <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{backgroundColor : "#d1e1f0"}} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
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
                <Form.Control placeholder="Account URL" value={accountUrl} onChange={(e) => setAccountUrl(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Row>

            <Row className="my-1">
                <Col>
                  <Form.Control type={passwordType} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Col>
                <Col xs={2} className="text-center">
                  <span 
                    style={{cursor : 'pointer'}} 
                    onClick={() => {setPasswordType(passwordType === "password"? "text" : "password")}}>
                    {passwordType === "password"? 
                      <FontAwesomeIcon icon={faEye} size="1x" className="align-bottom" /> 
                    : 
                      <FontAwesomeIcon icon={faEyeSlash} size="1x" className="align-bottom" /> }
                  </span>
                </Col>
              </Row>
          </Form>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button variant="success" onClick={onEdit} disabled={(!accountUrl || !accountName || !email) ? true : false}>          
          <FontAwesomeIcon icon={faEdit} size="1x" className="" /> Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default EditPasswordModal