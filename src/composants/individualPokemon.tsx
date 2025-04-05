import React from 'react'

interface Pokemon {
  id: number
  name: { [key: string]: string }
  weight: number
  height: number
  types: number[]
  generation: number
  image: string
}

interface Props {
  pokemon: Pokemon
  onClose: () => void
  types: { id: number; name: { [key: string]: string }; image: string }[]
  lang: 'fr' | 'en'
}


const IndividualPokemon: React.FC<Props> = ({ pokemon, onClose, types, lang }) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black/75 bg-opacity-90 flex flex-col items-center justify-center z-50'>
      <div className='bg-gray-100 w-[90%] md:w-1/2 rounded-lg shadow-lg p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>#{pokemon.id} - {pokemon.name[lang]}</h2>
          <button className='text-red-600 font-bold text-lg' onClick={onClose}>X</button>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-around'>
          <img src={pokemon.image} alt={pokemon.name[lang]} className='w-40 h-40' />
          <div className='text-left mt-4 md:mt-0'>
            <p><strong>Génération :</strong> {pokemon.generation}</p>
            <p><strong>Poids :</strong> {pokemon.weight}</p>
            <p><strong>Taille :</strong> {pokemon.height}</p>
            <p><strong>Types :</strong></p>
            <div className='flex gap-2 mt-1'>
              {pokemon.types.map(id => {
                const type = types.find(t => t.id === id)
                return type ? (
                  <img key={id} src={type.image} alt={type.name[lang]} title={type.name[lang]} className="w-8 h-8 rounded-full border border-yellow-500" />
                ) : null
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualPokemon
