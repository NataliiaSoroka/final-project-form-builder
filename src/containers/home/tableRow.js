import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';
import { getFillsByForm } from '../../modules/fills/thunks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/styles';
import { green, yellow } from '@material-ui/core/colors';


const styles = {
    editB: {
      color: green[500]
    },
    viewB: {
      color: yellow[700]
    },
  }
class tableRow extends React.Component {
    componentDidMount() {
        this.props.getFillsByForm(this.props.row.id)
    }

    render () {
        const {name, fields, id } = this.props.row;
        const { fills } = this.props;
        return (
        <TableRow>
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align="right">{fields}</TableCell>
            <TableCell align="right">{ fills.length }</TableCell>
            <TableCell align="center">
                <IconButton 
                    aria-label="edit" 
                    disabled={!!fills.length}
                    onClick={ () => this.props.changePage(id)}
                >
                    <EditIcon className={this.props.classes.editB} color="secondary" />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton aria-label="view">
                    <ViewIcon className={this.props.classes.viewB} color="primary"/>
                </IconButton>
            </TableCell>
        </TableRow>)
    }
} 


const mapStateToProps = ({fills: { fills }}, { row: {id}}) => {
    const fillsById = fills[id] || []
    return {
        fills: fillsById
    }
}
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {  
          getFillsByForm,
          changePage: (id) => push(`/form/${id}`)
    },
      dispatch
    )
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(tableRow))
