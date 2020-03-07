import React from 'react'
import { PokemonSpecie } from '../../../../../../types'
import '../../../../assets/panel.scss';

interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie
}

function getPokemonHeight(height: number): string {
  const meters: number = height / 10;
  const feetInches: string = (meters * 3.281).toFixed(2);
  const feet: string = `${feetInches.split('.')[0]}'`;
  const inches: string = `${parseInt(feetInches.split('.')[1], 10) / 10}"`;
  return `${meters}m (${feet + inches})`;
}

function getPokemonWeight(weight: number): string {
  const kg: string = (weight / 10).toFixed(1);
  const lbs: string = ((weight / 10) * 2.205).toFixed(1);
  return `${kg}kg (${lbs}lbs)`;
}

function About({
  pokemon,
  specie
}: Props) {
  return (
    <div className="about">
      <div className="description">
        {specie.flavor_text_entries.slice().reverse().find(f => f.language.name === 'en')?.flavor_text}
      </div>
      <div className="height-weight">
        <div className="bloc">
          <span className="title">Height</span>
          <span className="measure">{getPokemonHeight(pokemon.height)}</span>
        </div>
        <div className="bloc">
          <span className="title">Weight</span>
          <span className="measure">{getPokemonWeight(pokemon.weight)}</span>
        </div>
      </div>
      <div className="breeding">
        <h5>Breeding</h5>
        <table>
          <tbody>
            <tr>
              <td className="title">Egg Groups</td>
              <td className="measure">{specie.egg_groups.map(eg => eg.name).join(', ')}</td>
            </tr>
            <tr>
              <td className="title">Hatch counter</td>
              <td className="measure">{255 * specie.hatch_counter + 1} steps</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default About
