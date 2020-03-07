/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import cx from 'classnames';

import { PokemonListItem } from '../../../types';
import { useHistory } from 'react-router';
import { motion, useAnimation } from 'framer-motion';

interface Props extends PokemonListItem {
  id: number
}

function PokemonCard({
  name, number, type1, type2, id
}: Props) {
  const history = useHistory();
  const controls = useAnimation()


  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: id * 0.05 },
    }))
  }, [])

  return (
    <motion.div
      animate={controls}
      initial={{
        opacity: 0,
        y: 10
      }}
      className={cx("pokemon-card", type1)}
      onClick={() => history.push('/pokemons/' + number)}
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
