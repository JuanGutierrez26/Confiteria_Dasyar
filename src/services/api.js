const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const apiService = {
  // --- ESPECIFICACIONES ---
  getEspecificaciones: async (idProducto) => {
    const response = await fetch(`${BASE_URL}/especificaciones/${idProducto}`);
    return response.json();
  },
  crearEspecificacion: async (idProducto, data) => {
    const response = await fetch(`${BASE_URL}/especificaciones/${idProducto}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  editarEspecificacion: async (idEspecificacion, data) => {
    const response = await fetch(`${BASE_URL}/especificaciones/${idEspecificacion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  eliminarEspecificacion: async (idEspecificacion) => {
    const response = await fetch(`${BASE_URL}/especificaciones/${idEspecificacion}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // --- RESEÑAS ---
  getResenas: async (idProducto) => {
    const response = await fetch(`${BASE_URL}/resenas/${idProducto}`);
    return response.json();
  },
  crearResena: async (idProducto, data) => {
    const response = await fetch(`${BASE_URL}/resenas/${idProducto}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};