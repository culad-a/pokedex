import React from 'react'

interface Pokemon {
  id: number
  name: { [key: string]: string }
  weight: number
  height: number
  types: number[]
  generation: number
  image: string
  image_shiny: string
  stats: {
    hp: number
    atk: number
    def: number
    spe_atk: number
    spe_def: number
    vit: number
  }
  evolvedFrom: { [key: string]: string }
  evolvesTo: { [key: string]: string }
}

interface Props {
  pokemon: Pokemon
  pokemons: Pokemon[]
  lang: 'fr' | 'en'
}

const Evolution: React.FC<Props> = ({ pokemon, pokemons, lang }) => {
  console.log('POKEMON', JSON.stringify(pokemon, null, 2))

  const evolvedFrom =
    pokemon.evolvedFrom && Object.keys(pokemon.evolvedFrom).length > 0
      ? Object.entries(pokemon.evolvedFrom)
      : null


  const evolvesTo =
    pokemon.evolvesTo && Object.keys(pokemon.evolvesTo).length > 0
      ? Object.entries(pokemon.evolvesTo)
      : null


  return (
    <div className='flex items-center justify-center'>
        {evolvedFrom && evolvedFrom.length > 0 && (
            <div className='flex'>
                {evolvedFrom.map(([key, value], index) => {
                    const evolvedFromPokemon = pokemons.find(
                        (pokemonFrom) => pokemonFrom.id === Number(key)
                    )

                    return evolvedFromPokemon ? (
                        <div>
                            <img key={index} src={evolvedFromPokemon.image} alt={evolvedFromPokemon.name[lang]} className='w-40 h-40' />
                            {value}
                        </div>
                    ) : null
                })}
            </div>
        )}
        <img src={pokemon.image} alt={pokemon.name[lang]} className='w-40 h-40' />
        {evolvesTo && evolvesTo.length > 0 && (
            <div className='flex'>
                {evolvesTo.map(([key, value], index) => {
                    const evolvedFromPokemon = pokemons.find(
                        (pokemonFrom) => pokemonFrom.id === Number(key)
                    )
                    
                    return evolvedFromPokemon ? (
                        <div>
                            <img key={index} src={evolvedFromPokemon.image} alt={evolvedFromPokemon.name[lang]} className='w-40 h-40' />
                            {value}
                        </div>
                    ) : null
                })}
            </div>
        )}
    </div>
  )
}

export default Evolution
