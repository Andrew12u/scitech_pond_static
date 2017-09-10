import React, { Component } from 'react';
import EmptyObject from './EmptyObject';
import a_killer_insertion_sort from './blogs/a_killer_insertion_sort';

const BLOGS = {
   a_killer_insertion_sort: a_killer_insertion_sort
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
