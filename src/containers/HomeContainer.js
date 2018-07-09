import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import CustomerActions from '../components/CustumerActions';

class HomeContainer extends Component {

  handleOnClick = () => {
    console.log('handleOnClick');
    this.props.history.push('/customers');
  }

  render() {
    return (
      <div>
        <AppFrame
          header='Home'
          body={
            <div>
              Esta es la pantalla inicial
              <CustomerActions>
                <button onClick={this.handleOnClick} >Listado de clientes</button>
              </CustomerActions>
            </div>
          } />
      </div>
    );
  }
}

HomeContainer.propTypes = {

};

export default withRouter(HomeContainer);