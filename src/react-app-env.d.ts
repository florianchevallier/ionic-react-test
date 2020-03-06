/// <reference types="react-scripts" />
declare module 'pokeapi-js-wrapper';
declare module 'react-query';


declare module PokemonNamespace {

  export interface Ability2 {
      name: string;
      url: string;
  }

  export interface Ability {
      is_hidden: boolean;
      slot: number;
      ability: Ability2;
  }

  export interface Form {
      name: string;
      url: string;
  }

  export interface Version {
      name: string;
      url: string;
  }

  export interface GameIndice {
      game_index: number;
      version: Version;
  }

  export interface Item {
      name: string;
      url: string;
  }

  export interface Version2 {
      name: string;
      url: string;
  }

  export interface VersionDetail {
      rarity: number;
      version: Version2;
  }

  export interface HeldItem {
      item: Item;
      version_details: VersionDetail[];
  }

  export interface Move2 {
      name: string;
      url: string;
  }

  export interface VersionGroup {
      name: string;
      url: string;
  }

  export interface MoveLearnMethod {
      name: string;
      url: string;
  }

  export interface VersionGroupDetail {
      level_learned_at: number;
      version_group: VersionGroup;
      move_learn_method: MoveLearnMethod;
  }

  export interface Move {
      move: Move2;
      version_group_details: VersionGroupDetail[];
  }

  export interface Species {
      name: string;
      url: string;
  }

  export interface Sprites {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
  }

  export interface Stat2 {
      name: string;
      url: string;
  }

  export interface Stat {
      base_stat: number;
      effort: number;
      stat: Stat2;
  }

  export interface Type2 {
      name: string;
      url: string;
  }

  export interface Type {
      slot: number;
      type: Type2;
  }

  export interface Pokemon {
      id: number;
      name: string;
      base_experience: number;
      height: number;
      is_default: boolean;
      order: number;
      weight: number;
      abilities: Ability[];
      forms: Form[];
      game_indices: GameIndice[];
      held_items: HeldItem[];
      location_area_encounters: string;
      moves: Move[];
      species: Species;
      sprites: Sprites;
      stats: Stat[];
      types: Type[];
  }

}