export interface PokemonResult {
  name: string,
  url: string
}
export  interface PokemonResults {
  count: number,
  next: string,
  previous: string,
  results: PokemonResult[]
}

export  interface PokemonListItem {
  name: string,
  type1: string | undefined,
  type2: string | undefined,
  number: number,
  spriteURL: string
}

export interface PokemonSpecie {
  id:                     number;
  name:                   string;
  order:                  number;
  gender_rate:            number;
  capture_rate:           number;
  base_happiness:         number;
  is_baby:                boolean;
  hatch_counter:          number;
  has_gender_differences: boolean;
  forms_switchable:       boolean;
  growth_rate:            Color;
  pokedex_numbers:        PokedexNumber[];
  egg_groups:             Color[];
  color:                  Color;
  shape:                  Color;
  evolves_from_species:   null;
  evolution_chain:        EvolutionChain;
  habitat:                Color;
  generation:             Color;
  names:                  Name[];
  pal_park_encounters:    PalParkEncounter[];
  form_descriptions:      any[];
  flavor_text_entries:    FlavorTextEntry[];
  genera:                 Genus[];
  varieties:              Variety[];
}

export interface Color {
  name: string;
  url:  string;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language:    Color;
  version:     Color;
}

export interface Genus {
  genus:    string;
  language: Color;
}

export interface Name {
  name:     string;
  language: Color;
}

export interface PalParkEncounter {
  base_score: number;
  rate:       number;
  area:       Color;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex:      Color;
}

export interface Variety {
  is_default: boolean;
  pokemon:    Color;
}
