/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, MotionValue, useAnimation, PanInfo } from "framer-motion"

import { PokemonSpecie } from '../../../../types';
import '../../assets/card.scss'
import Tabs from './Tabs';

function Card({
  pokemon,
  specie,
  setPokemonOpacity,
  isCardOpen,
  setIsCardOpen
}: Props) {
  const upTo = 230;
  const controls = useAnimation();
  const y = useMotionValue(0)
  const yRange = [0, -230]
  const opacityRange = [1, 0]
  const opacity = useTransform(y, yRange, opacityRange);

  useEffect(() => {
    setPokemonOpacity(opacity)
  }, [opacity])

  function onCardClick() {
    controls.start({ y: isCardOpen ? 0 : -upTo })
    setIsCardOpen(!isCardOpen);
  }

  console.log('y', y.get());
  return (
    <motion.div
      className="card"
      initial={{
        position: 'relative',
        top: 150
      }}
      transition={{ type: "tween", duration: .3 }}
      style={{ y }}
      onClick={onCardClick}
      animate={controls}
    >
      <Tabs pokemon={pokemon} specie={specie} />
    </motion.div>
  )
}

export default Card


interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie,
  setPokemonOpacity(opacity: MotionValue): void,
  isCardOpen: boolean,
  setIsCardOpen(isCardOpen: boolean): void
}