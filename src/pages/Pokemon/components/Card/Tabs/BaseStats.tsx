import React from 'react'
import { PokemonSpecie } from '../../../../../types'

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie
}

function BaseStats({
  pokemon,
  specie
}: Props) {
  return (
    <div>
      Je suis le tab BaseStats
      Premier stats {pokemon.stats[0].base_stat}
    </div>
  )
}

export default BaseStats
