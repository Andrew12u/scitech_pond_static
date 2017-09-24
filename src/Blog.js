import React, { Component } from 'react';
import EmptyObject from './EmptyObject';
import a_killer_insertion_sort from './blogs/a_killer_insertion_sort';
import Enabling_SSL_for_a_Static_S3_Website from './blogs/Enabling_SSL_for_a_Static_S3_Website';
import D3_Part_1_The_Basics from './blogs/D3_Part_1_The_Basics';
import D3_Part_2_Understanding_Transforms from './blogs/D3_Part_2_Understanding_Transforms';
import A_Blog_Legacy from './blogs/A_Blog_Legacy';

const BLOGS = {
   a_killer_insertion_sort: a_killer_insertion_sort,
   Enabling_SSL_for_a_Static_S3_Website: Enabling_SSL_for_a_Static_S3_Website,
   D3_Part_1_The_Basics: D3_Part_1_The_Basics,
   D3_Part_2_Understanding_Transforms: D3_Part_2_Understanding_Transforms,
   A_Blog_Legacy: A_Blog_Legacy
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
