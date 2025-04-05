import React from 'react'
import StatCase from './statCase'
import Evolution from './evolution'
import { langResources } from '../langResources'


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
  onClose: () => void
  types: { id: number; name: { [key: string]: string }; image: string }[]
  lang: 'fr' | 'en'
}


const IndividualPokemon: React.FC<Props> = ({ pokemon, pokemons, onClose, types, lang }) => {
  const [isShiny, setIsShiny] = React.useState(false)

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/75 flex flex-col items-center justify-center z-50'>
      <div className='bg-gray-100 rounded-lg shadow-lg p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>#{pokemon.id} - {pokemon.name[lang]}</h2>
          <button className='text-red-600 font-bold text-lg' onClick={onClose}>X</button>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-around'>
          <div>
            <img src={isShiny ? pokemon.image_shiny : pokemon.image} alt={pokemon.name[lang]} className='w-40 h-40' />
            <div className='flex items-center' onClick={() => setIsShiny(!isShiny)}>
              Shiny
              <div
                className={`w-4 h-4 ml-1 rounded-full ${isShiny ? "bg-green-500" : "bg-red-500"}`}
              ></div>
            </div>
          </div>
          <div className='text-left mt-4 md:mt-0'>
            <p><strong>{langResources[lang].generation}</strong> {pokemon.generation}</p>
            <p><strong>{langResources[lang].poids}</strong> {pokemon.weight}</p>
            <p><strong>{langResources[lang].taille}</strong> {pokemon.height}</p>

          </div>
        </div>

        <div className='flex gap-2 m-2 justify-center'>
          {pokemon.types.map(id => {
            const type = types.find(t => t.id === id)
            return type ? (
              <div key={id} className='border border-2 border-yellow-500 rounded-full flex items-center bg-zinc-900'>
                <img src={type.image} alt={type.name[lang]} title={type.name[lang]} className="w-8 h-8 rounded-full " />
                <span className='pl-1 pr-2 text-white'>{type.name[lang]}</span>
              </div>
            ) : null
          })}
        </div>

        <div className='flex gap-4'>
          <StatCase title='PV' value={pokemon.stats.hp}/>
          <StatCase title={langResources[lang].attaque} value={pokemon.stats.atk}/>
          <StatCase title={langResources[lang].defense} value={pokemon.stats.def}/>
          <StatCase title={langResources[lang].spe_atk} value={pokemon.stats.spe_atk}/>
          <StatCase title={langResources[lang].spe_def} value={pokemon.stats.spe_def}/>
          <StatCase title={langResources[lang].vitesse} value={pokemon.stats.vit}/>
        </div>

        <Evolution pokemon={pokemon} pokemons={pokemons} lang={lang}/>

      </div>
    </div>
  )
}

export default IndividualPokemon
