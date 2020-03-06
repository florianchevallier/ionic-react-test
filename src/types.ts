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