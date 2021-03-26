import React, { useState } from "react";
const Form = ({ guardarBusquedaLetra, setSpinner }) => {
  const [busqueda, setBusqueda] = useState({
    artista: "",
    cancion: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  const { artista, cancion } = busqueda;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cancion.trim() === "" || artista.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      guardarBusquedaLetra(busqueda);
    }, 3000);
  };
  return (
    <div className="bg-info">
      <div className="container">
        {error ? (
          <p className="alert alert-danger text-center p-2">
            Todos los campos son obligatorios
          </p>
        ) : null}
        <div className="row">
          <form
            className="col cartd text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre artista"
                      onChange={handleChange}
                      value={artista}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Cancion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="Nombre cancion"
                      onChange={handleChange}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary float-right ">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
