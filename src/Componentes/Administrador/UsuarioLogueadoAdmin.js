import React, { useEffect, useRef, useState } from 'react';
import '../Estilos/Home.css'; // Importa el archivo CSS

const BannerPrincipal = ({ imagePaths, currentSlide, handleIndicatorClick }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleIndicatorClick((prevSlide) => (prevSlide + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, [handleIndicatorClick]);

  useEffect(() => {
    const cardWidth = carouselRef.current.firstChild.offsetWidth;
    const newPosition = currentSlide * cardWidth;
    carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
  }, [currentSlide]);

  return (
    <section className="banner">
      <div className="productos">
        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {imagePaths.map((image, index) => (
              <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                <img src={image} alt={`Imagen ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="indicators">
            {imagePaths.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente de la Sección de Novedades
const SeccionNovedades = ({ productosPrimeros, productosUltimos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const novedadesRef = useRef(null);
  
  // Concatenar los productos
  const allProducts = [...productosPrimeros, ...productosUltimos];

  useEffect(() => {
    if (novedadesRef.current && novedadesRef.current.firstChild) {
      const cardWidth = novedadesRef.current.firstChild.offsetWidth;
      const newPosition = currentIndex * cardWidth;
      novedadesRef.current.scrollTo({ left: newPosition, behavior: 'auto' });
    }
  }, [currentIndex]);

  const handleNextClick = () => {
    if (currentIndex + 3 < allProducts.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <section className="novedades">
      <h2>Novedades</h2>
      <div className="novedades-container">
        <div className="flecha-izquierda" onClick={handlePrevClick}>&#60;</div>
        <div className="novedades-carousel" ref={novedadesRef}>
          {allProducts.map((producto, index) => (
            <div key={index} className="novedad-tarjeta">
              <img src={producto.imagen} alt={producto.nombre_producto} />
              <h3>{producto.nombre_producto}</h3>
              <p>Precio: ${producto.precio_venta}</p>
              {producto.precio_promocional > 0 && <p>Precio promocional: ${producto.precio_promocional}</p>}
            </div>
          ))}
        </div>
        <div className="flecha-derecha" onClick={handleNextClick}>&#62;</div>
      </div>
    </section>
  );
};

// Componente principal
const UsuarioLogueadoAdmin = ({ onLogout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productosPrimeros, setProductosPrimeros] = useState([]);
  const [productosUltimos, setProductosUltimos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async (ruta, setProductos) => {
      try {
        const respuesta = await fetch(`https://apismartsweepers.vercel.app/api/${ruta}`);
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos de los productos');
        }

        const productos = await respuesta.json();
        setProductos(productos);
      } catch (error) {
        console.error('Error al obtener los productos:', error.message);
      }
    };

    obtenerProductos('productos/primeros', setProductosPrimeros);
    obtenerProductos('productos/ultimos', setProductosUltimos);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  const imagePaths = [
    require('../img/Carru1.jpg'),
    require('../img/Carru2.jpg'),
    require('../img/Carru3.jpg')
  ];

  return (
    <div className="home">
      <BannerPrincipal 
        imagePaths={imagePaths} 
        currentSlide={currentSlide} 
        handleIndicatorClick={handleIndicatorClick} 
      />
      <div style={{ textAlign: 'center' }}>
  <h2 style={{ fontWeight: 'bold',fontSize:40 }}>Bienvenido Administrador</h2>
  <p style={{ fontWeight: 'bold' }}>Has iniciado sesión exitosamente como administrador.</p>
</div>


      
      <SeccionNovedades 
        productosPrimeros={productosPrimeros} 
        productosUltimos={productosUltimos} 
      />
      {/* Sección de Nuestros Clientes */}
      <section className="nuestros-clientes">
        <h2>Nuestros Clientes</h2>
        <div className="clientes-container">
          <div className="cliente-tarjeta">
            <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Juan Hernández" />
            <h3>Juan Hernández</h3>
            <p>Descripción del Cliente 1</p>
          </div>
          <div className="cliente-tarjeta">
            <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Pedro Perez" />
            <h3>Pedro Perez</h3>
            <p>Descripción del Cliente 2</p>
          </div>
          <div className="cliente-tarjeta">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Karen Ruiz" />
            <h3>Karen Ruiz</h3>
            <p>Descripción del Cliente 3</p>
          </div>
        </div>
      </section>
    </div>
  );
};


export default UsuarioLogueadoAdmin;
