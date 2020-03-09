import React from 'react'
import ProgressBar from '../../../../../../components/ProgressBar';

import { PokemonSpecie } from '../../../../../../types'

const mapStatToColor: any = {
  hp: '#EA3223',
  attack: '#E18443',
  defense: '#F3D155',
  'special-attack': '#6E92E9',
  'special-defense': '#8BC461',
  speed: '#E76487'
}
const mapNameToShortname: any = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Defense',
  speed: 'Speed'
}
interface Props {
  pokemon: PokemonNamespace.Pokemon,
  specie: PokemonSpecie
}

function getBaseStatSum(stats: PokemonNamespace.Stat[]) : number {
  return stats.reduce((p, c) => p + c.base_stat, 0);
}

function BaseStats({
  pokemon,
  specie
}: Props) {
  return (
    <div className="base-stats">
      <table>
        <tbody>
          {pokemon.stats.map((stat, i) => 
            <tr key={stat.stat.name}>
              <td className="stat-title">{mapNameToShortname[stat.stat.name]}</td>
              <td className="stat-value">{stat.base_stat}</td>
              <td className="stat-progress">
                <ProgressBar custom={i} value={stat.base_stat} max={255} color={mapStatToColor[stat.stat.name]} />
              </td>
            </tr>
          )}
          <tr key="total">
            <td className="stat-title">Total</td>
            <td className="stat-value">{getBaseStatSum(pokemon.stats)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BaseStats
