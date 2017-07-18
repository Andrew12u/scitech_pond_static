//react core
import React, { Component } from 'react';
//self styling
import '../css/Blogs.css';
//bootstrap stuff
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { LinkContainer } from 'react-router-bootstrap';



var blogs = require('../config/blogs.json');

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_list: blogs["blogs"]
    };
  }

  postFormatter = (cell, row) => {
    let tooltip = (<Tooltip id={`tooltip-${row.name}`}><strong>{`${row.name}`}</strong></Tooltip>);
    return (
      <div>
        <LinkContainer to={`/blog/${row.name}`} >
          <OverlayTrigger placement="top" overlay={tooltip}>
            <a className="blog_link"> {cell} </a>
          </OverlayTrigger>
        </LinkContainer>
      </div>
    );
  }

  typeFormatter = (cell, row) => {
    let tooltip = (<Tooltip id={`tooltip-${row.type}`}><strong>{`${row.type}`}</strong></Tooltip>);
    return (
      <div>
        <OverlayTrigger placement="top" overlay={tooltip}>
           <p>{cell}</p>
        </OverlayTrigger>
      </div>
    );
  }

  descriptionFormatter = (cell, row) => {
    let tooltip = (<Tooltip id={`tooltip-${row.description}`}><strong>{`${row.description}`}</strong></Tooltip>);
    return (
      <div>
          <OverlayTrigger placement="top" overlay={tooltip}>
             <p>{cell}</p>
          </OverlayTrigger>
      </div>
    );
  }

  dateFormatter = (cell, row) => {
    let tooltip = (<Tooltip id={`tooltip-${row.date}`}><strong>{`${row.date}`}</strong></Tooltip>);
    return (
      <div>
        <OverlayTrigger placement="top" overlay={tooltip}>
           <p>{cell}</p>
        </OverlayTrigger>
      </div>
    );
  }

  render() {
    return (
      <div className="blog_list_background">
        <div className="Blog-post-title-header">
          <h2>Blog Entries</h2>
        </div>
        <div>
          <BootstrapTable data={this.state.blog_list}
                          striped={false}
                          hover={false}
                          tableStyle={{
                            background: 'rgb(60,60,60)',
                            color: 'rgb(230,230,226)'
                          }}>
            <TableHeaderColumn dataField="name" dataSort={true} isKey={true} dataFormat={this.postFormatter}> Blog Post</TableHeaderColumn>
            <TableHeaderColumn dataField="type" dataSort={true} dataFormat={this.typeFormatter}>Type</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataSort={true} dataFormat={this.descriptionFormatter}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="date" dataSort={true} dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default Blogs;
