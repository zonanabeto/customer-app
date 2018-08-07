import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  {SubmissionError} from 'redux-form';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../redux/selectors/customers';
import {Route ,withRouter}  from 'react-router-dom'
import CustomerEdit from '../components/CustomerEdit';
import CustumerData from '../components/CustumerData';
import {fetchCustomers} from '../redux/actions/fetchCustomers';
import {updateCustomer} from '../redux/actions/updateCustomer';
import {deleteCustomer} from '../redux/actions/deleteCustomer';

class CustomerContainer extends Component {
  componentDidMount(){
    if(!this.props.customer){
      this.props.fetchCustomers();
    }
  }

  handleSubmit = values => {
    console.log(JSON.stringify(values));
    const { id } = values;
    return this.props.updateCustomer(id,values).then(r => {
      if(r.error){
        throw new SubmissionError(r.payload)
      }
    });
  }

  handleOnBack = () => {
    this.props.history.goBack();
  }

  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  }

  handleOnDelete = id => {
    this.props.deleteCustomer(id)
    .then(v=> {
      this.props.history.goBack();
    });
  }
  
  renderCustomerControl = (isEdit, isDelete) => {
    if(this.props.customer){
      const CustomerControl = isEdit ? CustomerEdit : CustumerData;
  return <CustomerControl {...this.props.customer}  
      onSubmit={this.handleSubmit} 
      onBack={this.handleOnBack}
      onSubmitSuccess={this.handleOnSubmitSuccess}
      isDeleteAllow={!!isDelete}
      onDelete={this.handleOnDelete} /> 
  }
  return null;
  }
 
 renderBody = () =>(
    <Route path='/customers/:dni/edit' children={
      ( { match: isEdit } ) => (
        <Route path='/customers/:dni/del' children={
          ( {match: isDelete} ) => ( this.renderCustomerControl(isEdit,isDelete))
      } /> )
      }/>
    );

  //{<p>Datos del cliente "{this.props.customer.name}" </p>
  render() {
    return (
      <div>
        <AppFrame header={`Cliente ${this.props.dni} `} 
        body={this.renderBody()}/>
      </div>
    );
  }
}

CustomerContainer.propTypes = {
  dni:PropTypes.string.isRequired,
  customer:PropTypes.object,
  fetchCustomers:PropTypes.func.isRequired,
  updateCustomer:PropTypes.func.isRequired,
  deleteCustomer:PropTypes.func.isRequired,
};

const mapStateToProps = (state,props) => ({
  customer:getCustomerByDni(state,props)
})

export default withRouter(connect(mapStateToProps,{
  fetchCustomers,
  updateCustomer,
  deleteCustomer
})(CustomerContainer));