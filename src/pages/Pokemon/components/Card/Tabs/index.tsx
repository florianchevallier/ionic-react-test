import React, { useState, useEffect, useRef, cloneElement, Dispatch, SetStateAction } from 'react'
import { PokemonSpecie } from '../../../../../types'
import About from './About'
import BaseStats from './BaseStats'
import { Tabs, useTabState, Panel } from "@bumaga/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie,
}

const Tab = ({ children }: any) => {
  const { isActive, onClick } = useTabState()

  function onTabClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    event.preventDefault();
    onClick(event);
  }

  return (
    <button className={cx('tab', isActive && 'active')} onClick={onTabClick}>
      {children}
    </button>
  )
}

interface PanelList {
  state: [number, Dispatch<SetStateAction<number>>],
  children: any
}

const PanelList = ({ state, children }: PanelList) => {
  const panelRef = useRef<HTMLLIElement>(null)
  const [height, set] = useState(0)
  const [activeIndex] = state

  useEffect(() => {
    panelRef.current && set(panelRef.current.offsetHeight)
  }, [activeIndex, set])

  return (
    <motion.ul className='panel-list' animate={{ height }}>
      <AnimatePresence initial={false}>
        <motion.li
          ref={panelRef}
          className='panel'
          key={activeIndex}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.1, ease: 'easeInOut', duration: 0.2 } }}
          exit={{ opacity: 0, x: 32, transition: { ease: 'easeInOut', duration: 0.2 } }}
        >
          {cloneElement(children[activeIndex], { active: true })}
        </motion.li>
      </AnimatePresence>
    </motion.ul>
  )
}

function TabsIndex({
  pokemon,
  specie
}: Props) {
  const state: [number, Dispatch<SetStateAction<number>>] = useState(0)
  return (
    <Tabs state={state}>
      <div className='tabs'>
        <div className='tab-list'>
          <Tab>Tab 1</Tab>

          <Tab>Tab 2</Tab>

          <Tab>Tab 3</Tab>
        </div>

        <PanelList state={state}>
          <Panel>
            <p>animations with framer/motion</p>
          </Panel>

          <Panel>
            <p>is pure</p>
          </Panel>

          <Panel>
            <p>❤️</p>
          </Panel>
        </PanelList>
      </div>
    </Tabs>
  )
}

export default TabsIndex
