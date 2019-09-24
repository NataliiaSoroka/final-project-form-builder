import React from 'react';
import Field from './field';
import { setfillToForm } from '../../modules/fills/thunks';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

const styles ={
    card: {
        maxWidth: 500
    }
}

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
        const { classes } = this.props
        return (
            <Card className={classes.card}>
                <form>
                    <CardHeader title={name} />
                    <CardContent>
                        { 
                            fields.map(row => <Field input={row} key={row.name} handlerChange={this.handlerChange(row.name)}/>)
                        }
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => this.saveForm()}>Save form</Button>
                    </CardActions>
                </form>
            </Card>
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
  )(withStyles(styles)(Form))