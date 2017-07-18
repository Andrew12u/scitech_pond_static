import React, { Component } from 'react';
import EmptyObject from './EmptyObject';
import test_name_1 from './projects/test_name_1';
import test_name_2 from './projects/test_name_2';

const PROJECTS = {
   test_name_1: test_name_1,
   test_name_2: test_name_2
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
