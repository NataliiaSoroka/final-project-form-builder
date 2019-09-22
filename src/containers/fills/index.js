import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFillsByForm } from '../../modules/fills/thunks';
import TableFills from './tabelFills';


class Fills extends React.Component {
    state = {
        page: 0,
        rowsPerPage: 5
    }
    componentDidMount() {
        const { getFillsByForm, id } = this.props;
        getFillsByForm(+id, this.state.page, this.state.rowsPerPage);
    }
    handleChangePage(event, newPage) {
        this.setState({
          ...this.state,
          page: newPage
        })
      }
      handleChangeRowsPerPage(event) {
        this.setState({
          ...this.state,
          rowsPerPage: event.target.value,
          page: 0
        })
      }

    render() {
        const { fills, id, formName} = this.props;
        const fillsById = fills[id] || []
        return (
        <div>
            <h1>{formName}</h1>
            <TableFills
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                data={fillsById}
                handleChangePage={(e, page) => this.handleChangePage(e, page)}
                handleChangeRowsPerPage={e => this.handleChangeRowsPerPage(e)}    
            />
        </div>
        )
    }
}

const mapStateToProps = ({fills: { fills }, forms: { forms } }, { match: { params: { id }}}) => {
    const form = (forms || []).find(form => {
        return form.id === (+id)
    }) || {};
    return {
        fills: fills,
        formName: form.name,
        id
    }
  }

const mapDispatchToProps = dispatch => 
    bindActionCreators(
        {
          getFillsByForm            
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Fills)