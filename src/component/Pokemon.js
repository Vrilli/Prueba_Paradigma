import React, { useState } from "react";
import Cards from "./cards/Cards";
import Profile from "./Profile";


const Pokemon = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const estado = Profile(url);
  const { cargando, data } = estado;
  

  return (
    <div>
      {cargando ? (  
        <h1>Cargando....</h1>
      ) : (
        <div>
          <Cards results={data.results} />

          <div className="containe m-auto">
            <button onClick={()=> setUrl(data.previous)} className="m-2 btn btn-dark">Anterior</button>
            <button onClick={()=> setUrl(data.next)} className="m-2 btn btn-dark">Siguiente</button>
          </div>
        </div>
      )}
      <footer />


    </div>
  );
};

export default Pokemon;