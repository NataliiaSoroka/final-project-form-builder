import React from 'react';
import { Route } from 'react-router-dom';
import FormList from './formList';
import Form from './formCreateUpdate';
import Fills from './fillsList';
import FillForm from './fillForm';
import Header from '../components/header';
import Notify from '../components/notify';


function isFillFormPage(url) {
  return url.includes('fill-form');
}

const App = () => (
  <div>
      { isFillFormPage(window.location.href) ? null : <Header /> }
    <main>
      <Notify />
      <Route exact path="/" component={FormList} />
      <Route exact path="/fills/:id" component={Fills} />
      <Route exact path="/form/:id" component={Form} />
      <Route exact path="/fill-form/:id" component={FillForm} />
    </main>
  </div>
)

export default App
