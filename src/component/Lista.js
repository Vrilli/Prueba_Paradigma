 import React, { useState } from 'react'
 import "../styles/Listar.css"
  import { Link } from 'react-router-dom';
 import { useForm } from '../hooks/useForm';
 import { CerrarSesion, useAuth } from '../firebaseConfig';



const Lista = () => {


     const [cargando, setCargando] = useState(false)
    const [term, handleInputChange] = useForm({
        pokemonBuscar: ""
    })

    const [status, setStatus] = useState(false)
    const [pokeInfo, setpokeInfo] = useState({})
    const { pokemonBuscar } = term

    const getPokemonData = async term => {
        const url = `https://pokeapi.co/api/v2/pokemon/${term}`
        const response = await fetch(url)
        if (response.status === 404 || response.statusText === 'Not Found') {
            setStatus(true)
            if (pokeInfo) {
                setpokeInfo({})
            }
        } else if (status) {
            setStatus(false)
        }
        const pokemon = await response.json()
        setpokeInfo(pokemon)
    }

    async function handleCerrarSesion() {
         setCargando(true)
        try {
             await CerrarSesion()
       } catch {
            alert("error!")
       }
        setCargando(false)
    }

     const currentUser = useAuth()

    return (
        <div className="container flex-center">
            <small className="text-muted1">Busca tu Pokémon Preferido!</small>
            <div className="search-container col-md-5 col-sm-5">
                <input type="search" className="form-control" id="search_q" name='pokemonBuscar' value={pokemonBuscar} onChange={handleInputChange} placeholder="Buscar por nombre...." />
                <button className="btn-search" id="search-btn" onClick={() => getPokemonData(pokemonBuscar)}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            {/* Error, cuando el servidor retorna 404 */}
            {status &&
                <div id="show_error" className="hidden alert alert-danger alert-dismissible fade" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Cerrar</span>
                    </button>
                    <strong>oohh!</strong>Pokémon no encontrado :(
                </div>
            }

            {/* Succes, cuando el servidor retorna 200 */}
            {Object.entries(pokeInfo).length !== 0 &&
                <div className="col-md-5 col-sm-5 pokemon-card" id="pokemon_details">
                    <div className="img-container">
                        <img id="update_img" src={pokeInfo.sprites.other.dream_world.front_default} alt="" />
                    </div>
                    <div className="detail-container">
                        <div className="title-container">
                            <h3 className="name text-center" id="update_name">{pokeInfo.name}</h3>
                            <hr className="seperator" />
                            <div className="stats text-center">
                                <span className="first cp-text col-md-6" id="update_hp">HP {Math.floor((Math.random() * pokeInfo.stats[0].base_stat) + 1)}/${pokeInfo.stats[0].base_stat}</span>
                                <span className="cp-text col-md-6" id="update_cp">XP {pokeInfo.base_experience}</span>
                            </div>
                        </div>
                        <button className="btn-transfer">TRANSFER</button>
                        <div className="attributes-container">
                            <div className="col attributes-content">
                                <p className="cp-text" id="update_type"></p>
                                <small className="text-muted">Type</small>
                            </div>
                            <div className="col attributes-content">
                                <p className="cp-text" id="update_weight">{pokeInfo.weight} kg</p>
                                <small className="text-muted">Weight</small>
                            </div>
                            <div className="col attributes-content">
                                <p className="cp-text no-border" id="update_height">{pokeInfo.height} m</p>
                                <small className="text-muted">Height</small>
                            </div>
                        </div>
                        <div className="player-data">
                            <div className="col data-container">
                                <p className="stardust" id="update_stardust">{Math.floor((Math.random() * 10000) + 1)}</p>
                                <p className="muted-text">Stardust</p>
                            </div>
                            <div className="col data-container">
                                <p className="stardust" id="update_candy">{Math.floor((Math.random() * 200) + 1)}</p>
                                <p className="muted-text" id="update_candy_title">{pokeInfo.name} Candy</p>
                            </div>
                        </div> <br/>
                        <Link to='/login'>
                         <button className='bot' onClick={handleCerrarSesion} disabled={cargando || !currentUser} variant="secondary">Cerrar Sesion</button>{' '}
                       </Link>
                    </div>
                </div>
            }
        </div>

    )
}

export default Lista;