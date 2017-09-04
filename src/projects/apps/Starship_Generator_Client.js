import React, { Component } from 'react';
//bootstrap stuff
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';


class Starship_Generator_Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starship_name: "",
      starship_class: "",
      starship_features: {
        gym: false,
        Infirmary: false,
        lab: false,
        navigation: false,
        torpedoes: false,
        mines: false,
        improved_propulsion: false,
        hidden_cargo_bay: false,
        bar: false,
        arboretum: false
      },
      starship_width: -1,
      starship_length: -1,
      starship_height: -1
    };
    this.handleRegularChange = this.handleRegularChange.bind(this);
    this.handleFeatureChange = this.handleFeatureChange.bind(this);
    this.getInputForShipFeatures = this.getInputForShipFeatures.bind(this);
    this.getNumberOfShipFeatures = this.getNumberOfShipFeatures.bind(this);
    this.getFeatureHelpMessage = this.getFeatureHelpMessage.bind(this);
    this.getShipAesthetics = this.getShipAesthetics.bind(this);
  }
  handleRegularChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }
  handleFeatureChange(event){
    const target = event.target;
    const name = target.name;
    let starship_features = this.state.starship_features;
    starship_features[name] = target.checked;
    this.setState({
      starship_features
    });
  }
  getNumberOfShipFeaturesSelected(){
    let count = 0;
    for (let f in this.state.starship_features) {
      if(this.state.starship_features.hasOwnProperty(f)){
        if(this.state.starship_features[f] === true) count++;
      }
    }
    return count;
  }
  getNumberOfShipFeatures(){
    switch(this.state.starship_class){
      case "corvette":
        return 1;
      case "frigate":
        return 2;
      case "destroyer":
        return 3;
      case "cruiser":
        return 4;
      case "battleship":
        return 5;
      case "carrier":
        return 6;
      default: //default is the normal behavior or the react-button theme
        return -1;
    }
  }
  getFeatureHelpMessage(){
    if(this.getNumberOfShipFeatures() === -1) return "you need to select a ship class.";
    else return "You need to select only " + this.getNumberOfShipFeatures() + " features.";
  }
  getStarshipFeatureValidationState(){
    if(this.getNumberOfShipFeaturesSelected() != this.getNumberOfShipFeatures()) return 'error';
    else return 'success';
  }
  getInputForShipFeatures(){
    return(
        <div>
          <FormGroup
              controlId="fgSelectFeaturesOne"
              validationState={this.getStarshipFeatureValidationState()}>
              <Col xs={12}>
                <ControlLabel>Features</ControlLabel>
                <FormControl.Feedback />
                <HelpBlock>{this.getFeatureHelpMessage()}</HelpBlock>
              </Col>
              <Col xs={4}>
                <Checkbox checked={this.state.starship_features.gym} name="gym" onChange={this.handleFeatureChange}>
                  Gym
                </Checkbox>
                <Checkbox checked={this.state.starship_features.infirmary} name="infirmary" onChange={this.handleFeatureChange}>
                  Infirmary
                </Checkbox>
                <Checkbox checked={this.state.starship_features.lab} name="lab" onChange={this.handleFeatureChange}>
                  Lab
                </Checkbox>
                <Checkbox checked={this.state.starship_features.navigation} name="navigation" onChange={this.handleFeatureChange}>
                  Navigation
                </Checkbox>
                <Checkbox checked={this.state.starship_features.torpedoes} name="torpedoes" onChange={this.handleFeatureChange}>
                  Torpedoes
                </Checkbox>
              </Col>
              <Col xs={4}>
                <Checkbox checked={this.state.starship_features.mines} name="mines" onChange={this.handleFeatureChange}>
                  Mines
                </Checkbox>
                <Checkbox checked={this.state.starship_features.improved_propulsion} name="improved_propulsion" onChange={this.handleFeatureChange}>
                  Improved Propulsion
                </Checkbox>
                <Checkbox checked={this.state.starship_features.hidden_cargo_bay} name="hidden_cargo_bay" onChange={this.handleFeatureChange}>
                  Hidden Cargo Bay
                </Checkbox>
                <Checkbox checked={this.state.starship_features.bar} name="bar" onChange={this.handleFeatureChange}>
                  Bar
                </Checkbox>
                <Checkbox checked={this.state.starship_features.arboretum} name="arboretum" onChange={this.handleFeatureChange}>
                  Arboretum
                </Checkbox>
              </Col>
            </FormGroup>
        </div>
    );
  }
  getStarshipDimensionValidationState(event){
    if( (this.state.starship_width === -1) ||
        (this.state.starship_length === -1) ||
        (this.state.starship_height === -1) ) return 'error';
    else return 'success';
  }
  getShipAesthetics(){
    return(
      <div>
        <FormGroup
            controlId="fgShipAesthetics"
            validationState={this.getStarshipDimensionValidationState()}>
          <Col xs={12}>
            <ControlLabel>Ship Aesthetics</ControlLabel>
            <FormControl.Feedback />
          </Col>
          <Col xs={4}>
            <ControlLabel>Width</ControlLabel>
            <HelpBlock>How wide you want your ship to be <br/> (1=narrowest, 5=widest)</HelpBlock>
            <FormControl componentClass="select"
                         placeholder="select"
                         name="starship_width"
                         onChange={this.handleRegularChange}>
              <option value={-1}>select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </FormControl>
          </Col>
          <Col xs={4}>
            <ControlLabel>Length</ControlLabel>
            <HelpBlock>How long you want your ship to be <br/> (1=smallest, 5=longest)</HelpBlock>
            <FormControl componentClass="select"
                         placeholder="select"
                         name="starship_length"
                         onChange={this.handleRegularChange}>
              <option value={-1}>select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </FormControl>
          </Col>
          <Col xs={4}>
            <ControlLabel>Height</ControlLabel>
            <HelpBlock>How tall you want your ship to be <br/> (1=shortest, 5=tallest)</HelpBlock>
            <FormControl componentClass="select"
                         placeholder="select"
                         name="starship_height"
                         onChange={this.handleRegularChange}>
              <option value={-1}>select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </FormControl>
          </Col>
        </FormGroup>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={6}>
            <FormGroup controlId="fGroupStarshipName">
              <ControlLabel> Starship Name </ControlLabel>
              <FormControl
                type="text"
                name="starship_name"
                value={this.state.starship_name}
                placeholder="Enter Name"
                onChange={this.handleRegularChange}
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Class</ControlLabel>
              <FormControl componentClass="select"
                           placeholder="select"
                           name="starship_class"
                           onChange={this.handleRegularChange}>
                <option value="select">select</option>
                <option value="corvette">corvette</option>
                <option value="frigate">frigate</option>
                <option value="destroyer">destroyer</option>
                <option value="cruiser">cruiser</option>
                <option value="battleship">battleship</option>
                <option value="carrier">carrier</option>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {this.getInputForShipFeatures()}
        </Row>
        <Row>
          {this.getShipAesthetics()}
        </Row>
        <Row>
          <Col xs={12}>
            <br/><br/>
            <Button bsStyle="primary" bsSize="large" block>Submit</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Starship_Generator_Client;
