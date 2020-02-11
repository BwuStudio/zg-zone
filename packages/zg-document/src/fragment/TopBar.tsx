import React, { useState } from 'react'
import { useListener } from '../utils/Event'
import { InjCss } from '../utils/injcss'
import { state, onStateChange } from '../state/index'
import Tree from '../utils/Tree'
import TabTitle from './TabTitle'

const TopBar: React.FC = () => {
  const [cur, setCur] = useState<Tree<{
    title: string;
    doc: HTMLElement;
    target: HTMLElement | null;
  }> | null>(state.current)

  const list = state.tabs

  const changeTo = (v: Tree<{
    title: string;
    doc: HTMLElement;
    target: HTMLElement | null;
  }> | null) => {
    state.current = v
    onStateChange.emit(state)
  }

  useListener(onStateChange)
    .map(v => v.current)
    .on(v => setCur(v))

  return (
    <div className="topBar">
      <i className={"zg zg-zglogo logo " + (!cur ? 'focus' : '')} onClick={() => changeTo(null)}></i>
      <TabTitle cur={cur} list={list} changeTo={changeTo} />
    </div>
  );
}

InjCss.gen('topBar', {
  '': {
    height: '60px',
    width: '100%',
    position: 'fixed',
    padding: '0 40px',
    top: '0',
    zIndex: '2',
    backgroundColor: "#d6e5fa"//'#353535',
  },
  '.logo': {
    height: '60px',
    float: 'left',
    fontSize: "75px",
    lineHeight: "72px",
    color: '#333',
    padding: '0 20px',
    fontWeight: 'normal',
    transition: 'all 0.3s ease-out',
    textShadow: '0 3px 3px rgba(0,0,0,0.3)',
    cursor: "pointer"
  },
  '.logo.focus': {
    fontWeight: 'bold',
    color: '#445',
    textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
  },
})

export default TopBar