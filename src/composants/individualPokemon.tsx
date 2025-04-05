import React from 'react'
import { useState } from 'react'
import StatCase from './statCase'

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
}

interface Props {
  pokemon: Pokemon
  onClose: () => void
  types: { id: number; name: { [key: string]: string }; image: string }[]
  lang: 'fr' | 'en'
}


const IndividualPokemon: React.FC<Props> = ({ pokemon, onClose, types, lang }) => {
  const [isShiny, setIsShiny] = React.useState(false)

  console.log("Individual", JSON.stringify(pokemon, null, 2))
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black/75 bg-opacity-90 flex flex-col items-center justify-center z-50'>
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
            <p><strong>Génération :</strong> {pokemon.generation}</p>
            <p><strong>Poids :</strong> {pokemon.weight}</p>
            <p><strong>Taille :</strong> {pokemon.height}</p>

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
          <StatCase title='Attaque' value={pokemon.stats.atk}/>
          <StatCase title='Défense' value={pokemon.stats.def}/>
          <StatCase title='Attaque spé.' value={pokemon.stats.spe_atk}/>
          <StatCase title='Défense spé.' value={pokemon.stats.spe_def}/>
          <StatCase title='Vitesse' value={pokemon.stats.vit}/>
        </div>

      </div>
    </div>
  )
}

export default IndividualPokemon
