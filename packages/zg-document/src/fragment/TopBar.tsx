import React from 'react';
import { InjCss } from '../utils/injcss'
import TabTitle from './TabTitle'

const TopBar: React.FC<{

}> = (props) => {
  return (
    <div className="topBar">
      <TabTitle/>
    </div>
  );
}

InjCss.gen('topBar', {
  '': {
    height: '60px',
    width: '100%',
    padding: '0 40px',
    backgroundColor: '#353535',
  }
})

export default TopBar