import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import history from "./utils/history";
import { Provider } from 'react-redux'

import configureStore from './store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);