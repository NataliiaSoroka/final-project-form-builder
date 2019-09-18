import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFillsByForm } from '../../modules/fills/thunks';


class Fills extends React.Component {
    componentDidMount() {
        const { getFillsByForm } = this.props
        const { id } = this.props.match.params;
        getFillsByForm(id);
    }

    render() {
        const { fills } = this.props;
        const { id } = this.props.match.params;
        const fillsById = fills[id] || []
        return (
        <div>
            <h1>Hello</h1>
            {fillsById.toString()}
        </div>
        )
    }
}

const mapStateToProps = ({fills: { fills }}) => {
    return {
        fills: fills
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