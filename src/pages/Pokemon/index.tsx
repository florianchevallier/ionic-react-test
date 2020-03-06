import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonHeader, IonLoading, IonToolbar } from '@ionic/react';

import cx from 'classnames';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import request from '../../utils/request';
import { PokemonSpecie } from '../../types';
import './assets/styles.scss';
import Header from './components/Header';
import Card from './components/Card';
import { motion, MotionValue } from 'framer-motion';

interface PokemonParams {
  id: string
}

interface GetPokemonSpecieResponse {
  data: PokemonSpecie | null,
  isFetching: boolean
}
interface GetPokemonResponse {
  data: PokemonNamespace.Pokemon | null,
  isFetching: boolean
}

function Pokemon() {
  const params: PokemonParams = useParams<PokemonParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonOpacity, setPokemonOpacity] = useState<MotionValue>()
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const fetchPokemonSpecie = () => request(`https://pokeapi.aircoty.ovh/api/v2/pokemon-species/${params.id}`, { cache: "force-cache" });
  const fetchPokemon = () => request(`https://pokeapi.aircoty.ovh/api/v2/pokemon/${params.id}`, { cache: "force-cache" });

  const { data: specie, isFetching: isFetchingSpecie }: GetPokemonSpecieResponse = useQuery('pokemon', () => fetchPokemonSpecie());
  const { data: pokemon, isFetching: isFetchingPokemon }: GetPokemonResponse = useQuery('pokemon-specie', () => fetchPokemon());

  useEffect(() => {
    if (!isFetchingPokemon && !isFetchingSpecie) {
      setIsLoading(false);
    }
  }, [isFetchingSpecie, isFetchingPokemon])

  const type1 = pokemon?.types.find(t => t.slot === 1)?.type.name;
  const type2 = pokemon?.types.find(t => t.slot === 2)?.type.name;

  return (
    <div className={cx("pokemon-layout", type1)}>
      <div className="pokemon-top-layout">
        <img className="background-img" src="/assets/images/pokeball_white.png" alt="pokeball white" />
        {!isLoading && pokemon ? (
          <motion.img
            style={{ opacity: pokemonOpacity, zIndex: isCardOpen ? 0 : 2 }}
            className="background-img-pokemon"
            src={`https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`}
            alt={pokemon.name}
          />
        ) : null}
        <IonLoading
          isOpen={isLoading}
          message={'Please wait...'}
        />
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/pokedex" />
            </IonButtons>
            <IonButtons slot="primary">
              <IoMdHeartEmpty size={20} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {!isLoading && pokemon && specie ? (
          <Header
            name={pokemon.name}
            number={pokemon.id}
            type1={type1}
            type2={type2}
            shortDescription={specie.genera.find(g => g.language.name === 'en')?.genus}
          />
        ) : null}
      </div>
      {!isLoading && pokemon && specie ? (
        <Card
          setPokemonOpacity={setPokemonOpacity}
          isCardOpen={isCardOpen}
          setIsCardOpen={setIsCardOpen}
          pokemon={pokemon}
          specie={specie}
        />
      ) : null}
    </div>
  )
}

export default Pokemon
