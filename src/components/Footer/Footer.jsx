import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#2c3e50', color: '#ecf0f1', padding: '40px 20px', marginTop: '5px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', minWidth: '250px', marginBottom: '20px' }}>
          <h4 style={{ color: '#e74c3c', marginBottom: '15px' }}>Confitería Dasyar</h4>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#bdc3c7' }}>
            Llenando tus días de dulzura con la mejor selección de chocolates artesanales, gomitas y confites premium.
          </p>
        </div>
        
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>Enlaces Rápidos</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
            <li><a href="/productos" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Productos</a></li>
            <li><a href="/categorias" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Categorías</a></li>
            <li><a href="/contacto" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Contacto</a></li>
          </ul>
        </div>

        <div style={{ flex: '1', minWidth: '250px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>Contacto & Soporte</h4>
          <p style={{ fontSize: '14px', color: '#bdc3c7', margin: '5px 0' }}>📍 Dirección: Principal Mall Comercial</p>
          <p style={{ fontSize: '14px', color: '#bdc3c7', margin: '5px 0' }}>📞 Teléfono: +57 300 000 0000</p>
          <p style={{ fontSize: '14px', color: '#bdc3c7', margin: '5px 0' }}>✉️ Email: soporte@dasyar.com</p>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid #34495e', textAlign: 'center', paddingTop: '20px', marginTop: '20px', fontSize: '13px', color: '#7f8c8d' }}>
        &copy; {new Date().getFullYear()} Confitería Dasyar. Todos los derechos reservados.
      </div>
    </footer>
  );
}