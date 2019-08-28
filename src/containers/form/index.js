import React from 'react'

const Form = props => (
  <div>
    <h1>Form Page</h1>
    <p>{props.match.params.id}</p>
  </div>
)

export default Form
