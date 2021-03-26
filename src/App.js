import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import axios from "axios";
import Cancion from "./components/Cancion";
import Informacion from "./components/Informacion";
import Spinner from "./components/Spinner";

function App() {
  // definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
    };
    consultarApiLetra();
  }, [busquedaletra, info]);
  const componente = spinner ? <Spinner /> : <Informacion info={info} />;
  return (
    <>
      <Form
        guardarBusquedaLetra={guardarBusquedaLetra}
        setSpinner={setSpinner}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">{componente}</div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
