/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

const enviarNombreAlBackend = (nombre, correo, fecha, contrasenia) => {
  const data = {
    nombre,
    correo,
    fecha,
    contrasenia,
  };

  return axios.post('URL_DEL_ENDPOINT_BACKEND', data)
    .then((response) =>
      // Manejar la respuesta del backend si es necesario
      response.data, // O cualquier otra manipulación de la respuesta
    )
    .catch((error) => {
      // Manejar el error si ocurre alguno
      throw error; // O cualquier otra manipulación del error
    });
};

export default enviarNombreAlBackend;
