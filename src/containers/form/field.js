import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {omit, assocPath, append, remove, pick, pipe, assoc} from 'ramda';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';


const typeOptions = [
    'dropdown',
    'checkmark',
    'text',
    'number'
]

const mapTypeFunctions = {
    text: pipe(pick(['type', 'name', 'label']), assoc('placeholder', '')),
    dropdown: pipe(pick(['type', 'name', 'label']), assoc('items', [{ name: '', value: ''}]),assoc('default', 0)),
    checkmark: pipe(pick(['type', 'name', 'label'])),
    number: pipe(pick(['type', 'name', 'label']), assoc('placeholder', '')),
}

class Field extends React.Component {
    constructor(props) {
        super(props)
        const { fieldData } = this.props;
        this.state = {
            field: { ...fieldData }
        }
    }

    onChange(key) {
        return (e) => {
            this.setState({
                field: {
                    ...this.state.field,
                    [key]: e.target.value
                }
            }, () => this.props.fieldUpdate(this.state.field))
        }

    }

    onChangeType(e) {
       this.setState(state => {
           const f = mapTypeFunctions[e.target.value]
           const res = pipe(f, assoc('type', e.target.value))(state.field)
           return {
               field: res
           }
        }, () => {
            this.props.fieldUpdate(this.state.field)
        })
    }

    updateName(i) {
        return (e) => {
            this.setState({
                field: {
                    ...this.state.field,
                    items: assocPath([i, 'name'], e.target.value, this.state.field.items)
                }
            }, () => this.props.fieldUpdate(this.state.field))
        }
    }
    updateValue(i) {
        return (e) => {
            this.setState({
                field: {
                    ...this.state.field,
                    items: assocPath([i, 'value'], e.target.value, this.state.field.items)
                }
            }, () => this.props.fieldUpdate(this.state.field))
        }
    }
    addItem() {
        this.setState({
            items: append({ name: '', value: ''}, this.state.field.items)
        }, () => this.props.fieldUpdate(this.state.field))
    }
    deleteItem(i) {
        this.setState({
            field: {
                ...this.state.field,
                items: remove(i, 1, this.state.items)
            }
        }, () => this.props.fieldUpdate(this.state.field))
    }
    render() {
        return (
            <Grid container spacing={3}>
                { Object.entries(omit(['items'], this.state.field)).map( ([key, val], index) => {
                    if (key === 'type') {
                        return (
                            <Grid item xs={3} key={`${key}-${index}`}>
                                    <TextField 
                                        name={key}
                                        select
                                        label={key} 
                                        value={val} 
                                        onChange={(e) => this.onChangeType(e)} 
                                        
                                    >
                                        {typeOptions.map( op => <MenuItem value={op} key={op}>{op}</MenuItem>)} 
                                    </TextField>
                                
                            </Grid>
                        )
                    } else {
                        return (
                         <Grid item xs={3} key={`${key}-${index}`}>
                            <TextField 
                                value={val}
                                
                                label={key} 
                                onChange={this.onChange(key)}
                            ></TextField>
                        </Grid>
                        )
                    }
                })}
                {this.state.field.type === 'dropdown' ? 
                <> {
                    this.state.field.items.map(({ name, value}, idx) => {
                        return (
                            <div key={`${name}-${idx}`}>
                                <TextField value={name} label="name" onChange={this.updateName(idx)}></TextField>
                                <TextField value={value} label="value" onChange={this.updateValue(idx)}></TextField>
                                <IconButton 
                                    aria-label="delete" 
                                    onClick={() => this.deleteItem(idx)}
                                >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </div>
                        )
                    })
                }
                <IconButton 
                    aria-label="add" 
                    onClick={() => this.addItem()}
                >
                    <AddIcon color="primary" />
                </IconButton>
                </>: null}
            </Grid>
        )
    }
}

export default Field;