import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormById } from '../../modules/forms/thunks';
import { setfillToForm } from '../../modules/fills/thunks';

class FillForm extends React.Component {
    componentDidMount() {
        const { getFormById, id } = this.props;
        getFormById(id);
    }
    render() {
        const { currentForm } = this.props;
        console.log(currentForm)
        const val = currentForm === undefined ? 'loading...' : currentForm.toString()
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
      setfillToForm
    },
    dispatch
  )

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FillForm)