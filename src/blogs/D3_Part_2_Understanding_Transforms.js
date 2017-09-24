import React from 'react';

/*REACT Bootstrap Stuff*/
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from  'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff
import "./css/General_Blog.css"
import "./css/D3_Part_2_Understanding_Transforms.css"

//D3 Stuff
import { select } from 'd3-selection'

//Math stuff
const MathJax = require('react-mathjax')

class SVGPrediction extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       svg_width:400,
       svg_height:400,
     };
     this.createSVGTransformGraph = this.createSVGTransformGraph.bind(this);
     this.showPredictedCalculations = this.showPredictedCalculations.bind(this);
  }
  createPlane(parent){
    let plane = parent.append("g")
        .attr("viewBox", "-100 -100 200 200")
    plane.append("line") //general axis
      .attr("x1",0)
      .attr("y1",-100)
      .attr("x2",0)
      .attr("y2",100);
    plane.append("line") //general axis
      .attr("x1",-100)
      .attr("y1",0)
      .attr("x2",100)
      .attr("y2",0);

    //vertical tick marks
    for(let y=-100; y<=100; y=y+20){
      plane.append("line")
        .attr("x1",-3)
        .attr("x2",3)
        .attr("y1",y)
        .attr("y2",y);
    }

    //horizontal tick marks
    for(let x=-100; x<=100; x=x+20){
      plane.append("line")
        .attr("x1",x)
        .attr("x2",x)
        .attr("y1",-3)
        .attr("y2",3);
    }
    return plane;
  }
  calculateVertices(){
    let x = parseFloat(this.props.data.x);
    let y = parseFloat(this.props.data.y);
    let rect_width = parseFloat(this.props.data.rect_width);
    let rect_height = parseFloat(this.props.data.rect_height);

    let vertices = [];
    //top-left
    vertices.push({"x": x , "y": y});
    //top-right
    vertices.push({"x": x + rect_width , "y": y});
    //bottom-left
    vertices.push({"x": x , "y": y + rect_height});
    //bottom-right
    vertices.push({"x": x + rect_width , "y": y + rect_height});

    return vertices;
  }

  calculatePredictedVertices(){
    let a = parseFloat(this.props.data.t_a);
    let b = parseFloat(this.props.data.t_b);
    let c = parseFloat(this.props.data.t_c);
    let d = parseFloat(this.props.data.t_d);
    let e = parseFloat(this.props.data.t_e);
    let f = parseFloat(this.props.data.t_f);

    let prevCoords = this.calculateVertices();
    let transCoords = [];

    for(let i=0; i<prevCoords.length; i++){
      let x = (a * prevCoords[i]['x']) + (c * prevCoords[i]['y']) + e;
      let y = (b * prevCoords[i]['x']) + (d * prevCoords[i]['y']) + f;
      transCoords.push({'x':x , 'y':y});
    }

    return transCoords;
  }
  createSVGTransformGraph(){

    const node = this.node

    select(node).selectAll("*").remove();

    let vertices = this.calculateVertices();
    let predictedVertices = this.calculatePredictedVertices();

    let planeTransform = this.createPlane(select(node));
    //show prevCoords
    for(let i=0; i<vertices.length;i++){
      planeTransform
        .append('rect')
          .attr('style','fill:red;')
          .attr('width',2)
          .attr('height',2)
          .attr('x',vertices[i]['x'])
          .attr('y',vertices[i]['y']);
    }
    //show predictedVertices

    for(let i=0; i<predictedVertices.length;i++){
      planeTransform
        .append('rect')
          .attr('style','fill:blue;')
          .attr('width',2)
          .attr('height',2)
          .attr('x',predictedVertices[i]['x'])
          .attr('y',predictedVertices[i]['y']);
    }

  }
  /*
   * Old Coordinates
   */
  calculateTopLeftText(){
    return `(${this.props.data.x},${this.props.data.y})`;
  }
  calculateTopRightText(){
    let topRightX = parseInt(this.props.data.x) + parseInt(this.props.data.rect_width);
    return `(${topRightX},${this.props.data.y})`;
  }
  calculateBottomLeftText(){
    let bottomLeftY = parseInt(this.props.data.y) + parseInt(this.props.data.rect_height);
    return `(${this.props.data.x},${bottomLeftY})`;
  }
  calculateBottomRightText(){
    let bottomRightY = parseInt(this.props.data.y) + parseInt(this.props.data.rect_height);
    let bottomRightX = parseInt(this.props.data.x) + parseInt(this.props.data.rect_width);
    return `(${bottomRightX},${bottomRightY})`;
  }
  showPrevCoords(){
    return(
      <div>
        <h4 className="Vertices-Header">X,Y Vertices - Prior to Transform</h4>
        <ul className="Blog-Text">
          <li>Top-Left Coordinate : {this.calculateTopLeftText()}</li>
          <li>Top-Right Coordinate : {this.calculateTopRightText()}</li>
          <li>Bottom-Left Coordinate : {this.calculateBottomLeftText()}</li>
          <li>Bottom-Right Coordinate : {this.calculateBottomRightText()}</li>
        </ul>
      </div>
    )
  }
  /*
   * New Coordinates
   */
  showPredictedCalculations(){
    let a = parseFloat(this.props.data.t_a);
    let b = parseFloat(this.props.data.t_b);
    let c = parseFloat(this.props.data.t_c);
    let d = parseFloat(this.props.data.t_d);
    let e = parseFloat(this.props.data.t_e);
    let f = parseFloat(this.props.data.t_f);

    let prevCoords = this.calculateVertices();
    let newDom = [];


    for(let i=0; i<prevCoords.length; i++){
      newDom.push(
        <li key={i}>Coordinate-{i}: ( {(a*prevCoords[i]['x']) + (c*prevCoords[i]['y']) + e} , {(b*prevCoords[i]['x']) + (d*prevCoords[i]['y']) + f} )
          <ul>
            <li>X : ({a})({prevCoords[i]['x']}) + ({c})({prevCoords[i]['y']}) + {e}</li>
            <li>Y : ({b})({prevCoords[i]['x']}) + ({d})({prevCoords[i]['y']}) + {f}</li>
          </ul>
        </li>);
    }
    return(
      <div>
        <h4 className="Vertices-Predicted-Header">X,Y Vertices - After Transform</h4>
        <ul className="Blog-Text">
          {newDom}
        </ul>
      </div>
    );

  }
  showNewCoords(){
    return(this.showPredictedCalculations());
  }
  componentDidMount(){
    this.createSVGTransformGraph();
  }
  componentDidUpdate(){
    this.createSVGTransformGraph();
  }
  render() {
     return (
        <div>
          <svg ref={node => this.node = node}
               width={this.state.svg_width} height={this.state.svg_height}
               viewBox={`-200 -200 ${this.state.svg_width} ${this.state.svg_height}`}>
          </svg>
          {this.showPrevCoords()}
          {this.showNewCoords()}
        </div>
    );
  }
}

class SVGTransform extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       svg_width:400,
       svg_height:400,
     };
     this.createSVGTransformGraph = this.createSVGTransformGraph.bind(this);
  }

  createPlane(parent){
    let plane = parent.append("g")
        .attr("viewBox", "-100 -100 200 200")
    plane.append("line") //general axis
      .attr("x1",0)
      .attr("y1",-100)
      .attr("x2",0)
      .attr("y2",100);
    plane.append("line") //general axis
      .attr("x1",-100)
      .attr("y1",0)
      .attr("x2",100)
      .attr("y2",0);

    //vertical tick marks
    for(let y=-100; y<=100; y=y+20){
      plane.append("line")
        .attr("x1",-3)
        .attr("x2",3)
        .attr("y1",y)
        .attr("y2",y);
    }

    //horizontal tick marks
    for(let x=-100; x<=100; x=x+20){
      plane.append("line")
        .attr("x1",x)
        .attr("x2",x)
        .attr("y1",-3)
        .attr("y2",3);
    }
    return plane;
  }
  inverseDenomIsZero(){
    let a = parseFloat(this.props.data.t_a);
    let b = parseFloat(this.props.data.t_b);
    let c = parseFloat(this.props.data.t_c);
    let d = parseFloat(this.props.data.t_d);
    let denom =
      (a * d) -
      (c * b);
    if(denom === 0) return true;
    return false;
  }
  calculateVertices(){
    let x = parseFloat(this.props.data.x);
    let y = parseFloat(this.props.data.y);
    let rect_width = parseFloat(this.props.data.rect_width);
    let rect_height = parseFloat(this.props.data.rect_height);

    let vertices = [];
    //top-left
    vertices.push({"x": x , "y": y});
    //top-right
    vertices.push({"x": x + rect_width , "y": y});
    //bottom-left
    vertices.push({"x": x , "y": y + rect_height});
    //bottom-right
    vertices.push({"x": x + rect_width , "y": y + rect_height});

    return vertices;
  }
  calculatePredictedVertices(){
    let a = parseFloat(this.props.data.t_a);
    let b = parseFloat(this.props.data.t_b);
    let c = parseFloat(this.props.data.t_c);
    let d = parseFloat(this.props.data.t_d);
    let e = parseFloat(this.props.data.t_e);
    let f = parseFloat(this.props.data.t_f);

    let prevCoords = this.calculateVertices();
    let transCoords = [];

    for(let i=0; i<prevCoords.length; i++){
      let x = (a * prevCoords[i]['x']) + (c * prevCoords[i]['y']) + e;
      let y = (b * prevCoords[i]['x']) + (d * prevCoords[i]['y']) + f;
      transCoords.push({'x':x , 'y':y});
    }

    return transCoords;
  }

  calculateInversedTransformVertices(){
    let a = parseFloat(this.props.data.t_a);
    let b = parseFloat(this.props.data.t_b);
    let c = parseFloat(this.props.data.t_c);
    let d = parseFloat(this.props.data.t_d);
    let e = parseFloat(this.props.data.t_e);
    let f = parseFloat(this.props.data.t_f);

    let transCoords = this.calculatePredictedVertices();
    let prevCoords = [];
    for(let i=0; i<transCoords.length; i++){
      let denom =
        (a * d) -
        (c * b);

      let x_nom =
        (d * transCoords[i]['x']) -
        (c * transCoords[i]['y']) +
        (c * f) -
        (e * d);

      let x = x_nom / denom;

      let y_nom =
        ((-b) * transCoords[i]['x']) +
        (a * transCoords[i]['y']) -
        (a * f) +
        (e * b);

      let y = y_nom / denom;

      prevCoords.push({'x':x, 'y':y});
    }
    return prevCoords;
  }

  createSVGTransformGraph(){
    const node = this.node

    select(node).selectAll("*").remove();

    let planeTransform = this.createPlane(select(node));
    planeTransform
      .append('g')
        .attr('id',"translation_g")
        .attr('transform',
          'matrix(' + this.props.data.t_a + ','
                       + this.props.data.t_b + ','
                       + this.props.data.t_c + ','
                       + this.props.data.t_d + ','
                       + this.props.data.t_e + ','
                       + this.props.data.t_f +
                    ')')
        .append('rect')
          .attr('style','fill:steelblue;')
          .attr('width',this.props.data.rect_width)
          .attr('height',this.props.data.rect_height)
          .attr('x',this.props.data.x)
          .attr('y',this.props.data.y);
    if(!this.inverseDenomIsZero()){
      let originalCoords = this.calculateInversedTransformVertices();
      for(let i=0; i<originalCoords.length; i++){
        planeTransform
          .append('rect')
            .attr('style','fill:red;')
            .attr('width',2)
            .attr('height',2)
            .attr('x',originalCoords[i]['x'])
            .attr('y',originalCoords[i]['y']);
      }
    }
  }
  showInverseCalculations(){
    let a = parseFloat(this.props.data.t_a);
    let b = parseFloat(this.props.data.t_b);
    let c = parseFloat(this.props.data.t_c);
    let d = parseFloat(this.props.data.t_d);
    let e = parseFloat(this.props.data.t_e);
    let f = parseFloat(this.props.data.t_f);

    let transCoords = this.calculatePredictedVertices();
    let newDom = [];
    let denom = `(${a} * ${d}) - (${c} * ${b})`;
    for(let i=0; i<transCoords.length; i++){
      newDom.push(
        <li key={i}> Coord-{i}
          <ul>
            <li>X:
              <ul>
                <li>Nom:
                  <ul>
                    <li>({d} * {transCoords[i]['x']}) - ({c} * {transCoords[i]['y']}) + ({c} * {f}) - ({e} * {d})</li>
                  </ul>
                </li>
                <li>Denom:
                  <ul>
                    <li>{denom}</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>Y:
              <ul>
                <li>Nom:
                  <ul>
                    <li>(-{b} * {transCoords[i]['x']}) + ({a} * {transCoords[i]['y']}) - ({a} * {f}) + ({e} * {b})</li>
                  </ul>
                </li>
                <li>Denom:
                  <ul>
                    <li>{denom}</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      );
    }
    return(
      <div>
        <h4 className="Vertices-Header">Original Coordinates (calculated from inverse)</h4>
        <ul className="Blog-Text">
          {newDom}
        </ul>
      </div>
    );
  }
  componentDidMount(){
    this.createSVGTransformGraph();
  }
  componentDidUpdate(){
    this.createSVGTransformGraph();
  }
  render() {
     return (
        <div>
          <svg ref={node => this.node = node}
               width={this.state.svg_width} height={this.state.svg_height}
               viewBox={`-200 -200 ${this.state.svg_width} ${this.state.svg_height}`}>
          </svg>
          {this.showInverseCalculations()}
        </div>
    );
  }
}

class TransformExample extends React.Component {
  constructor(props){
     super(props);
     this.state = {
        t_a:0,
        t_b:0,
        t_c:0,
        t_d:0,
        t_e:0,
        t_f:0,
        x:0,
        y:0,
        rect_width:40,
        rect_height:40
     }
     this.handleGeneralValueChange = this.handleGeneralValueChange.bind(this);
  }
  handleGeneralValueChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }
  get_ta_validation(){
    if(!isNaN(this.state.t_a)) return 'success';
    return 'error;'
  }
  get_tb_validation(){
    if(!isNaN(this.state.t_b)) return 'success';
    return 'error;'
  }
  get_tc_validation(){
    if(!isNaN(this.state.t_c)) return 'success';
    return 'error;'
  }
  get_td_validation(){
    if(!isNaN(this.state.t_d)) return 'success';
    return 'error;'
  }
  get_te_validation(){
    if(!isNaN(this.state.t_e)) return 'success';
    return 'error;'
  }
  get_tf_validation(){
    if(!isNaN(this.state.t_f)) return 'success';
    return 'error;'
  }
  get_x_validation(){
    if(!isNaN(this.state.x)) return 'success';
    return 'error;'
  }
  get_y_validation(){
    if(!isNaN(this.state.y)) return 'success';
    return 'error;'
  }
  get_rect_width_validation(){
    if(!isNaN(this.state.rect_width) && (this.state.rect_width>0)) return 'success';
    return 'error;'
  }
  get_rect_height_validation(){
    if(!isNaN(this.state.rect_height) && (this.state.rect_height>0)) return 'success';
    return 'error;'
  }
  normalizeState(stateToCorrect){
    let newState = this.state;
    for (let att in stateToCorrect) {
      if (stateToCorrect.hasOwnProperty(att)) {
        if(!this.state[att]){
          newState[att] = 0;
        }
      }
    }
    return newState;
  }
  render() {
    return(
      <div>
      <Row>
        <Col md={4}>
          <Form>
            <FormGroup
              controlId="t_a_FGId"
              validationState={this.get_ta_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                a:
              </Col>
              <FormControl
                type="text"
                name="t_a"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="t_b_FGId"
              validationState={this.get_tb_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                b:
              </Col>
              <FormControl
                type="text"
                name="t_b"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="t_c_FGId"
              validationState={this.get_tc_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                c:
              </Col>
              <FormControl
                type="text"
                name="t_c"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="t_d_FGId"
              validationState={this.get_td_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                d:
              </Col>
              <FormControl
                type="text"
                name="t_d"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="t_e_FGId"
              validationState={this.get_te_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                e:
              </Col>
              <FormControl
                type="text"
                name="t_e"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="t_f_FGId"
              validationState={this.get_tf_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                f:
              </Col>
              <FormControl
                type="text"
                name="t_f"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="x_FGId"
              validationState={this.get_x_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                [x<sub>start</sub>]
              </Col>
              <FormControl
                type="text"
                name="x"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="y_FGId"
              validationState={this.get_x_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                [y<sub>start</sub>]
              </Col>
              <FormControl
                type="text"
                name="y"
                placeholder="Enter Number (default is 0)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="rect_width_FGId"
              validationState={this.get_rect_width_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                [rect<sub>width</sub>]
              </Col>
              <FormControl
                type="text"
                name="rect_width"
                placeholder="Enter Number (default is 40)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="rect_height_FGId"
              validationState={this.get_rect_height_validation()}>
              <Col componentClass={ControlLabel} className="Labels">
                [rect<sub>height</sub>]
              </Col>
              <FormControl
                type="text"
                name="rect_height"
                placeholder="Enter Number (default is 40)"
                onChange={this.handleGeneralValueChange} />
              <FormControl.Feedback />
            </FormGroup>
          </Form>
        </Col>
        <Col md={4}>
          <h4 className="Blog-Headers">Prediction of Transformation</h4>
          <SVGPrediction data={this.normalizeState(this.state)}/>
        </Col>
        <Col md={4}>
          <h4 className="Blog-Headers">Matrix after Transformation</h4>
          <SVGTransform data={this.normalizeState(this.state)}/>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col md={12}>
          <h3 className="Blog-Headers"> Notes Calculations </h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <br/><br/>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  x_{prevCoordSys}\\\\\\
                  y_{prevCoordSys}\\\\\\
                  1
                \\end{pmatrix}
               =
               \\begin{pmatrix}
                 \\frac{dx_{newCoordSys}-cy_{newCoordSys}+cf-ed}{ad-cb} \\\\\\
                 \\frac{-bx_{newCoordSys}+ay_{newCoordSys}-af+eb}{ad-cb} \\\\\\
                 1
               \\end{pmatrix}
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <ul>
              <li><em><strong>Note: </strong></em> Grid ticks are at 20px</li>
              <li><em><strong>Note: </strong></em> Remember that <a href="https://www.w3schools.com/graphics/canvas_coordinates.asp" target="_blank" rel="noopener noreferrer"> HTML coordinate calculations </a>
                go from top-left to bottom-right
              </li>
              <li><em><strong>Note: </strong></em> For inverse calculations, you will get NaN initially as you cannot divide by 0. This <em>should</em> be accounted for</li>
              <li><em><strong>Note: </strong></em> x<sub>start</sub> and y<sub>start</sub> are not the same as x<sub>prevCoordSys</sub> and y<sub>prevCoordSys</sub>.
                <ul>
                  <li>x<sub>start</sub> and y<sub>start</sub> dictate the initial starting position of the svg shape (and, therefore, when coupled with width and height of that shape, the domain of the transformation)</li>
                  <li>x<sub>prevCoordSys</sub> and y<sub>prevCoordSys</sub> apply to every single point in the shape prior to transformation.</li>
                </ul>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="Blog-Headers"> Explanation </h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <MathJax.Context>
              <div className="Blog-Text">
                  This is the basic formula given by Mozilla which maps from
                  the new coordinate system back to the previous one.
                  (At the moment at least...I am trying to change this as it
                  seems confusing).
                  <MathJax.Node>{`
                                  \\begin{pmatrix}
                                    x_{prevCoordSys}\\\\\\
                                    y_{prevCoordSys}\\\\\\
                                    1
                                  \\end{pmatrix}
                                  =
                                  \\begin{pmatrix}
                                    a & c & e\\\\\\
                                    b & d & f\\\\\\
                                    0 & 0 & 1
                                  \\end{pmatrix}
                                  \\begin{pmatrix}
                                    x_{newCoordSys}\\\\\\
                                    y_{newCoordSys}\\\\\\
                                    1
                                  \\end{pmatrix}
                                `}</MathJax.Node>
                  <MathJax.Node>{`
                    \\begin{pmatrix}
                      x_{prevCoordSys}\\\\\\
                      y_{prevCoordSys}\\\\\\
                      1
                    \\end{pmatrix}
                    =
                    \\begin{pmatrix}
                      ax_{newCoordSys} + cy_{newCoordSys} + e\\\\\\
                      bx_{newCoordSys} + dy_{newCoordSys} + f\\\\\\
                      1
                    \\end{pmatrix}
                  `}</MathJax.Node>
                  <em>Why</em> they decided to show it this way, is unknown.  In reality, the Coordinates
                  of the transformation are dependent upon the domain of the shape you are transforming.
                  So...it should be probably be something like this instead:

                  <MathJax.Node>{`
                                  \\begin{pmatrix}
                                    x_{newCoordSys}\\\\\\
                                    y_{newCoordSys}\\\\\\
                                    1
                                  \\end{pmatrix}
                                  =
                                  \\begin{pmatrix}
                                    a & c & e\\\\\\
                                    b & d & f\\\\\\
                                    0 & 0 & 1
                                  \\end{pmatrix}
                                  \\begin{pmatrix}
                                    x_{prevCoordSys}\\\\\\
                                    y_{prevCoordSys}\\\\\\
                                    1
                                  \\end{pmatrix}
                                `}</MathJax.Node>
                  <MathJax.Node>{`
                    \\begin{pmatrix}
                      x_{newCoordSys}\\\\\\
                      y_{newCoordSys}\\\\\\
                      1
                    \\end{pmatrix}
                    =
                    \\begin{pmatrix}
                      ax_{prevCoordSys} + cy_{prevCoordSys} + e\\\\\\
                      bx_{prevCoordSys} + dy_{prevCoordSys} + f\\\\\\
                      1
                    \\end{pmatrix}
                  `}</MathJax.Node>



                  To calculate the original coordinates responsible for the transformation, you might
                  want to use:

                  <MathJax.Node>{`
                    \\begin{pmatrix}
                      x_{newCoordSys}\\\\\\
                      y_{newCoordSys}\\\\\\
                      1
                    \\end{pmatrix}
                    \\begin{pmatrix}
                      \\frac{d}{ad-cb} & \\frac{-c}{ad-cb} & \\frac{cf-ed}{ad-cb}\\\\\\
                      \\frac{-b}{ad-cb} & \\frac{a}{ad-cb} & \\frac{-af+eb}{ad-cb}\\\\\\
                      0 & 0 & 1\\\\\\
                    \\end{pmatrix}
                    =
                    \\begin{pmatrix}
                      x_{prevCoordSys}\\\\\\
                      y_{prevCoordSys}\\\\\\
                      1
                    \\end{pmatrix}
                  `}</MathJax.Node>

                  <MathJax.Node>{`
                    \\begin{pmatrix}
                      x_{prevCoordSys}\\\\\\
                      y_{prevCoordSys}\\\\\\
                      1
                    \\end{pmatrix}
                   =
                   \\begin{pmatrix}
                     \\frac{dx_{newCoordSys}-cy_{newCoordSys}+cf-ed}{ad-cb} \\\\\\
                     \\frac{-bx_{newCoordSys}+ay_{newCoordSys}-af+eb}{ad-cb} \\\\\\
                     1
                   \\end{pmatrix}
                  `}</MathJax.Node>

                  To get the orginal coordinates after the transformation, you would have to calculate
                  the inverse of the matrix used for the transformation.
              </div>
          </MathJax.Context>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="Blog-Headers"> Inverse Calculations </h3>
          <h4 className="Blog-Headers"> Calculating the Minor Matrices</h4>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  a & . & .\\\\\\
                  . & d & f\\\\\\
                  . & 0 & 1
                \\end{pmatrix}
                = M_{00}
                = (d * 1) - (f * 0) = d
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  . & c & e\\\\\\
                  b & . & .\\\\\\
                  . & 0 & 1
                \\end{pmatrix}
                = M_{10}
                = (c * 1) - (e * 0) = c
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  . & c & .\\\\\\
                  b & . & f\\\\\\
                  0 & . & 1
                \\end{pmatrix}
                = M_{01}
                = (b * 1) - (f * 0) = b
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  a & . & e\\\\\\
                  . & d & .\\\\\\
                  0 & . & 1
                \\end{pmatrix}
                = M_{11}
                = (a * 1) - (e * 0) = a
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  . & . & e\\\\\\
                  b & d & .\\\\\\
                  0 & 0 & .
                \\end{pmatrix}
                = M_{02}
                = (b * 0) - (d * 0) = 0
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  a & c & .\\\\\\
                  . & . & f\\\\\\
                  0 & 0 & .
                \\end{pmatrix}
                = M_{12}
                = (a * 0) - (c * 0) = 0
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  . & c & e\\\\\\
                  . & d & f\\\\\\
                  0 & . & .
                \\end{pmatrix}
                = M_{20}
                = (c * f) - (e * d) = cf - ed
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  a & . & e\\\\\\
                  b & . & f\\\\\\
                  . & 0 & .
                \\end{pmatrix}
                = M_{21}
                = (a * f) - (e * b) = af - eb
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  a & c & .\\\\\\
                  b & d & .\\\\\\
                  . & . & 1
                \\end{pmatrix}
                = M_{22}
                = (a * d) - (c * b) = ad - cb
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <h4 className="Blog-Headers"> Matrice of Minors </h4>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                M =
                \\begin{pmatrix}
                  d & b & 0\\\\\\
                  c & a & 0\\\\\\
                  (cf - ed) & (af - eb) & (ad - cb)
                \\end{pmatrix}
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <h4 className="Blog-Headers"> Calculating the Matrice of Cofactors</h4>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  d & b & 0\\\\\\
                  c & a & 0\\\\\\
                  (cf - ed) & (af - eb) & (ad - cb)
                \\end{pmatrix}
                *
                \\begin{pmatrix}
                  1 & -1 & 1\\\\\\
                  -1 & 1 & -1\\\\\\
                  1 & -1 & 1
                \\end{pmatrix}
                =
                \\begin{pmatrix}
                  d & -b & 0\\\\\\
                  -c & a & 0\\\\\\
                  (cf - ed) & -(af - eb) & (ad - cb)
                \\end{pmatrix}
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <h4 className="Blog-Headers"> Adjugate </h4>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\begin{pmatrix}
                  d & -c & (cf - ed)\\\\\\
                  -b & a & -(af - eb)\\\\\\
                  0 & 0 & (ad - cb)
                \\end{pmatrix}
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
          <h4 className="Blog-Headers"> Multiply by 1/determinant (of the original matrix) </h4>
          <div className="Blog-Text">
            <MathJax.Context>
              <MathJax.Node>{`
                \\frac{1}{ad-cb}
                *
                \\begin{pmatrix}
                  d & -c & (cf - ed)\\\\\\
                  -b & a & -(af - eb)\\\\\\
                  0 & 0 & (ad - cb)
                \\end{pmatrix}
                =
                \\begin{pmatrix}
                  \\frac{d}{ad-cb} & \\frac{-c}{ad-cb} & \\frac{cf-ed}{ad-cb}\\\\\\
                  \\frac{-b}{ad-cb} & \\frac{a}{ad-cb} & \\frac{-af+eb}{ad-cb}\\\\\\
                  0 & 0 & 1\\\\\\
                \\end{pmatrix}
              `}</MathJax.Node>
            </MathJax.Context>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}


class D3_Part_2_Understanding_Tranforms extends React.Component {
  render() {
    return(
      <Grid>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> D3 Part 2 - Understanding Transforms </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> Introduction </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="Blog-Text">
              While exploring how to create a bar graph in the last Part 1 D3 blog, I was
              particularly fascinated with the the highly prevalent use of the
              <em> transform</em> attribute for most SVG components.
            </p><br/>
            <p className="Blog-Text">
              After quickly gazing over the
              <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform"
                 target="_blank" rel="noopener noreferrer"> api documentation</a>,
              it seemed like a really powerful way of controlling graphical presentation
              of SVG components, and well worth exploring.
            </p><br/>
            <p className="Blog-Text">
              In the example below, we will predict the transform via the matrix calculation
              provided in the docs (with a few terms switched around) and then confirm
              such predictions with the actual transformation.
            </p><br/>
            <p className="Blog-Text">
              Please do not hesitate to check the code
              <a href="https://github.com/Andrew12u/scitech_pond_static/blob/master/src/blogs/D3_Part_2_Understanding_Transforms.js"
                 target="_blank" rel="noopener noreferrer"> here</a>.
              This particular post is a bit more mathematically intensive, but feel free to peruse the code at your liesure to confirm various calculations are accurate.
            </p><br/>
          </Col>
        </Row>
        <hr/>
        <TransformExample />
        <hr/>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> Conclusion </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="Blog-Text">
              Need to be careful when reading documentation.  All because the docs say you are calculating one thing from another, does not always make it true.
              It is better to be skeptical from the beginning then be caught unaware.
            </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default D3_Part_2_Understanding_Tranforms;
