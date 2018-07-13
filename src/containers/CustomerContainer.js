import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../redux/selectors/customers';
import {Route}  from 'react-router-dom'
import CustomerEdit from '../components/CustomerEdit';
import CustumerData from '../components/CustumerData'

class CustomerContainer extends Component {
 renderBody = () =>(
    <Route path='/customers/:dni/edit' children={
      ( { match } ) => {
        const CustomerControl = match ? CustomerEdit : CustumerData;
        return <CustomerControl initialValues={this.props.customer} /> 
       }
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
  customer:PropTypes.object.isRequired,
};

const mapStateToProps = (state,props) => ({
  customer:getCustomerByDni(state,props)
})

export default connect(mapStateToProps,null)(CustomerContainer);