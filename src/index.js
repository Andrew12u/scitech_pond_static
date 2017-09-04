//core react stuff
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

//main site components
import About from './main/About';
import Blogs from './main/Blogs';
import Projects from './main/Projects';
import Contact from './main/Contact';
import Home from './main/Home';
import Login from './main/Login';
import Register from './main/Register';
import Blog from './Blog';
import Project from './Project';
import Signout from './main/Signout';

//react nav stuff
import { BrowserRouter, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history';

//react bootstrap stuff
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import './css/index.css';

//aws identity stufff
//require('./lib/id_lib');
import * as id_lib from './lib/id_lib';

function DefaultMenu(){
  return(
    <BrowserRouter history = {createBrowserHistory()}>
      <div>
        <div>
          <Navbar inverse collapseOnSelect id="overridden_navbarstyles">
            <Navbar.Header>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse className="bring_to_foreground">
              <Nav pullRight>
                <LinkContainer exact={true} to="/">
                  <NavItem eventKey={1}> Home </NavItem>
                </LinkContainer>
                <LinkContainer to="/blogs">
                  <NavItem eventKey={2}> Blog </NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavItem eventKey={3}> About </NavItem>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <NavItem eventKey={4}> Contact </NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem eventKey={5}> Login </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <Route exact path = "/" component = {Home} />
        <Route exact path = "/about" component = {About} />
        <Route exact path = "/blogs" component = {Blogs} />
        <Route exact path = "/contact" component = {Contact} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/blog/:blogId" component = {Blog} />
     </div>
    </BrowserRouter>
  );
}

function LoggedInMenu(){
  return(
      <BrowserRouter history = {createBrowserHistory()}>
        <div>
          <div>
            <Navbar inverse collapseOnSelect id="overridden_navbarstyles">
              <Navbar.Header>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse className="bring_to_foreground">
                <Nav pullRight>
                  <LinkContainer exact={true} to="/">
                    <NavItem eventKey={1}> Home </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/blogs">
                    <NavItem eventKey={2}> Blog </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/projects">
                    <NavItem eventKey={3}> Projects </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <NavItem eventKey={4}> About </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/contact">
                    <NavItem eventKey={5}> Contact </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signout">
                    <NavItem eventKey={6}> Signout </NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <Route exact path = "/" component = {Home} />
          <Route exact path = "/about" component = {About} />
          <Route exact path = "/blogs" component = {Blogs} />
          <Route exact path = "/projects" component = {Projects} />
          <Route exact path = "/contact" component = {Contact} />
          <Route exact path = "/blog/:blogId" component = {Blog} />
          <Route exact path = "/project/:projectId" component = {Project} />
          <Route exact path = "/signout" component = {Signout} />
       </div>
      </BrowserRouter>
  );
}

function NavMenu(){
  if(id_lib.isUserLoggedIn()) { return <LoggedInMenu/>}
  else { return <DefaultMenu/> }
}

ReactDOM.render((
  <NavMenu />
), document.getElementById('app'));
registerServiceWorker();
