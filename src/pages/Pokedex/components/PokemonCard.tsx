/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import cx from 'classnames';

import { PokemonListItem } from '../../../types';
import { useHistory } from 'react-router';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const spring = {
  duration: 3
};
interface Props extends PokemonListItem {
  id: number,
  isSelected: boolean,
  hasParamId: boolean
}

function PokemonCard({
  name, number, type1, type2, id, isSelected, hasParamId
}: Props) {
  const history = useHistory();
  const controls = useAnimation();
  const y = useMotionValue(0);

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: id * 0.05 },
    }))
  }, [])

  useEffect(() => {
    if (isSelected) {
      controls.start(i => ({
        width: 100,
        height: '100vh',
        y: -200
      }))
    } else {
      controls.start(i => ({
        y: 0
      }))
    }
  }, [isSelected])

  useEffect(() => {
    if (!isSelected && hasParamId) {
      controls.start(i => ({
        display: 'none',
      }))
    }
    if (!isSelected && !!hasParamId === false) {
      controls.start(i => ({
        width: "49%",
        height: '110px',
        display: 'block'
      }))
    }
  }, [hasParamId])

  return (
    <motion.div
      animate={controls}
      initial={{
        opacity: 0,
        y: 10,
      }}
      transition={spring}
      style={{ y }}
      
      className={cx("pokemon-card", type1)}
      onClick={() => history.push('/pokedex/' + number)}
    >
      <span className="name">{name}</span>
      <span className="number">#{number}</span>
      <div className="types">
        <div className={cx("type", type1)}>{type1}</div>
        {type2 ? (
          <div className={cx("type", type1)}>{type2}</div>
        ) : null}
      </div>
      <img className="sprite" src={`https://img.pokemondb.net/artwork/vector/${name}.png`} alt={name} />
      <img className="background-pokeball" src="/assets/images/pokeball_white.png" alt="pokeball" />
    </motion.div>
  )
}

export default PokemonCard
