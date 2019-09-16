import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { update } from 'ramda'
import Field from './field'
import Button from '@material-ui/core/Button'
import { bindActionCreators } from 'redux'
import Grid from '@material-ui/core/Grid'
import { updateForm } from '../../modules/forms/thunks'
import { withStyles } from '@material-ui/styles';
// import classes from '*.module.css'

const styles ={
  indent: {
    margin: '10px 0'
  }
}

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

  async saveForm() {
    const data = await this.props.updateForm(this.state.form.id);
    if (data) {
      this.props.goToBack()
    }
  }

  render() {
    const { classes } = this.props
    return (
      <form>
        {
          <List>
            {this.state.form.fields.map((input, index) => {
              return (
                <ListItem className={classes.indent} key={index}>
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
        className={classes.indent}
          variant="contained"
          color="primary"
          disabled={this.state.form.fields.length >= 15}
          onClick={() => this.addField()}>
          Add field
        </Button>
        
        <Grid container spacing={5} className={classes.indent}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.saveForm()}
            >
              Save form
            </Button>
          </Grid>
          <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.props.goToBack()}>
            Cancel
          </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { 
      updateForm,
      goToBack: () => push('/')
    },
    dispatch
)
const Component = withStyles(styles)(FormBuilder)

export default connect(
  null,
  mapDispatchToProps
)(Component)
