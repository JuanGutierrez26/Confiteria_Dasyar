import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function ProductReviews({ idProducto }) {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre_cliente: '', comentario: '', estrellas: 5 });

  useEffect(() => {
    cargarResenas();
  }, [idProducto]);

  const cargarResenas = async () => {
    try {
      const data = await apiService.getResenas(idProducto);
      setResenas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre_cliente || !form.comentario) return alert("Por favor, llena los campos requeridos.");

    const reviewPayload = {
      ...form,
      imagen_cliente: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}` // Imagen aleatoria de perfil
    };

    try {
      await apiService.crearResena(idProducto, reviewPayload);
      setForm({ nombre_cliente: '', comentario: '', estrellas: 5 });
      cargarResenas();
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    }
  };

  if (loading) return <p>Cargando comentarios...</p>;

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Reseñas de Clientes</h3>
      
      <div style={{ marginBottom: '30px' }}>
        {resenas.length === 0 ? (
          <p>Sé el primero en calificar este producto.</p>
        ) : (
          resenas.map((res, index) => (
            <div key={index} style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <img src={res.imagen_cliente} alt={res.nombre_cliente} style={{ width: '50px', height: '50px', borderRadius: '5px', marginRight: '15px' }} />
              <div>
                <h5 style={{ margin: '0 0 5px 0' }}>{res.nombre_cliente}</h5>
                <span style={{ color: '#ffc107', fontSize: '14px' }}>{'★'.repeat(res.estrellas)}{'☆'.repeat(5 - res.estrellas)}</span>
                <p style={{ margin: '5px 0 0 0', color: '#555' }}>{res.comentario}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ borderTop: '2px solid #f5f5f5', paddingTop: '20px' }}>
        <h4>Déjanos tu Comentario</h4>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tu Nombre:</label>
          <input 
            type="text" 
            value={form.nombre_cliente} 
            onChange={(e) => setForm({...form, nombre_cliente: e.target.value})} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Puntuación:</label>
          <select 
            value={form.estrellas} 
            onChange={(e) => setForm({...form, estrellas: parseInt(e.target.value)})}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="5">5 Estrellas ★★★★★</option>
            <option value="4">4 Estrellas ★★★★☆</option>
            <option value="3">3 Estrellas ★★★☆☆</option>
            <option value="2">2 Estrellas ★★☆☆☆</option>
            <option value="1">1 Estrella ★☆☆☆☆</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Comentario:</label>
          <textarea 
            rows="4" 
            value={form.comentario} 
            onChange={(e) => setForm({...form, comentario: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          ></textarea>
        </div>
        <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
          Publicar Opinión
        </button>
      </form>
    </div>
  );
}