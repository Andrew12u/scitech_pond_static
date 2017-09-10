import React, { Component } from 'react';
import EmptyObject from './EmptyObject';

const PROJECTS = {
}


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: EmptyObject
    };
  }
  componentDidMount() {
    if(this.props.match.params) {
      let thisComponent = PROJECTS[this.props.match.params.projectId];
      this.setState({component : thisComponent});
    }
  }
  render() {
    return (
      <this.state.component />
    );
  }
}
export default Project;
