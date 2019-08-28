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

class tableRow extends React.Component {
    componentDidMount() {
        this.props.getFillsByForm(this.props.row.id)
    }

    render () {
        const {name, fields } = this.props.row;
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
                    onClick={ () => this.props.changePage()}
                >
                    <EditIcon color="secondary" />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton aria-label="view">
                    <ViewIcon color="primary"/>
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
          changePage: () => push('/form/10')
    },
      dispatch
    )
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(tableRow)
