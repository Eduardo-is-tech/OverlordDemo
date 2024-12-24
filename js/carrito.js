const productos = {
    Auriculares: { 
        nombre: 'Auriculares', 
        precio: 20000, 
        descuento: 0.1
    },
    Bandolera: { 
        nombre: 'Bandolera', 
        precio: 39000, 
        descuento: 0.0
    },
    Anafe: { 
        nombre: 'Anafe', 
        precio: 380000, 
        descuento: 0.1
    },
};
const IVA = 0.21;
document.addEventListener('DOMContentLoaded', cargarCarrito);
function agregarAlCarrito(nombre, precio, productoKey) {
    const producto = productos[productoKey];
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ 
        nombre: producto.nombre, 
        precio: producto.precio,
        productoKey: productoKey
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}
function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const descuentoCarrito = document.getElementById('descuento-carrito');
    const ivaCarrito = document.getElementById('iva-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    listaCarrito.innerHTML = '';
    let subtotal = 0;
    let descuentoTotal = 0;
    carrito.forEach((producto, index) => {
        const productoInfo = productos[producto.productoKey];
        const li = document.createElement('li');
        const descuentoProducto = productoInfo.descuento * producto.precio;
        const precioConDescuento = producto.precio - descuentoProducto;
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} 
            ${productoInfo.descuento > 0 ? 
                `<span class="descuento">(Desc. ${(productoInfo.descuento * 100).toFixed(0)}%: 
                -$${descuentoProducto.toFixed(2)})</span>` 
                : ''}
        `;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
        subtotal += producto.precio;
        descuentoTotal += descuentoProducto;
    });
    const ivaTotal = (subtotal - descuentoTotal) * IVA;
    const total = subtotal - descuentoTotal + ivaTotal;
    subtotalCarrito.textContent = subtotal.toFixed(2);
    descuentoCarrito.textContent = descuentoTotal.toFixed(2);
    ivaCarrito.textContent = ivaTotal.toFixed(2);
    totalCarrito.textContent = total.toFixed(2);
}
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderizarCarrito();
}
function cargarCarrito() {
    renderizarCarrito();
}
function mostrarCheckout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex'; 
    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent);
    const descuento = parseFloat(document.getElementById('descuento-carrito').textContent);
    const iva = parseFloat(document.getElementById('iva-carrito').textContent);
    const total = parseFloat(document.getElementById('total-carrito').textContent);
    document.getElementById('modal-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('modal-descuento').textContent = descuento.toFixed(2);
    document.getElementById('modal-iva').textContent = iva.toFixed(2);
    document.getElementById('modal-total').textContent = total.toFixed(2);
}
function realizarCompra() {
    alert('¡Compra realizada con éxito!');
    localStorage.removeItem('carrito');
    cerrarCheckout();
    renderizarCarrito();
}
function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}