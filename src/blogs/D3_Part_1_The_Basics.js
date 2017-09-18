import React from 'react';

/*REACT Bootstrap Stuff*/
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from  'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from  'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

//My CSS stuff
import "./css/General_Blog.css"
import "./css/D3_Part_1_The_Basics.css"


//D3 Stuff
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { axisLeft, axisBottom } from 'd3-axis'



class BarGraph extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       svg_width:400,
       svg_height:400,
       svg_margins:{
         top:20,
         right:20,
         bottom:30,
         left:40
       }
     };
     this.createBarChart = this.createBarChart.bind(this);
     this.getMaxInSuppliedValues = this.getMaxInSuppliedValues.bind(this);
  }
  //helper method for finding max range of values
  getMaxInSuppliedValues(){
    if(!this.props.data) return;
    if(this.props.data.length > 0)
      return Math.max.apply(Math,this.props.data.map(function(item){ return parseInt(item.graph_element_value); }));
  }
  createBarChart() {
    const node = this.node
    const dataMax = this.getMaxInSuppliedValues();
    const barHeightMax = this.props.size[1];
    let width = this.state.svg_width - this.state.svg_margins.left - this.state.svg_margins.right;
    let height = this.state.svg_height - this.state.svg_margins.top - this.state.svg_margins.bottom;

    const xScale = scaleBand()
      .rangeRound([0, width]).padding(0.1);
    const yScale = scaleLinear()
      .rangeRound([height, 0]); //to a given range in pixels.
                                //in this case, the max height of a given bar in our bar graph

    select(node).selectAll("*").remove();

    let translation_g = select(node) //for encapsulating transformations
      .append('g')
      .attr('id',"translation_g")
      .attr('transform', 'translate(' + this.state.svg_margins.left + ',' + this.state.svg_margins.top + ')');

    xScale.domain(
      this.props.data.map(
        function(d){
          return d.graph_element_name;
        }
      )
    );

    yScale.domain([0, dataMax]);

    translation_g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(xScale));
    translation_g.append("g")
      .attr("class", "axis axis--y")
      .call(axisLeft(yScale).ticks(10)) //ticks: given domain of data, divide max by tick value to get increment
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    translation_g.selectAll(".bar")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style('fill', d => d.graph_element_color)
      .attr('x', d => xScale(d.graph_element_name))
      .attr('y', d => yScale(d.graph_element_value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.graph_element_value))
  }
  componentDidMount(){
    if(this.props.data.length >= 0) this.createBarChart();
  }
  componentDidUpdate(){
    if(this.props.data.length >= 0) this.createBarChart();
  }
  render() {
     return <svg ref={node => this.node = node}
      width={this.state.svg_width} height={this.state.svg_height}
      transform={"translate(" + this.state.svg_margins.left + "," + this.state.svg_margins.top + ")"}>
     </svg>
  }
}

class BarGraphExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph_name:"",
      graph_data_manual:[],
      new_graph_element:{
        graph_element_name:"",
        graph_element_value:"",
        graph_element_color:""
      }
    };
    this.handleGeneralValueChange = this.handleGeneralValueChange.bind(this);
    this.handleManualGraphElemChange = this.handleManualGraphElemChange.bind(this);
    this.handleManualGraphElemAdd = this.handleManualGraphElemAdd.bind(this);
    this.removeGraphItem = this.removeGraphItem.bind(this);
  }
  handleGeneralValueChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }
  handleManualGraphElemChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let newState = this.state;
    newState.new_graph_element[name] = value;
    this.setState(newState);
  }
  handleManualGraphElemAdd(event){
    let newState = this.state;
    newState.graph_data_manual.push(this.state.new_graph_element);
    //Critical: need to give new_graph_element a new object to manipulate
    //if you don't, the state.graph_data_manual data will all reference the
    //same Object
    //
    //Also: You ought to reset the new_graph_element values as it updates
    //depending on changes to input.  If you don't do this, you will
    //have objects missing attributes which haven't changed
    newState.new_graph_element = new Object();
    newState.new_graph_element["graph_element_name"] = "";
    newState.new_graph_element["graph_element_value"] = "";
    newState.new_graph_element["graph_element_color"] = "";
    this.setState(newState); //should append to graph data
  }
  removeGraphItem(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let newState = this.state;
    for(let i=0; i<this.state.graph_data_manual.length; i++){
      if(this.state.graph_data_manual[i].graph_element_name === name){
        newState.graph_data_manual.splice(i,1);
      }
    }
    this.setState(newState);
  }
  getGraphElementsInList(){
    let min = 1 //for random key generation. Really *bad* way, but quick.
    let max = 99999999; //for random key generation. Really *bad* way, but quick.

    return (
      this.state.graph_data_manual.map((item) => (
          <ListGroupItem key={Math.random() * (max - min) + min}
                         name={item.graph_element_name}
                         onClick={this.removeGraphItem}>

                         {item.graph_element_name}

          </ListGroupItem>
      ))
    );

  }

  getGraphNameValidation(){
    const lengthOfGraphName = this.state.graph_name.length;
    if (lengthOfGraphName >= 4) return 'success';
    else return 'error';
  }
  getGraphElemNameValidation(){
    const lengthOfGraphElemName = this.state.new_graph_element.graph_element_name.length;
    if (lengthOfGraphElemName >= 4) return 'success';
    else return 'error';
  }
  getGraphElemValueValidation(){
    const graphElemValue = this.state.new_graph_element.graph_element_value;
    if(!graphElemValue) return 'error';
    if (!isNaN(graphElemValue)) return 'success';
    else return 'error';
  }
  getGraphElemColorValidation(){
    //https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
    const graphElemColor = this.state.new_graph_element.graph_element_color;
    if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(graphElemColor)) return 'success';
    else return 'error';
  }



  render() {
    return(
      <div>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> Example: A simple bar-graph </h3>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <p className="Blog-Text">
              In this example, we are going to go over how to create a simple bar graph.
              Implicit in this example, is incorporating react state information as well
              as react bootstrap form input and validation.
            </p>
          </Col>
          <Col md={4}>
            <Form>
              <fieldset>

                <div className="Labels">
                  Graph Name:
                </div>
                <FormGroup
                  controlId="graphNameFGId"
                  validationState={this.getGraphNameValidation()}>
                  <FormControl
                    type="text"
                    name="graph_name"
                    placeholder="Enter Text"
                    onChange={this.handleGeneralValueChange} />
                  <FormControl.Feedback />
                  <HelpBlock>Name must be at least four characters.</HelpBlock>
                </FormGroup>

                <div className="Labels">
                  Add Graph Element:
                </div>
                <FormGroup
                  controlId="graphElemNameFGId"
                  validationState={this.getGraphElemNameValidation()}>
                  <FormControl
                    type="text"
                    name="graph_element_name"
                    placeholder="Name of element"
                    onChange={this.handleManualGraphElemChange}
                    value={this.state.new_graph_element.graph_element_name}/>
                  <HelpBlock>New Graph Element Name should have 4 characters.</HelpBlock>
                </FormGroup>
                <FormGroup
                  controlId="graphElemValueFGId"
                  validationState={this.getGraphElemValueValidation()}>
                  <FormControl
                    type="text"
                    name="graph_element_value"
                    placeholder="Value of element"
                    onChange={this.handleManualGraphElemChange}
                    value={this.state.new_graph_element.graph_element_value}/>
                  <HelpBlock>New Graph Element Value should consist of numbers or decimal values.</HelpBlock>
                </FormGroup>
                <FormGroup
                  controlId="graphElemHexColorFGId"
                  validationState={this.getGraphElemColorValidation()}>
                    <FormControl
                      type="text"
                      name="graph_element_color"
                      placeholder="Color (e.g. #FFFFFF)"
                      onChange={this.handleManualGraphElemChange}
                      value={this.state.new_graph_element.graph_element_color}/>
                    <HelpBlock>New Graph Element Color should consist of hex values.</HelpBlock>
                </FormGroup>

                <Button className="btn btn-primary btn-small centerButton" onClick={() => { this.handleManualGraphElemAdd() }}> Add </Button>

                <div className="Labels">
                  Graph Elements (L-Click to remove)
                </div>
                <ListGroup>
                  {this.getGraphElementsInList()}
                </ListGroup>



              </fieldset>
            </Form>
          </Col>
          <Col md={4} id="bar_graph_column">
            <h4 className="Blog-Headers">{this.state.graph_name}</h4>
            <BarGraph data={this.state.graph_data_manual} size={[400,400]} />
          </Col>
        </Row>
      </div>
    );
  }
}


class D3_Part_1_The_Basics extends React.Component {
  render() {
    return(
      <Grid>

        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> D3 Part 1 - The Basics </h3>
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
              D3 is a relatively ubiquitous JavaScript library for &quot;producing dynamic, interactive
              data visualizations in web browsers&quot;<sup>[1]</sup>.   D3 is entirely
              front-end (HTML, SVG, JS and CSS only), so it should be relatively light-weight and usable in a static website.
              It is my hope that such a library will prove to be a powerful tool that I can leverage when going over algorithmic and
              theoretical concepts.
            </p><br/>
            <p className="Blog-Text">
              D3 already has an <strong>extensive</strong> community of supporters.  There already exists dozens of
              <a href="https://github.com/d3/d3/wiki/Tutorials" target="_blank" rel="noopener noreferrer"> tutorials</a>,
              and great <a href="https://github.com/d3/d3/blob/master/API.md" target="_blank" rel="noopener noreferrer">API Documentation</a>.  So, as usual, it is
              just a matter of putting everything together.
            </p><br/>
            <p className="Blog-Text">
              In particular, we will go over how to create a dynamic bar graph React Component and relate it to D3.
            </p><br/>
            <p className="Blog-Text">
              For more information, I recommend checking out the references section<sup>[2] [3]</sup>. most of what you see here is a result of the work that others have already done.
            </p><br/>
          </Col>
        </Row>

        <hr/>

        <BarGraphExample/>

        <hr/>

        <Row>
          <Col md={4}>
            <h3 className="Blog-Headers"> Overview </h3>
            <p className="Blog-Text">
              To begin, the code for all of this can be found <a href="https://github.com/Andrew12u/scitech_pond_static/blob/master/src/blogs/D3_Part_1_The_Basics.js" target="_blank" rel="noopener noreferrer"> here </a>.
              Feel free to read the code as we kind of go over all of this.  But yes, so the structure of this example is something like to the right.  There are three React components, but we really only
              care about <strong> BarGraphExample </strong> and <strong> BarGraph</strong> (unless you *really* want to know about the basic blog structure ;-) ).  Of note is the abstraction of the SVG D3
              graph into a re-usable React Component.  By allowing one component (BarGraphExample) to control the data, and another component to encapsulate the D3 graph (BarGraph), we can control data input/validation
              and graph creation separately.
            </p><br/>
          </Col>
          <Col md={6}>
            <br/><br/>
            <div className="bar_graph_example_image"></div>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <h3 className="Blog-Headers"> Graph Refreshing </h3>
            <p className="Blog-Text">
              Observe that we are passing state information &#40; from <strong>BarGraphExample</strong> &#41; to <strong>BarGraph</strong>.  This is both a blessing and a curse, in the sense that, sure, <strong>BarGraph </strong>
              gets the most recent state information from <strong> BarGraphExample </strong>, <em>but</em> because I am passing that state information in the render, and because render get executed every time
              the state changes, the BarGraph&#39;s &#39;s componentDidUpdate&#40; &#41; gets triggered <em>a lot</em>.
            </p><br/>
            <p className="Blog-Text">
              The way that this was circumvented was by removing all child svg components prior to graph creation.  Note that the graph only gets rendered when data is present &#40; we check for the number of data Elements
              passed&#41;.
            </p><br/>
          </Col>
          <Col md={4}>
            <h4 className="Blog-Headers"> BarGraphExample</h4>
            <pre>
{`render(){
   ...
   <Col md={4} id="bar_graph_column">
     <h4 className="Blog-Headers">{this.state.graph_name}</h4>
     <BarGraph data={this.state.graph_data_manual} size={[400,400]} />
   </Col>
   ...
 }`}
            </pre><br/>
          </Col>
          <Col md={4}>
            <h4 className="Blog-Headers"> BarGraph</h4>
            <pre>
{`componentDidMount(){
   if(this.props.data.length >= 0) this.createBarChart();
 }
componentDidUpdate(){
   if(this.props.data.length >= 0) this.createBarChart();
 }`}
            </pre><br/>
            <pre>
{`createBarChart(){
  ...
  select(node).selectAll("*").remove();
  ...
}`}
            </pre>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <h3 className="Blog-Headers"> Range Scaling </h3>
            <p className="Blog-Text">
              One of the first things we need to do when creating a bar graph is establish the Scaling
              of the bar graph &#40; in pixels &#41;; which, in turn, is dependent upon margins, width and height. After we do this, we can map real data to this range &#40;that
              is essentially what those scaleBand&#40;&#41;.rangeRound&#40;&#41; and scaleLinear&#40;&#41;.rangeRound&#40;&#41; calls are about&#41;.
            </p><br/>
            <p className="Blog-Text">
              Eventually, we will also need to map a <em>domain</em> of values to those pixel ranges. To get ahead in that regard, for the y-axis at least, we find the max in the set of data values &#40;getMaxInSuppliedValues&#40;&#41;&#41;
            </p><br/>
          </Col>
          <Col md={8}>
            <h4 className="Blog-Headers"> BarGraph</h4>
            <pre>
{`createBarChart() {
  const node = this.node
  const dataMax = this.getMaxInSuppliedValues(); //find max in supplied data
  const barHeightMax = this.props.size[1];
  let width = this.state.svg_width - this.state.svg_margins.left - this.state.svg_margins.right;
  let height = this.state.svg_height - this.state.svg_margins.top - this.state.svg_margins.bottom;

  const xScale = scaleBand()
    .rangeRound([0, width]).padding(0.1);
  const yScale = scaleLinear()
    .rangeRound([height, 0]);
`}
            </pre>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <h3 className="Blog-Headers"> Domain Scaling </h3>
            <p className="Blog-Text">
              First, just to get it over with, I am encapsulating the entire graph in an svg group, so that I can easily
              apply a translation matrix to the whole thing.
            </p><br/>
            <p className="Blog-Text">
              Once that&#39;s done, as mentioned earlier, we need to match the data domain to the pixel range values we already established.
              In associated code, we are essentially taking a set of data values (the names and values of each bar element) and map
              them to the x and y-axis pixel ranges.
            </p><br/>
          </Col>
          <Col md={8}>
            <h4 className="Blog-Headers"> BarGraph</h4>
            <pre>
{`createBarChart() {
  ...
  let translation_g = select(node) //for encapsulating transformations
    .append('g')
    .attr('id',"translation_g")
    .attr('transform', 'translate(' + this.state.svg_margins.left + ',' + this.state.svg_margins.top + ')');

  xScale.domain(
    this.props.data.map(
      function(d){
        return d.graph_element_name;
      }
    )
  );

  yScale.domain([0, dataMax]);
`}
            </pre>
          </Col>
        </Row>


        <Row>
          <Col md={4}>
            <h3 className="Blog-Headers"> Axes Creation </h3>
            <p className="Blog-Text">
              Cool, so now that we have a domain of values for both x and y axes, we can
              go ahead and create them and establish relevant tick marks.
            </p><br/>
            <p className="Blog-Text">
              The axisBottom&#40;xScale&#41; and axisLeft&#40;yScale&#41; is essentially where
              the magic occurs.  xScale and yScales match the data to pixel ranges and axisBottom&#40;xScale&#41;
              and axisLeft&#40;yScale&#41; method calls <em>apply</em> that information to a particular axis.
            </p><br/>
          </Col>
          <Col md={8}>
            <h4 className="Blog-Headers"> BarGraph</h4>
            <pre>
{`createBarChart() {
  ...
  translation_g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(xScale));
  translation_g.append("g")
      .attr("class", "axis axis--y")
      .call(axisLeft(yScale).ticks(10)) //ticks: given domain of data, divide max by tick value to get increment
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");
`}
            </pre>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <h3 className="Blog-Headers"> Bar Creation </h3>
            <p className="Blog-Text">
              Alright! So now that we finally have our axes, we can display our data!

              There&#39;s a bit of d3 magic here:
            </p><br/>
            <ol className="Blog-Text">
              <li>First we create a dummy selection based upon <em>.bar</em>.</li>
              <li>There&#39;s nothing in the DOM that has such a class, so D3 will create them after enter&#40;&#41;</li>
              <li>But D3 has no clue what the element is so...we append the SVG element rect for each datum</li>
              <li>We apply relevant styling via an anonymous `function` that will take in each datum d and return the relevant color we supplied.</li>
              <li>The relevant x and y cooridinates of the bar is dependent upon how the x and y datums match to the x and y ranges &#40;in pixels&#41;</li>
              <li>The width of each bar is determined based upon how many data elements are given.  E.g. if there is one data element, we want it to fill the whole graph.</li>
              <li>The height of each bar is dependent upon how the datum matches to y range, relative to the height of the svg graph.</li>
            </ol>
          </Col>
          <Col md={8}>
            <h4 className="Blog-Headers"> BarGraph</h4>
            <pre>
{`createBarChart() {
  ...
  translation_g.selectAll(".bar")
    .data(this.props.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style('fill', d => d.graph_element_color)
    .attr('x', d => xScale(d.graph_element_name))
    .attr('y', d => yScale(d.graph_element_value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.graph_element_value))
}`}
            </pre>
          </Col>
        </Row>

        <hr/>
        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> Conclusion </h3>
            <p className="Blog-Text">
              Hopefully this example has shown the potential of creating D3 visualization in a react component.
              Clearly, it is possible to dynamically display D3 visualizations based upon passed React state and prop information.
              In addition, there is a great deal of modularization and reusuability to to be had here.
            </p><br/>
            <p className="Blog-Text">
              The biggest fear that I have, is less about React and D3, and more about incorporating Bootstrap to make scalable
              and responsive visualizations.  Dynamic the visualizations may be, but there are also quite a few pixel specific calculations
              that seem to be required.
            </p><br/>
            <p className="Blog-Text">
              However, I am just beginning to look into D3 as a whole, so this might not even be an issue.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h3 className="Blog-Headers"> References </h3>
          </Col>
        </Row>
        <Row>
          <ul className="Blog-Text">
            <li>[1] : <a href="https://en.wikipedia.org/wiki/D3.js"> https://en.wikipedia.org/wiki/D3.js </a> </li>
            <li>[2] : <a href="https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71"> Elijah Meek&#39;s Blog </a></li>
            <li>[3] : <a href="https://bl.ocks.org/mbostock/3885304"> Mike Bostock&#39;s example on bl.ocks.org </a></li>
          </ul>
        </Row>
      </Grid>
    );
  }
}

export default D3_Part_1_The_Basics;
