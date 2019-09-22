import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import { getFillsByForm } from '../../modules/fills/thunks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/styles';
import { green, yellow, blue } from '@material-ui/core/colors';


const styles = {
    editB: {
      color: green[500]
    },
    viewB: {
      color: yellow[700]
    },
    viewC: {
      color: blue[500]
    }
  }
class tableRow extends React.Component {
    componentDidMount() {
        this.props.getFillsByForm(this.props.row.id, 0, 5)
    }

    copyLink(id) {
      const textarea = document.createElement('textarea');
      textarea.style.cssText = "height: 0px; width: 0px;"
      const value = `${window.location.host}/fill-form/${id}`;
      document.body.append(textarea);
      textarea.value = value;
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
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
            <TableCell align="center">
                <IconButton 
                    aria-label="edit" 
                    disabled={!!fills.length}
                    onClick={ () => this.props.goToEditPage(id)}
                >
                    <EditIcon className={this.props.classes.editB} color="secondary" />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton 
                  aria-label="view"
                  disabled={!fills.length}
                  onClick={ () => this.props.goToFills(id)}
                >
                    <ViewIcon className={this.props.classes.viewB}/>
                </IconButton>
            </TableCell>
            <TableCell align="center">
              <IconButton
              aria-label="copy"
              onClick={() => this.copyLink(id)}
              >
                <FileCopyIcon className={this.props.classes.viewC} />
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
          goToEditPage: (id) => push(`/form/${id}`),
          goToFills: (id) => push(`fills/${id}`)
    },
      dispatch
    )
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(tableRow))
