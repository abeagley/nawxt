import React from 'react'
import { rehydrateMarks } from 'react-imported-component'
import ReactDOM from 'react-dom'

// @ts-ignore: We include the dynamically imported components
import importedComponents from '../components/imported'

import App from '../pages/App.tsx.hbs'

const element = document.getElementById('app')

if (process.env.NODE_ENV === 'production') {
  rehydrateMarks().then(() => {
    ReactDOM.hydrate(<App />, element)
  })
} else {
  ReactDOM.render(<App />, element)
}
