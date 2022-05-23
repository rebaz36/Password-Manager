import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditPasswordModal from "./editPassword.modal";
import web from '../assets/web.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEye, faEyeSlash, faCopy, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const PreviewPasswordModal = props  => {
    const [passwordType, setPasswordType] = useState('password')
    return <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{backgroundColor : "#d1e1f0"}} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={web} alt=""/> {props.accountName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <p><FontAwesomeIcon icon={faLink} size="sm" /> <a href={props.accountUrl} rel="noreferrer" target="_blank"><small>{props.accountName}</small></a></p>
              <div><FormControl type="text" value={props.email} className="my-1" readOnly/></div>
              <Row className="my-1">
                <Col  xs={8} md={9}>
                  <FormControl type={passwordType} value={props.password} readOnly/>
                </Col>
                <Col xs={2} md={1} className="text-left">
                  <span 
                    style={{cursor : 'pointer'}} 
                    onClick={() => {setPasswordType(passwordType === "password"? "text" : "password")}}>
                    {passwordType === "password"? 
                      <FontAwesomeIcon icon={faEye} size="1x" className="align-bottom" /> 
                    : 
                      <FontAwesomeIcon icon={faEyeSlash} size="1x" className="align-bottom" /> }
                  </span>
                </Col>
                <Col xs={2} md={1} className="text-right">
                  <span 
                  style={{cursor : 'pointer'}}
                  onClick={() => {
                    var passwordText = document.createElement('textarea')
                    passwordText.innerText = props.password
                    document.body.appendChild(passwordText)
                    passwordText.select()
                    document.execCommand('copy')
                    passwordText.remove()
                  }}>
                    <FontAwesomeIcon icon={faCopy} size="1x" className="align-bottom" />
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button onClick={props.onEdit}>
          <FontAwesomeIcon icon={faEdit} size="md" className="" /> 
        </Button>
        <Button variant="danger" onClick={props.onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} size="1x" className="" /> 
        </Button>
      </Modal.Footer>
      <EditPasswordModal
          closePreview={() => {props.onHide()}}
          id={props.id}
          show={props.edit}
          editPassword={props.editPassword}
          onEdit={props.onEdit}
          accountName={props.accountName}
          accountUrl={props.accountUrl}
          email={props.email}
          password={props.password}
          title={"Edit Password for "+props.accountName}
          onHide={props.onHideEdit}
        />
    </Modal>
}

export default PreviewPasswordModal