import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store , { persistor }  from './redux/store';
import './scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
//bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// Optional loading component for when the persisted state is loading
const LoadingView = () => (
   <div className="flex h-screen items-center justify-center">
     <p>Loading...</p>
   </div>
 );

 
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Provider store={store}> 
 <PersistGate loading={<LoadingView />} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
 </BrowserRouter>
)


