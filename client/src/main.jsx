import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { AuthContexProvider} from './AuthContext/AuthContexProvider.jsx'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './Authentication/userReducer.js';
const store = createStore(userReducer, applyMiddleware(thunk));

import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById('root')).render(
   <AuthContexProvider>
   <Provider store={store}>
    <App />
   </Provider>
   </AuthContexProvider>
  
)
