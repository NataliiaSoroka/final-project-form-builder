import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { prop } from 'ramda';

const typeOptions = [
    'dropdown',
    'checkmark',
    'text',
    'number'
]


class FormBuilder extends React.Component {
    constructor(props) {
        super(props)
        const state = {
            isCreate: true
        }
    }
    componentDidMount() {
       const { currentForm } = this.props
       if (currentForm) {
           this.setState({
               ...this.state,
               isCreate: false,
               form: currentForm
           })
       } else {
           this.setState({
               ...this.state,
               isCreate: true
           })
       }
    }

    render() {
        return (
            <form>
                {
                    prop('form', this.state) 
                    ? <List>
                       { this.state.form.fields.map((input,index) => {
                            return (
                                <ListItem key={index}>
                                    <Select value={input.type}>
                                        {typeOptions.map( op => <MenuItem value={op} key={op}>{op}</MenuItem>)} 
                                    </Select>
                                    <TextField value={input.label} label="LABEL"></TextField>
                                    <TextField value={input.name} label="NAME"></TextField>
                                    <TextField value={input.placeholder} label="PLACEHOLDER"></TextField>
                                </ListItem>
                            )
                        })}
                    </List>
                    : null
                }
            </form>
        )
    }
}
export default FormBuilder