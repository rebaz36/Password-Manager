import {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import CreatePasswordModal from '../components/createPassword.modal'
import favicon from '../assets/favicon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = (props) => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const handleHide = (url, password, email, name) => {
    let n = true
    if (url || password || email || name) {n = window.confirm("Your changes won't be saved...")}
    if (n) setCreateModalShow(false)
  }
  const handleCreate = payload => {
    props.handleCreate(payload)
    setCreateModalShow(false)
  }

  return (
    <Navbar 
      expand="lg" 
      className="navbar-fixed-top" 
      style={{position : "sticky", top : "0", zIndex: "10000", backgroundColor : "#d1e1f0e7"}}
    >
      <Navbar.Brand 
        as={Link} to="/" 
        style={{cursor : 'pointer'}}>
          <img src={favicon} alt="" style={{width : '40px', height :  '40px'}} className="mr-2" /> 
          Password Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="mt-2" style={{textDecoration : "none"}}>Home</Link>
          
          {!localStorage.getItem('userId')  ? 
          <>
          <NavDropdown 
            title={<FontAwesomeIcon 
            icon={faUserCircle} 
            size="2x" 
            className="text-primary" />} alignRight id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/login" className="text-primary">Sign in</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/register" className="text-primary">Register</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/recover" className="text-primary">Forgot password</NavDropdown.Item>
          </NavDropdown>
          </>: 
          <>
          <NavDropdown title={<FontAwesomeIcon icon={faCog} size="2x" className="text-primary" />} alignRight id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/dashboard" className="text-primary" >Dashboard</NavDropdown.Item>
            <CreatePasswordModal show={createModalShow} onHide={handleHide} handleCreate={ handleCreate } />
            <NavDropdown.Item to="#" onClick={() => setCreateModalShow(true)} className="text-primary" >Create New Password</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/logout" className="text-primary" >Logout</NavDropdown.Item>
          </NavDropdown>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent

