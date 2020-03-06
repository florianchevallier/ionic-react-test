import React from 'react'
import { PokemonSpecie } from '../../../../../types'

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie
}

function About({
  pokemon,
  specie
}: Props) {
  return (
    <div>
      Je suis le tab About
      {specie.flavor_text_entries.slice().reverse().find(f => f.language.name === 'en')?.flavor_text}
    </div>
  )
}

export default About
