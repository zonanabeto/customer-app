import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';

const isRequired = value => (
  !value && 'Este campo es requerido'
);

const validate = values => {
  const error = {};
  if(!values.name){
    error.name = 'El campo nombre es requerido'
  }
  if(!values.dni){
    error.dni= 'El dni es un campo obligatorio'
  }
  return error;
}

const isNumber = value => (
  isNaN(Number(value)) && 'El campo debe ser un numero'
);

const myField =  ({input,meta, type, label,name}) => (
  <div>
    <label htmlFor={name} >{label}</label>
    <input {...input} type={!type ?"text":type}/>
    {
     meta.touched && meta.error && <span>{meta.error}</span>
    }
    
  </div>
)

const CustomerEdit = ({name,dni,age}) => {

  return (
    <div>
      <h2>Edicion del cliente</h2>
      <form action="">
          <Field 
            name='name'  
            component={myField} 
            validate={isRequired}
            label='Nombre' >
          </Field>
          <Field 
            name='dni'  
            component={myField}

            label='Dni' >
          </Field>
          <Field 
            name='age'  
            component={myField}  
            validate={isNumber} 
            label='Edad' >
          </Field>
      </form>
      <h3>Nombre: {name} / DNI: {dni} / Edad: {age}</h3>
    </div>
  );
};

CustomerEdit.propTypes = {
  name:PropTypes.string,
  dni:PropTypes.string,
  age:PropTypes.number,
};

const CustomerEditForm=reduxForm( {
  form:'CustomerEdit',
  validate,
})(CustomerEdit);

export default  setPropsAsInitial(CustomerEditForm);