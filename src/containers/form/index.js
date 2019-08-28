import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormById } from '../../modules/forms/thunks';
import { getFormById as setFormValue } from '../../modules/forms/actions';
import FormBuilder from './formBuilder'

class Form extends React.Component {
  componentDidMount() {
    const { getFormById, id } = this.props
      getFormById(id);
      this.isCreate = false;
  }
  componentWillUnmount() {
        this.props.setFormValue(undefined)
  }
 render() {
   const { currentForm } = this.props
  const val = currentForm === undefined ? 'loading...' : <FormBuilder currentForm={currentForm}/>
   return (
    <div>
      <h1>Form Page</h1>
      <p>{this.props.id}</p>
      <div>
        {val}
      </div>
    </div>
   )
 }
}


const mapStateToProps = (
  { forms: { currentForm } },
  { match: { params: { id } } }
  ) => {
  return {
      id,
      currentForm
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {  
      getFormById,
      setFormValue
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
