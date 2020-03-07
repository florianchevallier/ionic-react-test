import React, { useState } from 'react';
import { Panel, Tabs } from "@bumaga/tabs";

import PanelList from './PanelList';
import About from './Panels/About';
import BaseStats from './Panels/BaseStats';
import Evolution from './Panels/Evolution';
import Moves from './Panels/Moves';

import Tab from './Tab';

import { PokemonSpecie } from '../../../../../types';

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie,
}

function TabsIndex({
  pokemon,
  specie
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  
  return (
    <Tabs state={[activeIndex, setActiveIndex]}>
      <div className='tabs'>
        <div className='tab-list'>
          <Tab>About</Tab>
          <Tab>Base Stats</Tab>
          <Tab>Evolution</Tab>
          <Tab>Moves</Tab>
        </div>

        <PanelList activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <Panel>
            <About pokemon={pokemon} specie={specie} />
          </Panel>
          <Panel>
            <BaseStats pokemon={pokemon} specie={specie} />
          </Panel>
          <Panel>
            <Evolution pokemon={pokemon} specie={specie} />
          </Panel>
          <Panel>
            <Moves pokemon={pokemon} specie={specie} />
          </Panel>
        </PanelList>
      </div>
    </Tabs>
  )
}

export default TabsIndex
