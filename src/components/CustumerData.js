import React from 'react';
import PropTypes from 'prop-types';

const CustumerData = ({name,dni,age}) => {
  return (
    <div>
      <div className="customer-data">
        <h2>Datos del Cliente</h2>
        <div><strong>Nombre: </strong> <i>{name}</i> </div>
        <div><strong>DNI: </strong> <i>{dni}</i> </div>
        <div><strong>Edad: </strong> <i>{age}</i> </div>
      </div>
    </div>
  );
};

CustumerData.propTypes = {
  name:PropTypes.string.isRequired,
  dni:PropTypes.string.isRequired,
  age:PropTypes.number,
};

export default CustumerData;