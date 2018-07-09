import React from 'react';
import PropTypes from 'prop-types';

const CustumerActions = ({children}) => {
  return (
    <div>
      <div className="customer-actions">
        <div>{children}</div>
      </div>
    </div>
  );
};

CustumerActions.propTypes = {
  children:PropTypes.node,
};

export default CustumerActions;