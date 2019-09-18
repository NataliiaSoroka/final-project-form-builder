import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Form from '../form'
import Fills from '../fills'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/form/:id" component={Form} />
      <Route exact path="/fills/:id" component={Fills} />
    </main>
  </div>
)

export default App
