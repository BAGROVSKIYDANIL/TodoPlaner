import { useState } from 'react';
import { Layout } from './componets/Layout/Layout';
import { SideBar } from './componets/SideBar/SideBar';
import { PageMain } from './componets/MainPart/PageMain';
import './App.css'

function App() {

  return (
    <Layout>
      <SideBar/>
      <PageMain/>
    </Layout>
  )
}

export default App
