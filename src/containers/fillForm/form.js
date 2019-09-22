import React from 'react';
import Field from './field';
import { setfillToForm } from '../../modules/fills/thunks';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            formValues: {}
        }
    }
    handlerChange(name) {
        return value => {
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    [name]: value
                }
            })
        }
    }
    saveForm(){
        const id = this.props.form.id
        const payload = {
            fields: this.state.formValues
        }
        this.props.setfillToForm(id, payload)
    }

    render() {
        const { fields, name } = this.props.form
        return (
            <form>
                <h3>{name}</h3>
                { 
                    fields.map(row => <Field input={row} key={row.name} handlerChange={this.handlerChange(row.name)}/>)
                }
                <Button color="primary" onClick={() => this.saveForm()}>Save form</Button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setfillToForm
    },
    dispatch
  )

  export default connect(
    null,
    mapDispatchToProps
  )(Form)

// export default Form;