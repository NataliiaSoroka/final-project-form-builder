import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Form from '../form'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/form/1">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/form/:id" component={Form} />
    </main>
  </div>
)

export default App
