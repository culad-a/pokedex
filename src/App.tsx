import { useState, useEffect } from 'react'
import { langResources } from './langResources'
import IndividualPokemon from './composants/individualPokemon'

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

interface Type {
  id: number
  name: { [key: string]: string }
  image: string
}

function App() {
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([])
  const [listType, setListType] = useState<Type[]>([])
  const [listGeneration, setListGeneration] = useState<number[]>([])
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const listSort = [
    langResources[lang].n_croissant, langResources[lang].n_decroissant, 
    langResources[lang].a_z, langResources[lang].z_a, 
    langResources[lang].poids_croissant, langResources[lang].poids_decroissant, 
    langResources[lang].taille_croissant, langResources[lang].taille_decroissant
  ]

  const [loading, setLoading] = useState<boolean>(true) 
  const [error, setError] = useState<string | null>(null) 

  const [search, setSearch] = useState<string>('')
  const [isVisible, setIsVisible] = useState<Pokemon | null>(null)

  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterGeneration, setFilterGeneration] = useState<string | null>(null)
  const [sortSelection, setSortSelection] = useState<string | null>(null) 

  

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === "fr" ? "en" : "fr"))
  }

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect
    }

    fetch("https://pokedex-api.3rgo.tech/api/pokemon", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setListPokemon(data.data)
          const generations = [...new Set<number>(data.data.map((pokemon: Pokemon) => pokemon.generation))]
          setListGeneration(generations)
        } else {
          throw new Error("Données invalides")
        }
      })
      .catch((error) => setError(error.message))

    fetch("https://pokedex-api.3rgo.tech/api/types", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.data) {
          setListType(data.data)
        } else {
          throw new Error("Données invalides")
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [])


  const sortPokemon = (pokemonList: Pokemon[]): Pokemon[] => {
    switch (sortSelection) {
      case langResources[lang].n_croissant:
        return pokemonList.sort((a, b) => a.id - b.id)  
      case langResources[lang].a_z:
        return pokemonList.sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
      case langResources[lang].z_a:
        return pokemonList.sort((a, b) => a.weight - b.weight)
      case langResources[lang].poids_croissant:
        return pokemonList.sort((a, b) => a.height - b.height)
      case langResources[lang].taille_croissant:
        return pokemonList.sort((a, b) => b.id - a.id )  
      case langResources[lang].n_decroissant:
        return pokemonList.sort((a, b) => b.name[lang].localeCompare(a.name[lang]))
      case langResources[lang].poids_decroissant:
        return pokemonList.sort((a, b) => b.weight - a.weight)
      case langResources[lang].taille_decroissant:
        return pokemonList.sort((a, b) => b.height - a.height)
      default:
        return pokemonList 
    }
  }

  const filterPokemon = listPokemon.filter((pokemon) => 
    pokemon.name[lang].toLowerCase().includes(search.toLowerCase()) &&
    (filterType ? pokemon.types.includes(Number(filterType)) : true) &&
    (filterGeneration ? pokemon.generation === Number(filterGeneration) : true)
  )

  const sortedPokemon = sortPokemon(filterPokemon)

  return (
    <div>
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Erreur : {error}</p>}
      <header className="flex flex-col justify-center items-center w-full p-4">
        <img src="https://pokedex.3rgo.tech/static/media/logo.8d5a42efb18b7834c118.png" alt="logo" className="w-50" />
        <button 
          onClick={toggleLang}
          className={lang === 'fr' ?
            'bg-[url("https://pokedex.3rgo.tech/static/media/fr.0313c7eacb9633130ffb.svg")] w-9 h-7 absolute top-3 right-3 border border-2 border-white' : 
            'bg-[url("https://pokedex.3rgo.tech/static/media/us.bbbd9f5266841b5c49cc.svg")] w-9 h-7 absolute top-3 right-3 border border-2 border-white'
          }
        ></button>
        <div className="flex justify-center bg-red-400 w-full m-2 p-2 rounded-lg">
          <div>
          {langResources[lang].tri}
            <select 
              name="Sort"
              value={sortSelection || ""}
              onChange={(e) => setSortSelection(e.target.value || null)}
            >
              <option value="">{langResources[lang].tous}</option>
              {listSort.map((sort, index) => (
                <option key={index} value={sort}>{sort}</option>
              ))}
            </select>
          </div>
          <input 
            type="text"
            placeholder={langResources[lang].rechercher}
            className="border border-2 border-white rounded-sm p-1" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
          {langResources[lang].types}
            <select 
              name="Tous"
              value={filterType || ""}
              onChange={(e) => setFilterType(e.target.value || null)}
            >
              <option value="">{langResources[lang].tous}</option>
              {listType.map((type) => (
                <option key={type.id} value={type.id}>{type.name[lang]}</option>
              ))}
            </select>
          </div>
          <div>
            {langResources[lang].generation} 
            <select 
              name="Generation"
              value={filterGeneration || ""}
              onChange={(e) => setFilterGeneration(e.target.value || null)}
            >
              <option value="">{langResources[lang].tous}</option>
              {listGeneration.map((generation, index) => (
                <option key={generation} value={generation}>{generation}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className='flex gap-3 w-full flex-wrap px-15 justify-center'>
        {isVisible && (
          <IndividualPokemon 
            pokemon={isVisible}
            pokemons={listPokemon}
            types={listType}
            lang={lang}
            onClose={() => setIsVisible(null)}
          />
        )}
        {sortedPokemon.length > 0 ? 
          sortedPokemon.map((pokemon, index) => (
            <div 
              key={index} 
              className='rounded-md shadow-md bg-red-50 p-3 w-56'
              onClick={() => setIsVisible(pokemon)}
            >
              <div className='flex justify-between w-full'>
                <div>#{pokemon.id}</div>
                <div className='flex justify-center align-center rounded-full bg-red-950 text-white w-6 h-6'>{pokemon.generation}</div>
              </div>

              <div className="text-center" >
                <div className="flex justify-center" >
                  <img src={pokemon.image} alt="image pokemon" className="w-24 h-24" />
                </div>
                <div>{pokemon.name[lang]}</div>
                <div className='flex justify-around'>
                {pokemon.types.map(id => {
                  const type = listType.find(t => t.id === id)
                  return type ? (
                    <div key={id} className='border border-2 border-yellow-500 rounded-full flex items-center bg-zinc-900'>
                      <img src={type.image} alt={type.name[lang]} title={type.name[lang]} className="w-8 h-8 rounded-full " />
                      <span className='pl-1 pr-2 text-white'>{type.name[lang]}</span>
                    </div>
                  ) : null
                })}
                </div>
              </div>
            </div>
          )) :
        (
          <div>{langResources[lang].aucun_resultat}</div>
        )}
      </div>

    </div>
  )
}

export default App
