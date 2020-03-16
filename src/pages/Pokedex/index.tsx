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

const PokedexPage: React.FC = () => {
  const fetchPokemons = (offset: number) => request(`https://pokeapi.aircoty.ovh/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
  const fetchPokemon = (name: string) => request(`https://pokeapi.aircoty.ovh/api/v2/pokemon/${name}`, { cache: "force-cache" });

  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [animationId, setAnimationId] = useState<number>(0);

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
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
            <MdList size={40} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Pokédex</h1>
        {isLoading && (
          <p>Fetching pokemons</p>
        )}
        <div className="pokemon-list" ref={infiniteRef}>
          {pokemons.length ? pokemons.map((p, i) => (
            <PokemonCard id={i > 20 ? animationId : i} key={p.number} {...p} />)
          ) : null}
        </div>

      </IonContent>
    </Layout>
  )
}

export default PokedexPage
