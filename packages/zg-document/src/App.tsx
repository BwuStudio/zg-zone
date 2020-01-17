import React from 'react';
import { InjCss } from './utils/injcss';
import TopBar from './fragment/TopBar'
import Container from './fragment/container'

const App: React.FC = () => {
  return (
    <div className="App">
      <TopBar />
      <Container />
    </div>
  );
}

InjCss.gen('App',{
  '':{
    height:'100%',
    width:'100%',
    display:'flex',
    flexDirection: 'column',
  }
})

export default App;
