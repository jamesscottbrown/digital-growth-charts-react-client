import React, { Component } from "react";
import { Container, Header, Grid } from "semantic-ui-react";
import MeasurementForm from '../components/MeasurementForm';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Home extends Component {
  state = {
    formData: {}
  }

  handleFormData = async(formDataArray) => {
    this.setState({
      formData: formDataArray
    });

    let resultsPromiseArray=[];

    formDataArray.forEach(formData => {
      let axiosFormData = new FormData()
      axiosFormData.append("birth_date", formData.birth_date);
      axiosFormData.append("observation_date", formData.observation_date);
      axiosFormData.append("sex", formData.sex);
      axiosFormData.append("gestation_weeks", formData.gestation_weeks);
      axiosFormData.append("gestation_days", formData.gestation_days);
      axiosFormData.append("measurement_method", formData.measurement_method);
      axiosFormData.append("observation_value", formData.observation_value);

      const centile = this.fetchCentilesForMeasurement(axiosFormData);

      resultsPromiseArray.push(centile);
      
    });
    Promise.all(resultsPromiseArray).then((result)=>{
      var mergedMeasurementArrays = [].concat.apply([], result);
      this.props.history.push({pathname: '/results', data:{calculations: mergedMeasurementArrays}});
    })
    // TODO #1 needs a catch statement
    
     
  }

  async fetchCentilesForMeasurement(payload){
    const response = await axios({
      url: `${process.env.REACT_APP_GROWTH_API_BASEURL}/uk-who/calculation`,
      data: payload,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  render() {
    return (
      <Container>
        <Header as='h1'>
          RCPCH Growth Charts
        </Header>
        <Grid centered>
          <Grid.Column width={12}>
            <MeasurementForm onSubmitMeasurement={this.handleFormData}/>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(Home);