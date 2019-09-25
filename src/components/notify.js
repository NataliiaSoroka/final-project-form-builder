import React from 'react';
import Popover from '@material-ui/core/Popover';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setStatePopup, setMessage } from '../modules/popup/actions';
import { withStyles } from '@material-ui/styles';
import { green, grey, red } from '@material-ui/core/colors';

const styles ={
    success: {
        backgroundColor: green[200],
        color: grey[50],
        padding: '20px'
    },
    error: {
        backgroundColor: red[200],
        color: grey[50],
        padding: '20px'
    }
}

function Popup(props) {
    const { 
        message, 
        setMessage, 
        setStatePopup, 
        isOpenPopup,
        isError,
        classes
    } = props;
    const handleClose = () => {
        setStatePopup(false)
        setMessage('')
    }
    return (
        <Popover
            anchorReference="anchorPosition"
            onClose={handleClose}
            open={isOpenPopup || false}
            anchorPosition={{ top: 0, left: 300 }}
        >
            <div className={isError ? classes.error : classes.success}>{ message }</div>
        </Popover>
    )
}

const mapStateToProps = ({ popup: { message, isOpenPopup, isError }}) => {
    return {
        message,
        isOpenPopup,
        isError
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        setMessage,
        setStatePopup
    },
    dispatch
  )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Popup))