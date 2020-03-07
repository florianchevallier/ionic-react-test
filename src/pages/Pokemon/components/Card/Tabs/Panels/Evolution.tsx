import React from 'react'
import { PokemonSpecie } from '../../../../../../types'

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie
}

function Evolution({
  pokemon,
  specie
}: Props) {
  return (
    <div>
      Je suis le tab Evolution
    </div>
  )
}

export default Evolution
