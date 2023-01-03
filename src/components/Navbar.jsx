import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import About from '../pages/howitworks';
import Home from '../pages/home';
// Github Pages does not support BrowswerRouter, so use HashRouter instead
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './navbar.css'
import logo from '../imageAssets/sim-logo5.png';
import github_logo from '../imageAssets/github_logo.png'



const navbar = () => {
    return (

        <div>
            <Router>
                <div>
                    <Navbar className='navbar' bg="dark" variant={"dark"} fixed='top'>
                            <Navbar.Brand>
                                <img className='logo'
                                    src={logo}
                                />{''}
                                N-Body Particle Simulator
                            </Navbar.Brand>
                            <Nav>
                                <Nav.Link as={Link} to="">Simulation</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                            </Nav>    
                            <Container></Container>  
                            <Navbar.Brand>
                                    <div className='gitlogo'>
                                    <a href='https://github.com/Ramjet-7'>
                                    <img 
                                        src={github_logo}
                                        width='30px'
                                        height='auto'
                                    />{''}
                                    </a>
                                    
                                    </div>
                                    
                            </Navbar.Brand>                      
                            
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default navbar;

