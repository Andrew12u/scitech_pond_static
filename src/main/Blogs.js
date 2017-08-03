//react core
import React, { Component } from 'react';
//self styling
import '../css/Blogs.css';
//bootstrap stuff
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import { LinkContainer } from 'react-router-bootstrap';
//chart.js
import Chart from 'chart.js'
Chart.defaults.global.responsive = true;
//react-chartjs
var PieChart = require("react-chartjs").Pie;
var pieOptions = {
    animatable: true,
    segmentShowStroke : true,
    segmentStrokeColor : "#fff",
    segmentStrokeWidth : 2,
    percentageInnerCutout : 0,
    animationSteps : 100,
    animationEasing : "easeOutBounce",
    animateRotate : true
};




var blogs = require('../config/blogs.json');

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_list: blogs["blogs"],
      blog_data: blogs["meta"]
    };
    this.generateDataLegend = this.generateDataLegend.bind(this);
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
  generateDataLegend(){
    let blogData = [];

    for(let i=0; i<this.state.blog_data.length; i++){
      blogData.push(<div key={i}><span style={{color: this.state.blog_data[i]["color"]}}>{this.state.blog_data[i]["label"]}</span> : {this.state.blog_data[i]["value"]}</div>);
    }



    return blogData;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className="Blog-pie-chart-title">
              <h2>Breakdown</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <div className="Blog-pie-chart">
              <PieChart data={this.state.blog_data} options={pieOptions}/>
            </div>
          </Col>
          <Col xs={3}>
            <div className="Blog-pie-chart-data">
              {this.generateDataLegend()}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="Blog-post-title-header">
              <h2>Blog Entries</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="blog_list_background">
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
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Blogs;
