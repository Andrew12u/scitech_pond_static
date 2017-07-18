import React, { Component } from 'react';
import EmptyObject from './EmptyObject';
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
