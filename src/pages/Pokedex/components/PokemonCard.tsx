import React from 'react'
import cx from 'classnames';

import { PokemonListItem } from '../../../types';
import { useHistory } from 'react-router';

function PokemonCard(props: PokemonListItem) {
  const { name, number, spriteURL, type1, type2 } = props;
  const history = useHistory();

  return (
    <div className={cx("pokemon-card", type1)} onClick={() => history.push('/pokemons/'+number)}>
      <span className="name">{name}</span>
      <span className="number">#{number}</span>
      <div className="types">
        <div className={cx("type", type1)}>{type1}</div>
        {type2 ? (
          <div className={cx("type", type1)}>{type2}</div>
        ) : null}
      </div>
      <img className="sprite" src={spriteURL} alt={name} />
      <img className="background-pokeball" src="/assets/images/pokeball_white.png" alt="pokeball" />
    </div>
  )
}

export default PokemonCard
