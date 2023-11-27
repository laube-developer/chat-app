import '../styles/globals.css'
import Head from 'next/head'

import MainContext from '../util/server/GlobalContext'
import { useState } from 'react'

function MyApp({ Component, pageProps}) {
  const [globalContext, setGContext] = useState({
    isAuthenticated: false,
    isLoadding: false,
  })

  return (
  <MainContext.Provider value={{globalContext, setGContext}}>  
    <Component {...pageProps} />
  </MainContext.Provider>)
}

export default MyApp
