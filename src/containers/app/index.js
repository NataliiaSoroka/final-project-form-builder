import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Form from '../form'
import Fills from '../fills'
import FillForm from '../fillForm'

function isFillFormPage(url) {
  return url.includes('fill-form');
}

const App = () => (
  <div>
      { isFillFormPage(window.location.href)
      ? null
      : <header>
          <Link to="/">Home</Link>
          <Link to="/form/new">Create form</Link>
        </header>
      }

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/fills/:id" component={Fills} />
      <Route exact path="/form/:id" component={Form} />
      <Route exact path="/fill-form/:id" component={FillForm} />
    </main>
  </div>
)

export default App
