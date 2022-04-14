import {  useState, useEffect } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CerrarSesion, useAuth } from '../firebaseConfig';
import Pokeinfo from './Pokeinfo';
import Cards from './Cards';
import axios from 'axios';
import "../styles/Cards.css"




export const Preguntas = () => {

  

  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [anteriorUrl, setAnteriorUrl] = useState();
  const [siguienteUrl, setSiguienteUrl] = useState();
  const [pokeDex, setPokeDex]=useState()

  const pokeFun = async () => {
    setLoading(true);
    const result = await axios.get(url);
    setAnteriorUrl(result.data.previous);
    setSiguienteUrl(result.data.next);
    getPokemon(result.data.results);
    setLoading(false);
  };

  const getPokemon = async (result) => {
    result.map(async (item) => {
      const res = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, res.data];
        state.sort((a,b) =>a.id>b.id?1:-1);
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
     //eslint-disable-next-line
  },[url])

  const [cargando, setCargando] = useState(false)

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
    <div >
      <div className='Navb'>
        <Navbar>
          <Container>
            <Navbar.Brand id='usuariolog'><img src="https://img.icons8.com/external-bearicons-flat-bearicons/64/000000/external-user-essential-collection-bearicons-flat-bearicons.png" alt='' />   <div><h4><b>Bienvenido:</b></h4> {currentUser?.displayName} </div>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Link to='/lista'>
              <button className='bot' variant="secondary">Listar Pokémon</button>
            </Link>
            
            <Link to='/login'>
              <button className='bot' onClick={handleCerrarSesion} disabled={cargando || !currentUser} variant="secondary">Cerrar Sesion</button>{' '}
            </Link>
           
          </Container>
        </Navbar>
        </div>

        <div className="container">
        <div className="left-content">
          <Cards pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)} />
          <div className="btn-group">

            { anteriorUrl && <Button className="m-2 btn btn" onClick={()=>{
              setPokeData([])
              setUrl(anteriorUrl)
            }}>Anterior</Button>

            }

            { siguienteUrl && <Button className="m-2 btn btn" onClick={()=>{
              setPokeData([])
              setUrl(siguienteUrl)
            }}>Siguiente</Button>
            }
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
     
    </div>
  )
}










