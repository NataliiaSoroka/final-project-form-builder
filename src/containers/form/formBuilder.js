import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { prop, update } from 'ramda'
import Field from './field'
import Button from '@material-ui/core/Button'

const typeOptions = ['dropdown', 'checkmark', 'text', 'number']

class FormBuilder extends React.Component {
  constructor(props) {
    super(props)
    const { currentForm } = this.props
    this.state = currentForm
      ? {
          isCreate: false,
          form: currentForm
        }
      : {
          isCreate: true,
          form: {
            fields: []
          }
        }
  }
  // componentDidMount() {
  //    const { currentForm } = this.props
  //    if (currentForm) {
  //        this.setState({
  //            ...this.state,
  //            isCreate: false,
  //            form: currentForm
  //        })
  //    } else {
  //        this.setState({
  //            ...this.state,
  //            isCreate: true
  //        })
  //    }
  // }
  fieldUpdate(index) {
    return field =>
      this.setState({
        form: {
          ...this.state.form,
          fields: update(index, field, this.state.form.fields)
        }
      })
  }
  addField() {
    this.setState({
      form: {
        ...this.state.form,
        fields: [
          ...this.state.form.fields,
          { type: 'text', name: '', label: '', placeholder: '' }
        ]
      }
    })
  }

  goToBack() {
    push('/')
  }

  render() {
    return (
      <form>
        {
          <List>
            {this.state.form.fields.map((input, index) => {
              return (
                <ListItem key={index}>
                  <Field
                    fieldData={input}
                    fieldUpdate={this.fieldUpdate(index)}
                  />
                </ListItem>
              )
            })}
          </List>
        }
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.addField()}>
          Add field
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.props.goToBack()}>
          Cancel
        </Button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  goToBack: () => dispatch(push('/'))
})

export default connect(
  null,
  mapDispatchToProps
)(FormBuilder)
