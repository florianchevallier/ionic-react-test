import React from 'react'
import { PokemonSpecie } from '../../../../../../types'

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie
}

function Moves({
  pokemon,
  specie
}: Props) {
  return (
    <div>
      Je suis le tab Moves
    </div>
  )
}

export default Moves
