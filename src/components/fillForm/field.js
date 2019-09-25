import React from 'react'
import {
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  MenuItem
} from '@material-ui/core'

function switchField(input, handlerChange) {
  switch (input.type) {
    case 'text':
      return (
        <TextField
          label={input.label}
          type={input.type}
          name={input.name}
          onChange={e => handlerChange(e.target.value)}
          fullWidth
          placeholder={input.placeholder}
        />
      )
    case 'number':
      return (
        <TextField
          label={input.label}
          type={input.type}
          name={input.name}
          onChange={e => handlerChange(e.target.value)}
          fullWidth
          placeholder={input.placeholder}
        />
      )
    case 'dropdown':
      return (
        <TextField
          name={input.name}
          label={input.label}
          value={(input.items[input.default] || {}).value}
          onChange={e => handlerChange(e.target.value)}
          fullWidth
          select>
          {input.items.map(op => (
            <MenuItem value={op.value} key={op.value}>
              {op.name}
            </MenuItem>
          ))}
        </TextField>
      )
    case 'checkmark':
      return (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                name={input.name}
                value={input.name}
                onChange={() => {
                  const value = document.getElementsByName(input.name)[0]
                    .checked
                  handlerChange(value)
                }}
              />
            }
            label={input.label}
          />
        </FormGroup>
      )
    default: {
      return null
    }
  }
}

function Field(props) {
  const { input, handlerChange } = props
  return (
    <div>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12}>
          {switchField(input, handlerChange)}
        </Grid>
      </Grid>
    </div>
  )
}

export default Field
