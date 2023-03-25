import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MantineProvider
      withCSSVariables 
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      //   colors: {
      //   brand: ['#0071ba' ],
      // },
      // primaryColor: 'brand',
      }}
    >
      <Notifications position="top-right" zIndex={2077}/>
        <App />
     
    </MantineProvider>
    
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
