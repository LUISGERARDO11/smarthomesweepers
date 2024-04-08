import React from 'react';
import '../Estilos/Registrar.css'

function Editar() {
  return (
    <div className="container">
      <header>
        <h1>Edicion</h1>
        <p>Edita un producto</p>
      </header>
      <main className="main">
        {/* Formulario de Información del Producto */}
        <form className="form1">
          <h2>Información del Producto</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="color">Color:</label>
            <input type="text" id="color" name="color" />
          </div>
        </form>

        {/* Formulario de Información de Stock */}
        <form className="form2">
          <h2>Información de Stock</h2>
          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" name="stock" />
          </div>
        </form>

        {/* Formulario de Precios */}
        <form className="form3">
          <h2>Precios</h2>
          <div className="form-group">
            <label htmlFor="precioVenta">Precio de Venta:</label>
            <input type="number" id="precioVenta" name="precioVenta" />
          </div>
          <div className="form-group">
            <label htmlFor="costoProduccion">Costo de Producción:</label>
            <input type="number" id="costoProduccion" name="costoProduccion" />
          </div>
          <div className="form-group">
            <label htmlFor="MargenGanancia">Margen de Ganancia:</label>
            <input type="number" id="MargenGanancia" name="MargenGanancia" />
          </div>
        </form>

        {/* Formulario de Imagen del Producto */}
        <form className="form4">
          <h2>Editar Imagen del Producto</h2>
          <div className="form-group5">
            <input type="file" id="imagen" name="imagen" accept="image/png, image/jpeg" />
          </div>
        </form>

        {/* Texto de Tamaño y Formatos recomendados */}
        <p>Tamaño mínimo recomendado: 1024px</p>
        <p>Formatos recomendados: PNG o JPEG</p>

        {/* Botones */}
        <div className="button-container">
          <button type="button" className="cancel-button">Cancelar</button>
          <button type="submit" className="register-button">Registrar</button>
        </div>
      </main>
    </div>
  );
}

export default Editar;
