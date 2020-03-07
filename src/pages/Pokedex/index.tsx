/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar } from '@ionic/react';
import { MdList } from 'react-icons/md';
import './assets/styles.scss';
import request from '../../utils/request';
import PokemonCard from './components/PokemonCard';
import { useQuery, queryCache } from 'react-query';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import { PokemonListItem, PokemonResults } from '../../types';
import Layout from '../../components/Layout/Layout';
import cx from 'classnames';
import { motion } from 'framer-motion';


function parsePokemons(pokemonsFetched: PokemonNamespace.Pokemon[]) {
  const pokemons: PokemonListItem[] = pokemonsFetched.map((p: PokemonNamespace.Pokemon) => {
    return {
      name: p.name,
      type1: p.types.find((v) => v.slot === 1)?.type.name,
      type2: p.types.find((v) => v.slot === 2)?.type.name,
      number: p.id,
      spriteURL: p.sprites.front_default
    }
  })
  return pokemons;
}

const LIMIT = 20;

const PokedexPage: React.FC = ({ match }: any) => {
  const fetchPokemons = (offset: number) => request(`https://pokeapi.aircoty.ovh/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
  const fetchPokemon = (name: string) => request(`https://pokeapi.aircoty.ovh/api/v2/pokemon/${name}`, { cache: "force-cache" });

  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [animationId, setAnimationId] = useState<number>(0);
  const params: { id?: string | undefined; } = match.params;
  console.log('params', params);
  const { id } = params;

  const infiniteRef: any = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: true,
    onLoadMore: handleLoadMore
  });

  const {
    status,
    data,
  } = useQuery('pokemons', () => fetchPokemons(offset), {
    initialData: () => {
      return queryCache.getQueryData('pokemons')
    }
  })

  async function fetchAllPokemons(pokemons: PokemonResults) {
    const pokemonsFetched: any = await Promise.all(pokemons.results.map((p) => fetchPokemon(p.name)));
    const pokemonParsed: PokemonListItem[] = parsePokemons(pokemonsFetched);
    setIsLoading(false);
    return pokemonParsed;
  }

  useEffect(() => {

    if (status === 'success') {
      fetchAllPokemons(data).then((pokemonParsed: PokemonListItem[]) => {
        setPokemons(pokemonParsed);
      })
    }
  }, [status])

  function handleLoadMore() {
    setIsLoading(true);
    setOffset(offset + 20);
    fetchPokemons(offset + 20).then((pokemonsFetched: any) => {
      fetchAllPokemons(pokemonsFetched).then((newPokemons: PokemonListItem[]) => {
        setAnimationId(0);
        setPokemons([...pokemons, ...newPokemons]);
      })
    })
  }

  return (
    <Layout>
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={id ? '/pokedex' : '/'} />
          </IonButtons>
          <IonButtons slot="end">
            <MdList size={40} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div className="pokedex">
        <IonContent className={cx({ 'is-open': !!id})}>
          <motion.h1 animate={{ display: !!id ? 'none': 'block' }}>Pokédex</motion.h1>
          {isLoading && (
            <p>Fetching pokemons</p>
          )}
          <div className="pokemon-list" ref={id ? null : infiniteRef}>
            {pokemons.length ? pokemons.map((p, i) => (
              <PokemonCard
                hasParamId={!!id}
                id={i > 20 ? animationId : i}
                key={p.number}
                isSelected={id ? parseInt(id) === p.number : false}
                {...p}
              />)
            ) : null}
          </div>
        </IonContent>
      </div>
    </Layout>
  )
}

export default PokedexPage
