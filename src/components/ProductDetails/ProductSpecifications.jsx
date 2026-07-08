import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function ProductSpecifications({ idProducto }) {
  const [especificaciones, setEspecificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ titulo: '', descripcion: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarEspecificaciones();
  }, [idProducto]);

  const cargarEspecificaciones = async () => {
    try {
      const data = await apiService.getEspecificaciones(idProducto);
      setEspecificaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar especificaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.descripcion) return alert("Completa todos los campos");

    try {
      if (editingId) {
        await apiService.editarEspecificacion(editingId, form);
      } else {
        await apiService.crearEspecificacion(idProducto, form);
      }
      setForm({ titulo: '', descripcion: '' });
      setEditingId(null);
      cargarEspecificaciones();
    } catch (error) {
      console.error("Error al guardar especificación:", error);
    }
  };

  const handleEdit = (spec) => {
    setEditingId(spec.id || 9); // Respaldo ID simulado del JSON de Postman
    setForm({ titulo: spec.titulo, descripcion: spec.descripcion });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta especificación?")) {
      try {
        await apiService.eliminarEspecificacion(id);
        cargarEspecificaciones();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  if (loading) return <p>Cargando especificaciones...</p>;

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Especificaciones Técnicas</h3>
      
      {especificaciones.length === 0 ? (
        <p>No hay especificaciones para este producto.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            {especificaciones.map((spec, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', fontWeight: 'bold', width: '30%' }}>{spec.titulo}</td>
                <td style={{ padding: '10px' }}>{spec.descripcion}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(spec)} style={{ marginRight: '5px', background: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(spec.id || 9)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
        <h4>{editingId ? 'Editar Especificación' : 'Agregar Nueva Especificación'}</h4>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Ej: Peso, Dimensiones" 
            value={form.titulo} 
            onChange={(e) => setForm({...form, titulo: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Ej: 250 gramos, 15x10 cm" 
            value={form.descripcion} 
            onChange={(e) => setForm({...form, descripcion: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', cursor: 'pointer', width: '100%' }}>
          {editingId ? 'Actualizar' : 'Guardar'}
        </button>
        {editingId && <button onClick={() => { setEditingId(null); setForm({ titulo: '', descripcion: '' }); }} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '5px 15px', cursor: 'pointer', width: '100%', marginTop: '5px' }}>Cancelar</button>}
      </form>
    </div>
  );
}