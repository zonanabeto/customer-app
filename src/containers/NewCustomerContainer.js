import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import {insertCustomer} from '../redux/actions/insertCustomer'


class NewCustomerContainer extends Component {

  handleSubmit = values => {
    return this.props.insertCustomer(values).then(r => {
      if(r.error){
        throw new SubmissionError(r.payload)
      }
    });
  }

  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  }

  handleOnBack = () => {
    this.props.history.goBack();
  }

  renderBody=()=>{
    return <CustomerEdit onSubmit={this.handleSubmit}
              onSubmitSuccess={this.handleOnSubmitSuccess}
              onBack={this.handleOnBack}/>
  }

  render() {
    return (
      <div>
        <AppFrame header={`Creacion del cliente`} 
          body={this.renderBody()} />
      </div>
    );
  }
}

NewCustomerContainer.propTypes = {
  insertCustomer:PropTypes.func.isRequired,
};

export default  withRouter(connect(null,{insertCustomer})(NewCustomerContainer));