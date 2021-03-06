import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormById } from '../modules/forms/thunks';
import { getFormById as setFormValue } from '../modules/forms/actions';
import FormBuilder from '../components/formCreateUpdate/formBuilder'

class Form extends React.Component {
  componentDidMount() {
    const { getFormById, id, setFormValue } = this.props;
    if (id === 'new') {
      setFormValue(null);
    } else {
      getFormById(id);
    }
  }
  componentWillUnmount() {
        this.props.setFormValue(undefined)
  }
  render() {
    const { currentForm } = this.props
    const val = currentForm === undefined ? 'loading...' : <FormBuilder currentForm={currentForm}/>
    return (
      <div>
        { val }
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
