import React from "react";




const Cards = ({pokemon, loading, infoPokemon}) => {
  console.log(pokemon);

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div>
              <div className="Card" key={item.id} onClick={()=>infoPokemon(item)}>
                <h1>{item.id}</h1>
                <img
                  src={item.sprites.front_default}
                  alt=""
                />
                <h2>{item.name}</h2>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cards;