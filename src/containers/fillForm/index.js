import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormById } from '../../modules/forms/thunks';
import Form from './form';

class FillForm extends React.Component {
    componentDidMount() {
        const { getFormById, id } = this.props;
        getFormById(id);
    }
    render() {
        const { currentForm } = this.props;
        const val = currentForm === undefined ? 'loading...' : <Form form={currentForm} />
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
      getFormById
    },
    dispatch
  )

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FillForm)