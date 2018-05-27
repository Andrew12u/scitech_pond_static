import React, { Component } from 'react';
import EmptyObject from './EmptyObject';
//Projects
import Minesweeper from './projects/minesweeper/Minesweeper';
import RadarChartDemo from './projects/radarchartdemo/RadarChartDemo';

const PROJECTS = {
  Minesweeper: Minesweeper,
  RadarChartDemo: RadarChartDemo
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
      <this.state.component urlParams={this.props.match.params} urlQueryString={this.props.location.search}/>
    );
  }
}
export default Project;
