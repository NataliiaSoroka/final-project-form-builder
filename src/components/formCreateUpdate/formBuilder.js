import React from 'react'
import {
  List,
  ListItem,
  TextField,
  Button,
  Card,
  Box,
  Grid
} from '@material-ui/core'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { update, remove } from 'ramda'
import Field from './field'
import { bindActionCreators } from 'redux'
import { updateForm, createForm } from '../../modules/forms/thunks'
import { withStyles } from '@material-ui/styles'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { object, string, array } from 'yup'
import { setMessage, setStatePopup, setStatus } from '../../modules/popup/actions';


const styles = {
  indent: {
    margin: '10px 0'
  },
  elementCard: {
    width: '100%'
  }
}

const formSchema = object().shape({
  name: string()
    .required()
    .min(6),
  fields: array()
    .required()
    .min(1)
    .of(
      object().shape({
        type: string().required(),
        name: string()
          .required()
          .min(3),
        label: string()
          .required()
          .min(3)
      })
    )
})
function isNewFormCreate() {
  const url = window.location.href
  return url.includes('/form/new');
}

class FormBuilder extends React.Component {
  constructor(props) {
    super(props)
    const { currentForm } = this.props
    this.state = (currentForm && !isNewFormCreate())
      ? {
          isCreate: false,
          form: currentForm
        }
      : {
          isCreate: true,
          form: {
            name: '',
            fields: [{ type: 'text', name: '', label: '', placeholder: '' }]
          }
        }
    this.reorder = this.reorder.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  generateIdFromField(field, index) {
    return `${field.type}-${field.name}-${field.label}-${index}`
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = this.reorder(
      this.state.form.fields,
      result.source.index,
      result.destination.index
    )

    this.setState({
      form: {
        ...this.state.form,
        fields: items
      }
    })
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

  deleteField(index) {
    this.setState({
      form: {
        ...this.state.form,
        fields: remove(index, 1, this.state.form.fields)
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

  saveForm() {
    const payload = this.state.form
    const id = this.state.form.id
    const { 
      setMessage, 
      setStatePopup, 
      setStatus,
      createForm,
      updateForm
    } = this.props
    formSchema
      .validate(payload)
      .then(payload => {
          this.state.isCreate
            ? createForm(payload)
            : updateForm(id, payload)
        }
      )
      .catch(err => {
        setMessage(err.message)
        setStatePopup(true) 
        setStatus(true)
      })
    
  }

  render() {
    const { classes } = this.props
    return (
      <form>
        <Box p={2} mt={2}>
          <TextField
            value={this.state.form.name}
            label="Form name"
            onChange={e => this.onChangeFormName(e)}></TextField>
        </Box>
        {
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => {
                return (
                  <List {...provided.droppableProps} ref={provided.innerRef}>
                    {this.state.form.fields.map((input, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={this.generateIdFromField(input, index)}
                          index={index}>
                          {provided => {
                            return (
                              <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={classes.indent}
                                key={index}>
                                <Card className={classes.elementCard}>
                                  <Box p={2} width={1}>
                                    <Field
                                      fieldData={input}
                                      fieldUpdate={this.fieldUpdate(index)}
                                      isLastItem={
                                        this.state.form.fields.length === 1
                                      }
                                      deleteField={() =>
                                        this.deleteField(index)
                                      }
                                    />
                                  </Box>
                                </Card>
                              </ListItem>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </List>
                )
              }}
            </Droppable>
          </DragDropContext>
        }
        <Box p={2}>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.form.fields.length >= 15}
                onClick={() => this.addField()}>
                Add field
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={5} justify="space-between">
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.saveForm()}>
                Save form
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.props.goToBack()}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateForm,
      createForm,
      setMessage, 
      setStatePopup, 
      setStatus,
      goToBack: () => push('/')
    },
    dispatch
  )
const Component = withStyles(styles)(FormBuilder)

export default connect(
  null,
  mapDispatchToProps
)(Component)
