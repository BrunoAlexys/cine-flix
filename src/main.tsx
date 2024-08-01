import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/header/header.tsx'
import { QueryProvider } from './utils/queryClientProvider.tsx'
import { MainRouters } from './routers/MainRouters.tsx'
import Rodape from './components/rodape/rodape.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Header />
        <MainRouters />
        <Rodape />
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>,
)
