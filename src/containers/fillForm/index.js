import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormById } from '../../modules/forms/thunks';
import Form from './form';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core/';

const styles = {
  root: {
    width: '100%'
  }
}

class FillForm extends React.Component {
    componentDidMount() {
        const { getFormById, id } = this.props;
        getFormById(id);
    }
    render() {
        const { currentForm, classes } = this.props;
        const val = currentForm === undefined ? 'loading...' : <Form form={currentForm} />
        return (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              className={classes.root}
            >
                { val }
            </Grid>
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
  )(withStyles(styles)(FillForm))