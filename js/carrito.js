let cartStorage = JSON.parse(localStorage.getItem("cartProducts")) || [];

let cartContainer = document.getElementById("cart-section");

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ''; 
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p class='col-12 text-center'>El carrito está vacío.</p>";
    } else {
        let total = 0;
        cartItems.forEach(producto => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            card.innerHTML = `<div class="card">
                                <img src="${producto.imagen}" class="card-img-top product-image" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <p class="card-text">Precio: ${producto.precio}</p>
                                    <p class="card-text">Cantidad: <button class="btn btn-secondary decrease" data-id="${producto.id}">-</button> ${producto.cantidad} <button class="btn btn-secondary increase" data-id="${producto.id}">+</button></p>
                                </div>
                              </div>`;
            cartContainer.appendChild(card);
            total += producto.precio * producto.cantidad;
        });
        const totalElement = document.createElement("div");
        totalElement.className = "col-12 text-center";
        totalElement.innerHTML = `<h3>Total: ${total}</h3>
                                  <button class="btn btn-success" id="confirmarCompra">Confirmar Compra</button>`;
        cartContainer.appendChild(totalElement);
    }

    addCartButtonsEventListeners();
}

function addCartButtonsEventListeners() {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = cartStorage.find(item => item.id == productId);
            product.cantidad += 1;
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        });
    });
    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = cartStorage.find(item => item.id == productId);
            if (product.cantidad > 1) {
                product.cantidad -= 1;
            } else {
                cartStorage = cartStorage.filter(item => item.id != productId);
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        });
    });
    document.getElementById('confirmarCompra').addEventListener('click', confirmarCompra);
}

function confirmarCompra() {
    let mensaje = 'Compra confirmada: \n';
    let total = 0;
    cartStorage.forEach(producto => {
        mensaje += `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio * producto.cantidad}\n`;
        total += producto.precio * producto.cantidad;
    });
    mensaje += `Total: ${total}`;
    alert(mensaje);
    cartStorage = [];
    localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
    renderCarrito(cartStorage);
}

renderCarrito(cartStorage);