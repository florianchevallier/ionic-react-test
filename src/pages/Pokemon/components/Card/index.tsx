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
  const controls = useAnimation();
  const y = useMotionValue(0)
  const yRange = [0, -70]
  const opacityRange = [1, 0]
  const opacity = useTransform(y, yRange, opacityRange);

  useEffect(() => {
    setPokemonOpacity(opacity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity])

  function onCardClick() {
    controls.start({ y: isCardOpen ? 0 : -250 })
    setIsCardOpen(!isCardOpen);
  }

  function onDragEnd(event: any, info: PanInfo): void {
    if (info.point.y < 0) {
      setIsCardOpen(true)
    } else {
      setIsCardOpen(false)
    }
  }

  return (
    <motion.div
      className="card"
      drag="y"
      dragConstraints={{ left: 0, right: 0, top: -250, bottom: 0 }}
      dragElastic={0.1}
      style={{ y }}
      onClick={onCardClick}
      animate={controls}
      onDragEnd={onDragEnd}
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