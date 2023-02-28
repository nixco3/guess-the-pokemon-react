import { useState, useEffect } from "react";
import { fetchPokemonData } from "./api";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [win, setWin] = useState(null);
  const [showInputBar, setShowInputBar] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  async function fetchData() {
    const data = await fetchPokemonData();
    setPokemonData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!pokemonName.trim().length) return;

    setShowInputBar(false);
    document.querySelector('.pokemon').classList.remove('filtered');

    if (pokemonName.toLowerCase() === pokemonData.name) {
      setWin(1);
    } else {
      setWin(0);
    }

    setGameEnded(true);
    setPokemonName("");
  };

  const nextLevel = (e) => {
    document.querySelector('.pokemon').classList.add('filtered');
    e.preventDefault();
    fetchData();
    setWin(null);
    setShowInputBar(true);
    setGameEnded(false);
  };

  return (
    <main className="container">
      {pokemonData ? (
        <div className="gameContainer">
          <form className="gameData" onSubmit={handleSubmit}>
            <h1>¿Cuál es este pokemon?</h1>
            <div className="pokemonImage">
              <img src={pokemonData.image} alt="IMAGE" className="pokemon filtered" />
            </div>
            {showInputBar && (
              <div className="gameInput">
                <input
                  className="pokemonName"
                  value={pokemonName}
                  name="PokemonName"
                  type="text"
                  placeholder="Ej: Parasect"
                  autoFocus
                  onChange={(e) => setPokemonName(e.target.value.trim())}
                />
                <button type="submit">Enviar</button>
              </div>
            )}

            {gameEnded && (
              <div>
                {win == 1 ? (
                  <div className="gameEnded">
                    <p className="gameEnded__text">¡Muy bien! Ese era el Pokémon, <span>{pokemonData.name}</span></p>
                    <button
                      className="nextButton"
                      onClick={nextLevel}
                      type="button"
                    >
                      Siguiente
                    </button>
                  </div>
                ) : (
                  <div className="gameEnded">
                    <p className="gameEnded__text">
                      ¡Noooooo! Ese no es el nombre de ese Pokémon, este se
                      llama: <span>{pokemonData.name}</span>
                    </p>
                    <button
                      className="nextButton"
                      onClick={nextLevel}
                      type="button"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </main>
  );
}

export default App;
