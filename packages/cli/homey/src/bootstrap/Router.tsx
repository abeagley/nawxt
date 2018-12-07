import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { hot, setConfig } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import rhlConfig from '../config/react-hot-loader'

import Error404 from '../components/404'
import Welcome from '../components/welcome'

setConfig(rhlConfig)

class Router extends Component<object, object> {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={'/'}
            render={(props) => (
              <>
                <Helmet defaultTitle="">
                  <title>homey</title>
                </Helmet>
                <Welcome {...props} />
              </>
            )}
          />
          <Route
            render={(props) => (
              <>
                <Helmet defaultTitle="">
                  <title>homey : 404</title>
                </Helmet>
                <Error404 {...props} />
              </>
            )}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default (process.env.NODE_ENV !== 'development') ? Router : hot(module)(Router)
