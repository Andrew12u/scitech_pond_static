import React from 'react';

//3rd Part Social Media Sharing
import {

  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TumblrShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TumblrIcon
} from 'react-share';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from  'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

//Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//My CSS stuff
import '../css/General_Project.css'
import './css/RadarChart.css'

//My React Stuff
import RadarChart from './RadarChart';
import Legend from './Legend';

//Query string bullshit
const queryString = require('query-string');

//3rd Party File-Saver
var FileSaver = require('file-saver');



class RadarChartDemo extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       svg_width: 600,
       svg_height: 600,
       numCriteria: 0,
       numLevels: 0,
       saveName: '',
       useCustomCriteria: false,
       useDefaults: false,
       lockCriteriaNames: false,
       lockAddCompany: false,
       profileToLoadDeleteDownload: '',
       showModalForImport: false,
       showModalForLoad: false,
       showModalForDownload: false,
       criteria: [],
       data: [],
       companies: [],
       individualNames:[],
       colors: [],
       profileToImport: {},
       rawQueryString: [],
       smTitle: 'Testing fun stuff',
       smURL: 'http://scitechpond.com'
     }
     this.addCompany = this.addCompany.bind(this);
     this.addIndividual = this.addIndividual.bind(this);
     this.downloadData = this.downloadData.bind(this);
     this.deleteData = this.deleteData.bind(this);
     this.generatePreCriteriaArray = this.generatePreCriteriaArray.bind(this);
     this.generateUrlQueryString = this.generateUrlQueryString.bind(this);
     this.getCompanyRadioButtonStatus = this.getCompanyRadioButtonStatus.bind(this);
     this.getIndividualRadioButtonStatus = this.getIndividualRadioButtonStatus.bind(this);
     this.handleCompanyRadioButtonChange = this.handleCompanyRadioButtonChange.bind(this);
     this.handleCloseForDownloadModal = this.handleCloseForDownloadModal.bind(this);
     this.handleCloseForImportModal = this.handleCloseForImportModal.bind(this);
     this.handleCloseForLoadModal = this.handleCloseForLoadModal.bind(this);
     this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
     this.handleGeneralValueChange = this.handleGeneralValueChange.bind(this);
     this.handleImportData = this.handleImportData.bind(this);
     this.handleIndividualRadioButtonChange = this.handleIndividualRadioButtonChange.bind(this);
     this.handleShowImportModal = this.handleShowImportModal.bind(this);
     this.handleShowLoadModal = this.handleShowLoadModal.bind(this);
     this.handleShowDownloadModal = this.handleShowDownloadModal.bind(this);
     this.importData = this.importData.bind(this);
     this.loadCustomCriteriaInputField = this.loadCustomCriteriaInputField.bind(this);
     this.loadData = this.loadData.bind(this);
     this.loadDefaultCriteria = this.loadDefaultCriteria.bind(this);
     this.saveData = this.saveData.bind(this);
     this.setProfileToLoadDeleteDownload = this.setProfileToLoadDeleteDownload.bind(this);
     this.testUrlQueryString = this.testUrlQueryString.bind(this);
  }
  /*
   * ===================
   * METHODS: Validation
   * ===================
   */
  get_numCriteria_validation(){
    if(!isNaN(this.state.numCriteria) && this.state.numCriteria>0) return 'success';

    return 'error';
  }
  get_numLevels_validation(){
    if(!isNaN(this.state.numLevels) && this.state.numLevels>0) return 'success';

    return 'error';
  }
  get_criteria_validation(){
    if( (this.state.criteria.length != this.state.numCriteria) || this.state.criteria.length == 0) return 'error';
    return 'success';
  }
  /*
   * ===================
   * METHODS: Randomization
   * ===================
   */
  get_randomColor(){
    //https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  }
  /*
   * ===================
   * METHODS: Event Handlers
   * ===================
   */
   handleCompanyRadioButtonChange(companyIndex, event){
     const target = event.target;
     const value = target.value;
     let name = target.name.split('_')[0]; //radio buttons have unique names so that you can select them
     let newDataForCompany = this.state.companies[companyIndex];

     for(let i=0; i<this.state.criteria.length; i++){
       for (let property in newDataForCompany[i]) {
           if (newDataForCompany[i].hasOwnProperty(property)) {
               if( (property === 'axis') && (newDataForCompany[i].axis === name) ) {
                 newDataForCompany[i].value = value;
               }
           }
       }
     }

     let newState = this.state;
     newState.companies[companyIndex] = newDataForCompany;
     this.setState(newState);
   }

  handleGeneralValueChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleIndividualNameChange(individualIndex, event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newState = this.state;
    newState.individualNames[individualIndex] = value;
    this.setState(newState);
  }

  handleIndividualRadioButtonChange(individualIndex, event){
    const target = event.target;
    const value = target.value;
    let name = target.name.split('_')[0]; //radio buttons have unique names so that you can select them
    let newDataForIndividual = this.state.data[individualIndex];

    for(let i=0; i<this.state.criteria.length; i++){
      for (let property in newDataForIndividual[i]) {
          if (newDataForIndividual[i].hasOwnProperty(property)) {
              if( (property === 'axis') && (newDataForIndividual[i].axis === name) ) {
                newDataForIndividual[i].value = value;
              }
          }
      }
    }

    let newState = this.state;
    newState.data[individualIndex] = newDataForIndividual;
    this.setState(newState);
  }


  /*
   * ===================
   * METHODS: DOM Generation (Individuals/Company input)
   * ===================
   */
   generateCompanyRadioButtons(criteriaName, companyIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let radioButtons = [];
     for(let i=0; i<this.state.numLevels; i++){
       radioButtons.push(
           <Radio name={criteriaName + '_' + ((companyIndex + 1) * 1000)} key={i} value={i} onClick={ (e) => this.handleCompanyRadioButtonChange(companyIndex, e) } className="Project-Text" checked={this.getCompanyRadioButtonStatus(companyIndex, criteriaName, i)} inline >
             {i}
           </Radio>
       );
     }
     return radioButtons;
   }

   generateIndividualRadioButtons(criteriaName, individualIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let radioButtons = [];
     for(let i=0; i<this.state.numLevels; i++){
       radioButtons.push(
           <Radio name={criteriaName + '_' + individualIndex} key={i} value={i} onClick={ (e) => this.handleIndividualRadioButtonChange(individualIndex, e) } className="Project-Text" checked={this.getIndividualRadioButtonStatus(individualIndex, criteriaName, i)} inline>
             {i}
           </Radio>
       );
     }
     return radioButtons;
   }
   generateCompanyCriteriaSet(companyIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let setOfCriteria = [];
     for(let i=0; i<this.state.criteria.length; i++){
       setOfCriteria.push(
         <div key={i}>
           <FormGroup>
             <ControlLabel className="Project-Text">{this.state.criteria[i] + '::'}</ControlLabel>{' '}
             <FormGroup>
               { this.generateCompanyRadioButtons(this.state.criteria[i], companyIndex) }
             </FormGroup>
           </FormGroup>
         </div>
       );
     }
     return setOfCriteria;
   }

   generateIndividualCriteriaSet(individualIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let setOfCriteria = [];
     for(let i=0; i<this.state.criteria.length; i++){
       setOfCriteria.push(
         <div key={i}>
           <FormGroup>
             <ControlLabel className="Project-Text">{this.state.criteria[i] + '::'}</ControlLabel>{' '}
             <FormGroup>
               { this.generateIndividualRadioButtons(this.state.criteria[i], individualIndex) }
             </FormGroup>
           </FormGroup>
         </div>
       );
     }
     return setOfCriteria;
   }

   generateApplicantHeader(indexOfIndividual){
     if(indexOfIndividual == 0) return (<h4 className="Project-Headers">Applicants:</h4>);
   }
   generateCompanies(){
     return this.state.companies.map((el, i) =>
         <div key={i}>
          <h4 className="Project-Headers">Company:</h4>
          {this.generateCompanyCriteriaSet(i)}
          <hr/>
         </div>
     )
   }

   generateIndividuals(){
     return this.state.data.map((el, i) =>
         <div key={i}>
          {this.generateApplicantHeader(i)}
          {this.generateIndividualNameField(i)}
          {this.generateIndividualCriteriaSet(i)}
          <hr/>
         </div>
     )
   }

   generateIndividualNameField(individualIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     return(
       <FormGroup>
         <ControlLabel className="Project-Text">Name:</ControlLabel>{' '}
         <FormGroup>
           <FormControl
             type="text"
             name="individualNames"
             placeholder="Enter Name"
             value={this.state.individualNames[individualIndex]}
             onChange={(e) => this.handleIndividualNameChange(individualIndex, e)}  />
         </FormGroup>
       </FormGroup>
     );

   }

  /*
   * ===================
   * METHODS: DOM Generation (Criteria Names input)
   * ===================
   */
  generateCriteriaInputFields(){
    let criteria = [];
    if(this.state.useCustomCriteria){
      for(let i=0; i<this.state.numCriteria; i++){
        if(i==0){
          criteria.push(
            <div key={i}>
              <FormGroup
                controlId={"fgCriteriaNames" + i}
                validationState={this.get_criteria_validation()}>

                <ControlLabel>Criteria:</ControlLabel>
                <FormControl
                  readOnly={this.state.lockCriteriaNames}
                  type="text"
                  name="criteria"
                  value={this.state.criteria[i]}
                  placeholder="Criteria"
                  onChange={(e) => this.handleCriteriaChange(i, e)}
                  />
                <FormControl.Feedback />

              </FormGroup>
            </div>
          );
        } else if(i == this.state.numCriteria-1){
          criteria.push(
            <div key={i}>
              <FormGroup
                controlId={"fgCriteriaNames" + i}
                validationState={this.get_criteria_validation()}>
                <FormControl
                  readOnly={this.state.lockCriteriaNames}
                  type="text"
                  name="criteria"
                  value={this.state.criteria[i]}
                  placeholder="Criteria"
                  onChange={(e) => this.handleCriteriaChange(i, e)}
                  />
                <FormControl.Feedback />
                <HelpBlock>All of the criteria input fields should be filled before proceeding.</HelpBlock>
              </FormGroup>
            </div>
          );
        } else {
          criteria.push(
            <div key={i}>
              <FormGroup
                controlId={"fgCriteriaNames" + i}
                validationState={this.get_criteria_validation()}>
                <FormControl
                  readOnly={this.state.lockCriteriaNames}
                  type="text"
                  name="criteria"
                  value={this.state.criteria[i]}
                  placeholder="Criteria"
                  onChange={(e) => this.handleCriteriaChange(i, e)}
                  />
                  <FormControl.Feedback />
                </FormGroup>
            </div>
          );
        }

      }
    } else {
      for(let i=0; i<this.state.numCriteria; i++){
        criteria.push(
          <div key={i}>
            <FormControl
              readOnly={this.state.lockCriteriaNames}
              type="text"
              name="criteria"
              value={this.state.criteria[i]}
              placeholder="Criteria"
              onChange={(e) => this.handleCriteriaChange(i, e)} />
            <FormControl.Feedback />
          </div>
        );
      }
    }
    return criteria || null;
  }

  /*
   * ===================
   * METHODS: DOM Generation (Needed prior to criteria input)
   * ===================
   */
   generateCustomCriteriaNumField(){
     if(this.state.useCustomCriteria){
       return (
       <FormGroup
         controlId="fgNumCriteria"
         validationState={this.get_numCriteria_validation()}>
         <FormControl
           type="text"
           name="numCriteria"
           value={this.state.numCriteria}
           placeholder="# Criteria"
           onChange={this.handleGeneralValueChange} />
         <FormControl.Feedback />
         <HelpBlock>Must be a positive integer.</HelpBlock>
       </FormGroup>
     );

     }
     return;
   }

   generatePreCriteriaArray(){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet
     let preCriteriaList = [];
     for(let i=0; i<this.state.criteria.length; i++){
       preCriteriaList.push({axis:this.state.criteria[i], value:0});
     }
     return preCriteriaList;
   }

  /*
   * ===================
   * METHODS: DOM Generation (Legend)
   * ===================
   */

  generateLegend(){
    return this.state.data.map((el, i) =>
      <g key={i}>
        <rect x="0" y={i * 30} width="20" height="20" fill={this.state.colors[i]} />
        <text x="50" y={i * 30} dy="1em" fill="white"> {this.state.individualNames[i]} </text>
      </g>
    )
  }

  /*
   * ===================
   * METHODS: DOM Generation (Modals)
   * ===================
   */
   //Save/Load
   getSelectOptionsForLoadDeleteDownloadProfiles(){
     let savedProfileNames = []

     Object.keys(localStorage).forEach(function(key){
        savedProfileNames.push(key);
     });

     let selectOptions = [];

     for(let i=0; i<savedProfileNames.length; i++){
       selectOptions.push(
         <option key={i} value={savedProfileNames[i]}> {savedProfileNames[i]} </option>
       );
     }
     return selectOptions;
   }

   wrapperForLoadDeleteDownloadSelect(){
     return(
       <FormControl componentClass="select" placeholder="select" onChange={this.setProfileToLoadDeleteDownload}>
         <option value="select">select</option>
         {this.getSelectOptionsForLoadDeleteDownloadProfiles()}
       </FormControl>
     );
   }


  /*
   * ===================
   * METHODS: Handlers (Buttons)
   * ===================
   */
  // Adding Elements
  addCompany(){
    let preCriteriaArray = this.generatePreCriteriaArray();
    let newState = this.state;
    newState.companies.push(preCriteriaArray);
    newState.lockAddCompany = true;
    this.setState(newState);
  }

  addIndividual(){
    let preCriteriaArray = this.generatePreCriteriaArray();
    let newState = this.state;
    newState.colors.push(this.get_randomColor());
    newState.data.push(preCriteriaArray);
    newState.lockCriteriaNames = true;
    this.setState(newState);
  }

  // Saving/Loading/Deleting Data
  deleteData(event) {
    let newState = this.state;
    newState.showModalForLoad = false;

    localStorage.removeItem(this.state.profileToLoadDeleteDownload);
    toast.success("Success! Deleted Profile:" + this.state.profileToLoadDeleteDownload, {
      position: toast.POSITION.TOP_CENTER
    });
    newState.profileToLoadDeleteDownload = '';
    this.setState(newState);
  }
  saveData(event){
    let saveState = this.state;
    if(!saveState.saveName){
      toast.error("Nope! Need a profile name!", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }


    localStorage.setItem(saveState.saveName, JSON.stringify(saveState));
    toast.success("Success! Saved Under:" + saveState.saveName, {
      position: toast.POSITION.TOP_CENTER
    });
  }


  handleImportData(event){
    let reader = new FileReader();
    let importedData;
    let newState = this.state;
    reader.onload = function(e) {
      importedData = reader.result;
      newState.profileToImport = JSON.parse(importedData);
      this.setState(newState);
    }.bind(this);
    reader.readAsText(event.target.files[0]);


  }

  importData(event){
    let newState = this.state.profileToImport;
    newState.profileToImport = {};
    newState.showModalForImport = false;
    toast.success("Nice! Imported saved profile!", {
      position: toast.POSITION.TOP_CENTER
    });
    this.setState(newState);
  }


  loadData(event){

    let newState = JSON.parse(localStorage.getItem(this.state.profileToLoadDeleteDownload));
    newState.showModalForLoad = false;
    newState.profileToLoadDeleteDownload = '';
    toast.success("Nice! Loaded:" + this.state.profileToLoadDeleteDownload, {
      position: toast.POSITION.TOP_CENTER
    });
    this.setState(newState);
  }
  downloadData(event){
    let newState = this.state;
    newState.showModalForDownload = false;

    let dataBlobToDownload = JSON.parse(localStorage.getItem(this.state.profileToLoadDeleteDownload));

    let file = new File([JSON.stringify(dataBlobToDownload)], newState.profileToLoadDeleteDownload + ".json", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);

    this.setState(newState);
  }

  // Default vs Custom
  loadCustomCriteriaInputField(event){
    let newState = this.state;
    newState.useCustomCriteria = true;
    this.setState(newState);
  }

  loadDefaultCriteria(event){
    let newState = this.state;
    newState.criteria = [
      'Executive Management',
      'Press & Analysts',
      'Partners',
      'Business Development',
      'Customers',
      'Market Analysis',
      'Content',
      'Graphic Design',
      'Research',
      'UX Design',
      'Technical Support',
      'Technical Writing',
      'Engineering',
      'Project Management',
      'Legal & Contracts',
      'Investors & Board'
    ]
    newState.numCriteria = newState.criteria.length;
    newState.useDefaults = true;
    this.setState(newState);
  }

  //Modals
  handleCloseForLoadModal(){
    let newState = this.state;
    newState.showModalForLoad = false;
    this.setState(newState);
  }
  handleCloseForDownloadModal(){
    let newState = this.state;
    newState.showModalForDownload = false;
    this.setState(newState);
  }
  handleCloseForImportModal(){
    let newState = this.state;
    newState.showModalForImport = false;
    this.setState(newState);
  }
  handleShowLoadModal(){
    let newState = this.state;
    newState.showModalForLoad = true;
    this.setState(newState);
  }
  handleShowDownloadModal(){
    let newState = this.state;
    newState.showModalForDownload = true;
    this.setState(newState);
  }
  handleShowImportModal(){
    let newState = this.state;
    newState.showModalForImport = true;
    this.setState(newState);
  }


  /*
   * ===================
   * METHODS: Handlers (Input Text Changes)
   * ===================
   */

  handleCriteriaChange(i, event){
    const target = event.target;
    const value = target.value;

    let newState = this.state;
    newState.criteria[i] = value;

    this.setState(newState);
  }

  handleSaveName(event){
    const target = event.target;
    const value = target.value;

    let newState = this.state;
    newState.saveName = value;

    this.setState(newState);
  }

  setProfileToLoadDeleteDownload(event){
    const target = event.target;
    const value = target.value;
    let newState = this.state;
    newState.profileToLoadDeleteDownload = value;
    //console.log(newState);
    this.setState(newState);
  }


  /*
   * ===================
   * METHODS: Prototypes
   * ===================
   */

  getCompanyRadioButtonStatus(companyIndex, criteriaName, radioButtonValue){
    for(let i=0; i<this.state.criteria.length; i++){
      for (let property in this.state.companies[companyIndex][i]) {
          if (this.state.companies[companyIndex][i].hasOwnProperty(property)) {
              if( (property === 'axis') && (this.state.companies[companyIndex][i].axis === criteriaName) ) {
                if(this.state.companies[companyIndex][i].value == radioButtonValue) {
                  return true;
                }
              }
          }
      }
    }
    return false;
  }

  getIndividualRadioButtonStatus(individualIndex, criteriaName, radioButtonValue){
      for(let i=0; i<this.state.criteria.length; i++){
      for (let property in this.state.data[individualIndex][i]) {
          if (this.state.data[individualIndex][i].hasOwnProperty(property)) {
              if( (property === 'axis') && (this.state.data[individualIndex][i].axis === criteriaName) ) {
                if(this.state.data[individualIndex][i].value == radioButtonValue) {
                  return true;
                }
              }
          }
      }
    }
    return false;
  }





  /*
   * Social Media Stuff
   */
   testUrlQueryString(event){
     let rootLink = "localhost:3000/project/RadarChartDemo?";
     let smLink = '';
     smLink = this.appendColorsToSocialMediaLink(rootLink).concat('&');
     smLink = this.appendIndividualsToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCompaniesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCriteriaToSocialMediaLink(smLink).concat('&');
     smLink = this.appendIndividualNamesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendNumCriteriaAndLevels(smLink);
     return smLink;
     /*
     console.log(smLink);

     const values = queryString.parse(this.props.urlQueryString, {arrayFormat: 'index'});
     console.log(values.data[0]);
     console.log(values.colors[0]);
     console.log(values.companies[0]);
     console.log(values.criteria[0]);
     console.log(values.individualNames[0]);
     console.log(values.numLevels)
     */
     //console.log(this.props.urlParams.projectId);
     //console.log(this.props.urlQueryString);
   }
   generateUrlQueryString(event){
     let rootLink = "http://scitechpond.com/project/RadarChartDemo?";
     let smLink = '';
     smLink = this.appendColorsToSocialMediaLink(rootLink).concat('&');
     smLink = this.appendIndividualsToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCompaniesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCriteriaToSocialMediaLink(smLink).concat('&');
     smLink = this.appendIndividualNamesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendNumCriteriaAndLevels(smLink).concat('&');
     smLink = this.appendMiscStuff(smLink);

     return smLink;
   }

   appendColorsToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.colors.length; i++){
       if(i+1 == this.state.colors.length)
         rootUrl = rootUrl.concat('colors[' + i + ']=%23' + this.state.colors[i].substring(1, this.state.colors[i].length) ); //need to escape #
       else
         rootUrl = rootUrl.concat('colors[' + i + ']=%23' + this.state.colors[i].substring(1, this.state.colors[i].length) + '&'); //need to escape #
     }
     return rootUrl;
   }
   appendIndividualsToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.data.length; i++){
       if(i+1 == this.state.data.length)
         rootUrl = rootUrl.concat('data[' + i + ']=' + JSON.stringify(this.state.data[i]));
       else
         rootUrl = rootUrl.concat('data[' + i + ']=' + JSON.stringify(this.state.data[i]) + '&');
     }
     return rootUrl;
   }
   appendCompaniesToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.companies.length; i++){
       if(i+1 == this.state.companies.length)
         rootUrl = rootUrl.concat('companies[' + i + ']=' + JSON.stringify(this.state.companies[i]));
       else
         rootUrl = rootUrl.concat('companies[' + i + ']=' + JSON.stringify(this.state.companies[i]) + '&');
     }
     return rootUrl;
   }
   appendCriteriaToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.criteria.length; i++){
       if(i+1 == this.state.criteria.length)
         rootUrl = rootUrl.concat('criteria[' + i + ']=' + this.state.criteria[i] ); //need to escape #
       else
         rootUrl = rootUrl.concat('criteria[' + i + ']=' + this.state.criteria[i] + '&'); //need to escape #
     }
     return rootUrl;
   }
   appendIndividualNamesToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.individualNames.length; i++){
       if(i+1 == this.state.individualNames.length)
         rootUrl = rootUrl.concat('individualNames[' + i + ']=' + this.state.individualNames[i] ); //need to escape #
       else
         rootUrl = rootUrl.concat('individualNames[' + i + ']=' + this.state.individualNames[i] + '&'); //need to escape #
     }
     return rootUrl;
   }
   appendNumCriteriaAndLevels(parentUrl){
     let rootUrl = parentUrl;
     rootUrl = rootUrl.concat('numCriteria=' + this.state.numCriteria + '&' );
     rootUrl = rootUrl.concat('numLevels=' + this.state.numLevels);
     return rootUrl;
   }
   appendMiscStuff(parentUrl){
     let rootUrl = parentUrl;
     rootUrl = rootUrl.concat('useCustomCriteria=' + this.state.useCustomCriteria + '&' );
     rootUrl = rootUrl.concat('useDefaults=' + this.state.useDefaults + '&' );
     rootUrl = rootUrl.concat('lockCriteriaNames=' + this.state.lockCriteriaNames + '&' );
     rootUrl = rootUrl.concat('lockAddCompany=' + this.state.lockAddCompany );
     return rootUrl;
   }

   /*
   lockCriteriaNames: false,
   lockAddCompany: false,
   */

   parseUrlQueryParams(){
     const values = queryString.parse(this.props.urlQueryString, {arrayFormat: 'index'});
     let newState = this.state;

     for(let i=0; i<values.data.length; i++){
       newState.data.push(JSON.parse(values.data[i]));
     }
     for(let i=0; i<values.companies.length; i++){
       newState.companies.push(JSON.parse(values.companies[i]));
     }


     newState.colors = values.colors;
     newState.individualNames = values.individualNames;
     newState.criteria = values.criteria;
     newState.numLevels = values.numLevels;
     newState.numCriteria = values.numCriteria;
     newState.lockCriteriaNames = values.lockCriteriaNames;
     newState.lockAddCompany = values.lockAddCompany;
     newState.useCustomCriteria = values.useCustomCriteria;
     newState.useDefaults = values.useDefaults;

     this.setState(newState);
   }

   /*
    * Tooltip Stuff
    */
    addBusinessTooltip(){
      return(
        <Tooltip id="addBusinessTooltipId">
          Add Business
        </Tooltip>
      );
    }
    addIndividualTooltip(){
      return(
        <Tooltip id="addIndividualsTooltipId">
          Add Individuals/Applicants
        </Tooltip>
      );
    }



    /*
     * React Methods
     */
   componentDidMount() {
     if(this.props.urlQueryString) this.parseUrlQueryParams();
   }











  render() {
    return(
      <Grid>
        <ToastContainer/>
        <Row>
          <Col sm={12}>
            <h3 className="Project-Headers">D3 Radar Chart Demo</h3>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4 className="Project-Headers">Overview</h4>
            <p className="Project-Text">
              This is a brief prototype of a radar chart.
            </p>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <RadarChart data={this.state.data}
              colors={this.state.colors}
              numCriteria={this.state.numCriteria}
              numLevels={this.state.numLevels}
              companies={this.state.companies}/>
            <svg ref={node => this.node = node}
             width={this.state.svg_width} height={this.state.svg_height}>
             {this.generateLegend()}
            </svg>

          </Col>
          <Col sm={5}>
            <Form>
              <Row>
                <FormGroup>
                  <FormControl
                    type="text"
                    name="saveName"
                    placeholder="Profile Name"
                    onChange={(e) => this.handleSaveName(e)}
                    />
                  <FormControl.Feedback />
                </FormGroup>
              </Row>

              <Row>
                <FormGroup
                  controlId="fgNumLevels"
                  validationState={this.get_numLevels_validation()}>
                  <ControlLabel># Levels:</ControlLabel>
                  <FormControl
                    readOnly={this.state.lockCriteriaNames}
                    type="text"
                    name="numLevels"
                    value={this.state.numLevels}
                    placeholder="# Levels"
                    onChange={this.handleGeneralValueChange} />
                  <FormControl.Feedback />
                  <HelpBlock>Must be a positive integer.</HelpBlock>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup>
                  <ButtonGroup justified>
                    <Button href="#" onClick={this.loadCustomCriteriaInputField} disabled={this.state.useCustomCriteria || this.state.useDefaults || this.state.lockCriteriaNames}>Custom</Button>
                    <Button href="#" onClick={this.loadDefaultCriteria} disabled={this.state.useCustomCriteria || this.state.lockCriteriaNames}>Default</Button>
                  </ButtonGroup>
                </FormGroup>
                {this.generateCustomCriteriaNumField()}
              </Row>

              <Row>

                  {this.generateCriteriaInputFields()}

              </Row>

              <Row>
                {this.generateCompanies()}
              </Row>
              <Row>
                {this.generateIndividuals()}
              </Row>
              <Row>
                <FormGroup>
                  <ButtonToolbar>
                    <ButtonGroup>
                      <OverlayTrigger placement="bottom" overlay={this.addBusinessTooltip()}>
                        <Button onClick={this.addCompany} disabled={this.state.lockAddCompany}><Glyphicon glyph="briefcase" /></Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="bottom" overlay={this.addIndividualTooltip()}>
                        <Button onClick={this.addIndividual}><Glyphicon glyph="user" /></Button>
                      </OverlayTrigger>
                    </ButtonGroup>
                  </ButtonToolbar>
                </FormGroup>
              </Row>

            </Form>
          </Col>
          <Col sm={1}>
            <Row>
              <ButtonToolbar>
                <ButtonGroup bsSize="small">
                  <DropdownButton title="Menu" id="bg-vertical-dropdown-1">
                    <MenuItem eventKey="1" onClick={this.saveData}><Glyphicon glyph="floppy-disk" /> Save</MenuItem>
                    <MenuItem eventKey="2" onClick={this.handleShowLoadModal}><Glyphicon glyph="cloud-upload" /> Load</MenuItem>
                    <MenuItem eventKey="3" onClick={this.handleShowDownloadModal}><Glyphicon glyph="download-alt" /> Download</MenuItem>
                    <MenuItem eventKey="4" onClick={this.handleShowImportModal}><Glyphicon glyph="cloud-upload" /> Import</MenuItem>
                  </DropdownButton>
                </ButtonGroup>
              </ButtonToolbar>
            </Row>
            <Row>

                <ButtonToolbar className="social_media_links">
                  <ButtonGroup>
                    <FacebookShareButton
                      url={this.generateUrlQueryString()}
                      quote={this.state.smTitle}
                      className="Demo__some-network__share-button">
                      <FacebookIcon
                        size={50}
                        square />
                    </FacebookShareButton>

                    <LinkedinShareButton
                      url={this.generateUrlQueryString()}
                      quote={this.state.smTitle}
                      className="Demo__some-network__share-button">
                      <LinkedinIcon
                        size={50}
                        square />
                    </LinkedinShareButton>

                    <TwitterShareButton
                      url={this.generateUrlQueryString()}
                      quote={this.state.smTitle}
                      className="Demo__some-network__share-button">
                      <TwitterIcon
                        size={50}
                        square />
                    </TwitterShareButton>

                    <TumblrShareButton
                      url={this.generateUrlQueryString()}
                      quote={this.state.smTitle}
                      className="Demo__some-network__share-button">
                      <TumblrIcon
                        size={50}
                        square />
                    </TumblrShareButton>
                  </ButtonGroup>
                </ButtonToolbar>
            </Row>
          </Col>
        </Row>

        <Modal show={this.state.showModalForLoad} onHide={this.handleCloseForLoadModal}>
          <Modal.Header closeButton>
            <Modal.Title>Load Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Loading Data...</h4>
            <p>
              Please select the profile you wish to load and click 'Load'.
            </p>
            <hr />
            <h4>Saved Profiles</h4>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              {this.wrapperForLoadDeleteDownloadSelect()}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.loadData}>Load</Button>
              <Button onClick={this.deleteData}>Delete</Button>
              <Button onClick={this.handleCloseForLoadModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalForDownload} onHide={this.handleCloseForDownloadModal}>
          <Modal.Header closeButton>
            <Modal.Title>Download Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Downloading Data...</h4>
            <p>
              Please select the profile you wish to download.
            </p>
            <hr />
            <h4>Saved Profiles</h4>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              {this.wrapperForLoadDeleteDownloadSelect()}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.downloadData}>Download</Button>
              <Button onClick={this.handleCloseForDownloadModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalForImport} onHide={this.handleCloseForImportModal}>
          <Modal.Header closeButton>
            <Modal.Title>Import Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Importing Data...</h4>
            <p>
              Please select the file you wish to import.
            </p>
            <hr />
            <h4>Load File</h4>
            <FormGroup controlId="formControlsLoadFile">
              <FormControl
                accept='.json'
                onChange={this.handleImportData}
                label="File"
                type="file"
                name="fileToImport" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.importData}>Import</Button>
              <Button onClick={this.handleCloseForImportModal}>Close</Button>
          </Modal.Footer>
        </Modal>

      </Grid>
    );
  }
}

export default RadarChartDemo;
