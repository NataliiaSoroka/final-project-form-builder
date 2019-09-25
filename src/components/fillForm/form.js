import React from 'react'
import Field from './field'
import { setfillToForm } from '../../modules/fills/thunks'
import { setMessage, setStatePopup, setStatus } from '../../modules/popup/actions';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from '@material-ui/core/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { number, string, boolean, object } from 'yup'
import { isNil, path } from 'ramda'

const styles = {
  card: {
    minWidth: 500
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formValues: {}
    }
  }

  componentDidMount() {
    this.generateDefaultValues()
  }

  generateDefaultValues() {
    const fields = this.props.form.fields || []
    const formValues = fields.reduce((form, field) => {
      const defaultValuesMap = {
        checkmark: false,
        text: '',
        dropdown: path(['items', field.default, 'value'], field)
      }
      const defaultVal = defaultValuesMap[field.type]
      return isNil(defaultVal) ? form : { ...form, [field.name]: defaultVal }
    }, {})
    this.setState({ formValues })
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

  saveForm() {
    const schema = this.createValidationSchema()
    const {
        setMessage,
        setStatePopup,
        setStatus,
        form: { id }
      } = this.props

    schema
      .validate(this.state.formValues)
      .then(formValues => {
        const payload = {
            fields: formValues
        }
        this.props.setfillToForm(id, payload)
      })
      .catch(err => {
        setMessage(err.message)
        setStatePopup(true)
        setStatus(true)
      })

  }

  createValidationSchema() {
    const fields = this.props.form.fields || []
    const getValidator = type => {
      const validatorsTypeMap = {
        text: string().required(),
        number: number().required(),
        checkmark: boolean(),
        dropdown: string().required()
      }
      return validatorsTypeMap[type]
    }
    const shape = fields.reduce(
      (s, field) => ({
        ...s,
        [field.name]: getValidator(field.type)
      }),
      {}
    )
    return object().shape(shape)
  }

  render() {
    const formData = this.props.form || {}
    const { fields = [], name = '' } = formData
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <form>
          <CardHeader title={name} />
          <CardContent>
            {fields.map(row => (
              <Field
                input={row}
                key={row.name}
                handlerChange={this.handlerChange(row.name)}
              />
            ))}
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={() => this.saveForm()}>
              Save form
            </Button>
          </CardActions>
        </form>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setfillToForm,
      setMessage,
      setStatePopup,
      setStatus
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Form))
