import React from 'react';
import { InjCss } from './utils/injcss';
import TopBar from './fragment/TopBar'
import Document from './fragment/document'
import Calalog from './fragment/catalog';

const App: React.FC = () => {
  return (
    <div className="App">
      <TopBar />
      <Document />
      <Calalog />
    </div>
  );
}

InjCss.gen('App', {
  '': {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
})

export default App;
