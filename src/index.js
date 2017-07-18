//core react stuff
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

//main site components
import About from './main/About';
import Blogs from './main/Blogs';
import Blog from './Blog';
import Projects from './main/Projects';
import Project from './Project';
import Contact from './main/Contact';
import Home from './main/Home';
import EmptyObject from './EmptyObject';

//react nav stuff
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';

//react bootstrap stuff
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import './css/index.css';

//var blog_loader = require('./loaders/blog_loader.js');

//var test_name_1 = require('./blogs/test_name_1');
//var test_name_1 = require('./blogs/test_name_1');
/*
import test_name_1 from './blogs/test_name_1';
import test_name_2 from './blogs/test_name_2';

const BLOGS = {
   test_name_1: test_name_1,
   test_name_2: test_name_2
}


class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: EmptyObject
    };
  }
  componentDidMount() {
    if(this.props.match.params) {
      let thisComponent = BLOGS[this.props.match.params.blogId];
      this.setState({component : thisComponent});
    }
  }
  render() {
    return (
      <this.state.component />
    );
  }
}
export default Blog;
*/

function NavBarMenu(){
  return (
  <BrowserRouter history = {createBrowserHistory()}>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path = "/" component = {Home} />
      <Route exact path = "/about" component = {About} />
      <Route exact path = "/blogs" component = {Blogs} />
      <Route exact path = "/projects" component = {Projects} />
      <Route exact path = "/contact" component = {Contact} />
      <Route exact path = "/blog/:blogId" component = {Blog} />
      <Route exact path = "/project/:projectId" component = {Project} />
    </div>
  </BrowserRouter>
  );
}

function NavMenu(){
  return(
      <BrowserRouter history = {createBrowserHistory()}>
        <div>
          <div>
            <Nav bsStyle="pills" activeKey={1} pullRight>
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
            </Nav>
          </div>

          <Route exact path = "/" component = {Home} />
          <Route exact path = "/about" component = {About} />
          <Route exact path = "/blogs" component = {Blogs} />
          <Route exact path = "/projects" component = {Projects} />
          <Route exact path = "/contact" component = {Contact} />
          <Route exact path = "/blog/:blogId" component = {Blog} />
          <Route exact path = "/project/:projectId" component = {Project} />
       </div>
      </BrowserRouter>
  );
}
/*


*/

ReactDOM.render((
  <NavBarMenu />
), document.getElementById('app'));
registerServiceWorker();
