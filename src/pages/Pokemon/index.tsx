import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonLoading, IonTitle, IonToolbar } from '@ionic/react';
import capitalize from 'lodash/capitalize';

import cx from 'classnames';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import request from '../../utils/request';
import { PokemonSpecie } from '../../types';
import './assets/styles.scss';
import Header from './components/Header';

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
      <IonContent>
        {!isLoading && pokemon && specie ? (
          <>
            <Header
              name={pokemon.name}
              number={pokemon.id}
              type1={type1}
              type2={type2}
              shortDescription={specie.genera.find(g => g.language.name === 'en')?.genus}
            />
          </>
        ) : null}
      </IonContent>
    </div>
  )
}

export default Pokemon
