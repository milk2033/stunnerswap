import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MetaMaskProvider} from "@metamask/sdk-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


        <MetaMaskProvider
            debug={false}
            sdkOptions={{
                dappMetadata: {
                    name: "Example React Dapp",
                    url: window.location.href,
                }, 
                // Other options
                injectProvider: false, // Prevents overwriting window.ethereum
            }}
        >
            <App />
        </MetaMaskProvider>


    // original root 
    // <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
