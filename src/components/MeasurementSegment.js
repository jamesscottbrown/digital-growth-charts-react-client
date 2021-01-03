// React
import React from "react";
import { Component } from "react";

// Semantic UI React
import { Grid, Segment, Message, Flag, Tab, Menu, Dropdown, Button, Table } from "semantic-ui-react";
import ChartData from '../api/Chart'
import MeasurementForm from "../components/MeasurementForm";
import '../index.css'

class MeasurementSegment extends Component {

      constructor(props){
        super(props)

        // const dummyData=[{birth_data:{birth_date:"Wed, 28 Jan 2015 00:00:00 GMT",estimated_date_delivery:null,estimated_date_delivery_string:null,gestation_days:0,gestation_weeks:40,sex:"male"},child_observation_value:{measurement_method:"height",observation_value:110},measurement_calculated_values:{centile:13,centile_band:"This height measurement is between the 9th and 25th centiles.",measurement_method:"height",sds:-1.117076305831875},measurement_dates:{chronological_calendar_age:"5 years, 10 months and 4 weeks",chronological_decimal_age:5.9110198494182065,clinician_decimal_age_comment:"Born Term. No correction necessary.",corrected_calendar_age:null,corrected_decimal_age:5.9110198494182065,corrected_gestational_age:{corrected_gestation_days:null,corrected_gestation_weeks:null},lay_decimal_age_comment:"At 40+0, your child is considered to have been born at term. No age adjustment is necessary.",observation_date:"Sat, 26 Dec 2020 00:00:00 GMT"}}]

        this.state = {
          measurementMethod: "height",
          reference: "uk-who",
          sex: "male",
          chartStyle: this.returnChartStyle('#ffffff'),
          axisStyle: this.returnAxisStyle("#000000", 'sans', '#000000'),
          centileStyle: this.returnCentileStyle("#000000", 0.5),
          gridlines: false,
          gridlineStyle: this.returnGridlineStyle(0.25, "#D9D9D9", false),
          measurementStyle: this.returnMeasurementStyle("#000000", "1", "circle"),
          heights: [],
          weights: [],
          ofcs: [],
          bmis: [],
          theme: 'simple',
          activeIndex: 0, //set tab to height
          flip: false // flag to determine if results or chart showing
        }

        this.handleResults = this.handleResults.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleChangeTheme = this.handleChangeTheme.bind(this)
        this.handleFlipResults = this.handleFlipResults.bind(this)
        this.returnMeasurementArray = this.returnMeasurementArray.bind(this)
        this.units = this.units.bind(this)
      }
  
  handleRangeChange = (e) => this.setState({ activeIndex: e.target.value })
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  handleResults(results){
    // delegate function from MeasurementForm
    // receives measurement results and passes them back to API
    // to receive plottable child
    
    const measurementMethod = results[0].child_observation_value.measurement_method
    const sex = results[0].birth_data.sex
    this.setState({measurementMethod: measurementMethod})
    this.setState({sex: sex})
    
    let measurementsArray = []
    let concatenated = []
    
    switch (measurementMethod){
      case ('height'):
        measurementsArray = this.state.heights
        concatenated = measurementsArray.concat(results)
        this.setState({heights: concatenated})
        this.setState({activeIndex: 0}) // move focus to height tab
        break
      case ('weight'):
        measurementsArray = this.state.weights
        concatenated = measurementsArray.concat(results)
        this.setState({weights: concatenated})
        this.setState({activeIndex: 1}) // move focus to weight tab
        break
      case ('bmi'):
        measurementsArray = this.state.bmis
        concatenated = measurementsArray.concat(results)
        this.setState({bmis: concatenated})
        this.setState({activeIndex: 2}) // move focus to bmi tab
        break
      case ('ofc'):
        measurementsArray = this.state.ofcs
        concatenated = measurementsArray.concat(results)
        this.setState({bmis: concatenated})
        this.setState({activeIndex: 3}) // move focus to ofc tab
        break
      default:
        concatenated = []
    }

    this.returnNewChart(
      measurementMethod, concatenated, 
      this.state.chartStyle, 
      this.state.axisStyle, 
      this.state.gridlines, 
      this.state.gridlineStyle, 
      this.state.centileStyle, 
      this.state.measurementStyle)

    /*
    return object structure
    [
      {
        birth_data: {
          birth_date: ...,
          estimated_date_delivery: ....,
          estimated_date_delivery_string: ...,
          gestation_weeks: ...,
          gestation_days: ...,
          sex: ...
        },
        child_observation_value: {
          measurement_method: ....,
          measurement_value: ...
        },
        child_measurement_dates: {
          chronological_calendar_age: ...,
          chronological_decimal_age: ...,
          clinician_decimal_age_comment: ...,
          corrected_calendar_age: ...,
          corrected_decimal_age: ...,
          corrected_gestational_age: {
            corrected_gestation_weeks: ...,
            corrected_gestatin_days: ...
          },
          lay_decimal_age_comment: ...,
          observation_date: ...
        },
        measurement_calculated_values: {
          centile: ...,
          measurement_method: ...,
          sds: ...,
          centile_band: ...
        }
      }
    ]
    */

  }

  returnNewChart(
    measurementMethod, 
    measurementsArray, 
    chartStyle, 
    axisStyle, 
    gridlines, 
    gridlineStyle, 
    centileStyle, 
    measurementStyle){
    
    const Chart = (
      <ChartData
            key={measurementMethod + "-" + this.state.reference}
            reference={this.state.reference} //the choices are ["uk-who", "turner", "trisomy21"] REQUIRED
            sex={this.state.sex} //the choices are ["male", "female"] REQUIRED
            measurementMethod={measurementMethod} //the choices are ["height", "weight", "ofc", "bmi"] REQUIRED
            measurementsArray = {measurementsArray}  // an array of Measurement class objects from dGC Optional
            // measurementsSDSArray = {[]} // an array of SDS measurements for SDS charts Optional: currently not implemented: pass []
            chartBackground={chartStyle.backgroundColour}
            gridlineStroke={gridlineStyle.stroke}
            gridlineStrokeWidth={gridlineStyle.strokeWidth}
            gridlineDashed={gridlineStyle.dashed}
            gridlines={gridlines}
            centileStroke={centileStyle.stroke}
            centileStrokeWidth={centileStyle.strokeWidth}
            axisStroke={axisStyle.stroke}
            axisLabelFont={axisStyle.labelFont}
            axisLabelColour={axisStyle.labelColour}
            measurementFill={measurementStyle.fill}
            measurementSize={measurementStyle.size}
            measurementShape={measurementStyle.shape}
      />
    )
    return Chart
  }

  returnCentileStyle(stroke, strokeWidth){
    const centileStyle = {
      stroke: stroke,
      strokeWidth: strokeWidth
    }
    return centileStyle
  }

  returnGridlineStyle(strokeWidth, stroke, dashed){
    const gridlineStyle = {
      strokeWidth: strokeWidth,
      stroke: stroke,
      dashed: dashed
    }
    return gridlineStyle
  }

  returnMeasurementStyle(fill, size, shape){
    const measurementStyle = {
      fill: fill,
      size: size,
      shape: shape
    }
    return measurementStyle
  }

  returnAxisStyle(stroke, labelFont, labelColour){
    let axisStyle = {
      stroke: stroke,
      labelFont: labelFont,
      labelColour: labelColour
    }
    return axisStyle
  }

  returnChartStyle(backgroundColour){
      const chartStyle = {
        backgroundColour: backgroundColour
      }
      return chartStyle
  }

  handleChangeTheme(event, {value}){

    let axisStyle
    let measurementStyle 
    let gridlineStyle 
    let chartStyle
    let centileStyle
    let gridlines

    
    if (value === 'trad'){
          // girl 201 85 157 - #c9559d
          // boy 0 163 222 - #00a3de
      if (this.state.sex === 'male'){
        // this.setState({ centilesColour: '#00a3de' }, { chartBackground: 'white'})
        axisStyle = this.returnAxisStyle("#D9D9D9", 'sans', '#000000')
        centileStyle = this.returnCentileStyle("#00a3de", 0.5)
        gridlines = true
        gridlineStyle = this.returnGridlineStyle(0.25, "#ECECEC")
        measurementStyle = this.returnMeasurementStyle("#000000", "1", "circle")
        chartStyle = this.returnChartStyle('#FFFFFF')
        
      } else {
        axisStyle = this.returnAxisStyle("#D9D9D9", 'sans', '#000000')
        centileStyle = this.returnCentileStyle("#c9559d", 0.5)
        gridlines = true
        gridlineStyle = this.returnGridlineStyle(0.25, "#ECECEC")
        measurementStyle = this.returnMeasurementStyle("#000000", "1", "circle")
        chartStyle = this.returnChartStyle('#ffffff')
      }
    }
    if (value === "colour"){
      if (this.state.sex === 'male'){
        axisStyle = this.returnAxisStyle("#cbe896", 'sans', '#cbe896')
        centileStyle = this.returnCentileStyle("#ff7f11", 0.5)
        gridlines = true
        gridlineStyle = this.returnGridlineStyle(0.25, "#beb7a4")
        measurementStyle = this.returnMeasurementStyle("#cbe896", "1", "circle")
        chartStyle = this.returnChartStyle('#eaf2e3')
      } else {
        axisStyle = this.returnAxisStyle("#cbe896", 'sans', '#cbe896')
        centileStyle = this.returnCentileStyle("#ff1b1c", 0.5)
        gridlines = true
        gridlineStyle = this.returnGridlineStyle(0.25, "#beb7a4")
        measurementStyle = this.returnMeasurementStyle("#cbe896", "1", "circle")
        chartStyle = this.returnChartStyle('#eaf2e3')
      }
    }
    if (value === 'simple'){
      axisStyle = this.returnAxisStyle("#000000", 'sans', '#000000')
      centileStyle = this.returnCentileStyle("#000000", 0.5)
      gridlines = false
      gridlineStyle = this.returnGridlineStyle(0.25, "#D9D9D9", false)
      measurementStyle = this.returnMeasurementStyle("#000000", "1", "circle")
      chartStyle = this.returnChartStyle('#f8f8f8')
    }
    this.returnNewChart(
      this.state.measurementMethod, 
      this.state.measurementsArray, 
      chartStyle, 
      axisStyle, 
      gridlines, 
      gridlineStyle,
      centileStyle,
      measurementStyle)

    this.setState({centileStyle: centileStyle})
    this.setState({chartStyle: chartStyle})
    this.setState({measurementStyle: measurementStyle})
    this.setState({axisStyle: axisStyle})
    this.setState({gridlines: gridlines})
    this.setState({theme: value})

  }

  handleFlipResults(){
    const flipped = this.state.flip
    this.setState({flip: !flipped})
  }

  units(measurementMethod){
    if (measurementMethod === "height"){
      return "cm"
    }
    if (measurementMethod === "weight"){
      return "kg"
    }
    if (measurementMethod === "bmi"){
      return "kg/m²"
    }
    if (measurementMethod === "ofc"){
      return "cm"
    }
    
  }

  returnMeasurementArray(measurementMethod){
    switch (measurementMethod.selectedMeasurement) {
      case "height":
        return this.state.heights
      case "weight":
        return  this.state.weights
      case "bmi":
        return  this.state.bmis
      case "ofc":
        return  this.state.ofcs
      default:
        return
    }
  }

test(param){
  console.log(param);
  return param
}

  render(){

    const panes = [
      { menuItem: "Height", 
        render: () => <Tab.Pane attached={"top"}>{
          this.returnNewChart(
            "height", 
            this.state.heights, 
            this.state.chartStyle, 
            this.state.axisStyle,
            this.state.gridlines,
            this.state.gridlineStyle,
            this.state.centileStyle,
            this.state.measurementStyle
            )
        }</Tab.Pane> },
      { menuItem: "Weight",
        render: () => <Tab.Pane attached={"top"}>{
          this.returnNewChart(
            "weight", 
            this.state.weights,
            this.state.chartStyle, 
            this.state.axisStyle,
            this.state.gridlines,
            this.state.gridlineStyle,
            this.state.centileStyle,
            this.state.measurementStyle
            )}
          </Tab.Pane> },
      { menuItem: "BMI", 
        render: () => <Tab.Pane attached={"top"}>
        {this.returnNewChart(
            "bmi", 
            this.state.bmis,
            this.state.chartStyle, 
            this.state.axisStyle,
            this.state.gridlines,
            this.state.gridlineStyle,
            this.state.centileStyle,
            this.state.measurementStyle
        )},
        </Tab.Pane> },
      { menuItem: "Head Circumference", render: () => <Tab.Pane attached={"top"}>
        {this.returnNewChart(
          "ofc", 
          this.state.ofcs, 
          this.state.chartStyle, 
          this.state.axisStyle,
          this.state.gridlines,
          this.state.gridlineStyle,
          this.state.centileStyle,
          this.state.measurementStyle
        )},
        </Tab.Pane> },
    ];
  
    const TabPanes = () => <Tab menu={{ attached: 'top' }} panes={panes} activeIndex={activeIndex}
    onTabChange={this.handleTabChange}/>

    const themeOptions = [{ key: 'trad', value: 'trad', text: 'Traditional' },{ key: 'colour', value: 'colour', text: 'Energy' }, { key: 'simple', value: 'simple', text: 'Simple' }]

    const ThemeSelection = () => (
      <Menu compact className="selectUpperMargin">
        <Dropdown text='Theme' options={themeOptions} simple item onChange={this.handleChangeTheme}/>
      </Menu>
    )
    
    const ResultsSegment = (selectedMeasurement) => (
      <Segment>
          <Table basic="very" celled collapsing compact>
              <Table.Header>
              <Table.Row>
                  <Table.HeaderCell>Heights</Table.HeaderCell>
                  <Table.HeaderCell>Results</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
          { this.returnMeasurementArray(selectedMeasurement).map((measurement,index) => { 
            return (<Table.Body key={index}>
              
                <Table.Row>
                  <Table.Cell>
                    Chronological Age
                  </Table.Cell>
                  <Table.Cell>
                    {measurement.measurement_dates.chronological_calendar_age}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Measurement
                  </Table.Cell>
                  <Table.Cell>
                    {measurement.child_observation_value.observation_value} {this.units(measurement.child_observation_value.measurement_method)}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    SDS
                  </Table.Cell>
                  <Table.Cell>
                    {Math.round(measurement.measurement_calculated_values.sds*1000)/1000}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Centile
                  </Table.Cell>
                  <Table.Cell>
                    {measurement.measurement_calculated_values.centile}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Observation
                  </Table.Cell>
                  <Table.Cell>
                    {measurement.measurement_calculated_values.centile_band}
                  </Table.Cell>
                </Table.Row>
              
                </Table.Body>)})}
              </Table>
            </Segment>
    )

    const { activeIndex } = this.state
  
    return (
      
      <Grid centered stackable>
        <Grid.Column width={5}>
          <Segment raised>
            <Message>
              <Flag name="gb" />
              This calculator uses the UK-WHO references to calculate gold
              standard accurate child growth parameters. In the future we are
              planning to add other growth references such as specialist Trisomy
              21 and Turner's Syndrome references, CDC and WHO.
            </Message>
  
            <Message color="red">
              This site is under development. No responsibility is accepted for
              the accuracy of results produced by this tool.
            </Message>
          </Segment>
        </Grid.Column>
  
        <Grid.Column width={5}>
          <Segment raised>
            <MeasurementForm measurementResult={this.handleResults} className="measurement-form" />
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment raised>
          {this.state.flip ? <ResultsSegment selectedMeasurement={this.state.measurementMethod}/> : <TabPanes/>}
            <Grid.Row>
              <ThemeSelection />
              <Button floated="right" className="selectUpperMargin" onClick={this.handleFlipResults}>Results</Button>
            </Grid.Row>
          </Segment>
          
        </Grid.Column>
      </Grid>
    );

  }

  
}

export default MeasurementSegment;
