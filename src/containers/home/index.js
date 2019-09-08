import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getForms } from '../../modules/forms/thunks'
import TabelForms from './tabelsForms'
import Button from '@material-ui/core/Button'

class Home extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
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
  componentDidMount() {
    this.props.getForms()
  }
  render() {
    const { forms } = this.props

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.goToCreateFormPage()}>
          Create Form
        </Button>
        {forms.length ? (
          <TabelForms
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            data={forms}
            handleChangePage={(e, page) => this.handleChangePage(e, page)}
            handleChangeRowsPerPage={e => this.handleChangeRowsPerPage(e)}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = ({ forms }) => ({
  forms: forms.forms
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getForms, goToCreateFormPage: () => push('/form/new') },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
