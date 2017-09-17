import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { About, Admin, Contact, Home } from './containers'

const url  = new URL(window.location.href)
const isDev = (url.host == "localhost")

const browserApp = (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${isDev ? "/calendar/public/" : "/"}`} component={Home}/>
      <Route path={`${isDev ? "/calendar/public/about" : "/about"}`} component={About}/>
      <Route path={`${isDev ? "/calendar/public/admin" : "/admin"}`} component={Admin}/>
      <Route path={`${isDev ? "/calendar/public/contact" : "/contact"}`} component={Contact}/>
    </Switch>
  </BrowserRouter>
)

render(browserApp, document.getElementById('root'))
