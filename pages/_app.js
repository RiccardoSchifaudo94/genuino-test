import '../styles/globals.css'
import React from 'react';


function App({ Component, pageProps }) {
  return ( 
               <Component {...pageProps}></Component>
          )
}

export default App
