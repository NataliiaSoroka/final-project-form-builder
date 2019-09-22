import React from 'react';
import {
  List,
  ListItem,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { update } from 'ramda';
import Field from './field';
import { bindActionCreators } from 'redux';
import { updateForm, createForm } from '../../modules/forms/thunks'
import { withStyles } from '@material-ui/styles';

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
            name: '',
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

  onChangeFormName(e) {
    const value = e.target.value
    this.setState({
      form: {
        ...this.state.form,
        name: value
      }
    })
  }

  async saveForm() {
    const payload = this.state.form;
    const id = this.state.form.id
    const data = this.state.isCreate
      ? await this.props.createForm(payload)
      : await this.props.updateForm(id, payload);
    if (data) {
      this.props.goToBack()
    }
  }

  render() {
    const { classes } = this.props
    return (
      <form>
        <TextField 
          value={this.state.form.name} 
          onChange={e => this.onChangeFormName(e)}></TextField>
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
      createForm,
      goToBack: () => push('/')
    },
    dispatch
)
const Component = withStyles(styles)(FormBuilder)

export default connect(
  null,
  mapDispatchToProps
)(Component)
