//react core
import React, { Component } from 'react';
//self styling
import '../css/Projects.css';
//bootstrap stuff
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
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

var projects = require('../config/projects.json');

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_list: projects["projects"],
      project_data: projects["meta"]
    };
  }

  postFormatter = (cell, row) => {
    let tooltip = (<Tooltip id={`tooltip-${row.name}`}><strong>{`${row.name}`}</strong></Tooltip>);
    return (
      <div>
        <LinkContainer to={`/project/${row.name}`} >
          <OverlayTrigger placement="top" overlay={tooltip}>
            <a className="project_link"> {cell} </a>
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
    let projectData = [];

    for(let i=0; i<this.state.project_data.length; i++){
      projectData.push(<div key={i}><span style={{color: this.state.project_data[i]["color"]}}>{this.state.project_data[i]["label"]}</span> : {this.state.project_data[i]["value"]}</div>);
    }
    return projectData;
  }

  render() {
    return (
      <Grid>
        <div>
          <Row>
            <Col xs={12}>
              <div className="Project-pie-chart-title">
                <h2>Breakdown</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="Project-pie-chart">
                <PieChart data={this.state.project_data} options={pieOptions}/>
              </div>
            </Col>
            <Col md={6} smHidden xsHidden>
              <div className="Project-pie-chart-data">
                {this.generateDataLegend()}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="Project-post-title-header">
                <h2>Project Entries</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div>
                <BootstrapTable data={this.state.project_list}
                                striped={false}
                                hover={false}
                                tableStyle={{
                                  background: 'rgb(60,60,60)',
                                  color: 'rgb(230,230,226)'
                                }}>
                  <TableHeaderColumn dataField="name" dataSort={true} isKey={true} dataFormat={this.postFormatter}> Project </TableHeaderColumn>
                  <TableHeaderColumn dataField="type" dataSort={true} dataFormat={this.typeFormatter}>Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="description" dataSort={true} dataFormat={this.descriptionFormatter} columnClassName="hidden-xs" className="hidden-xs">Description</TableHeaderColumn>
                  <TableHeaderColumn dataField="date" dataSort={true} dataFormat={this.dateFormatter} columnClassName="hidden-xs" className="hidden-xs">Date</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

export default Projects;
