let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let productsContainer = document.getElementById("products-container");
let notification = document.getElementById("notification");
let productos = [];

function showNotification(message) {
  Swal.fire({
    icon: "info",
    title: "Notificación",
    text: message,
    timer: 3000,
    showConfirmButton: false,
  });
}

function renderProductos(productsArray) {
  productsContainer.innerHTML = "";
  productsArray.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `<div class="card">
                        <img src="${producto.imagen}" class="card-img-top product-image" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <button class="btn btn-primary productoAgregar" id="${producto.id}">Agregar</button>
                        </div>
                      </div>`;
    productsContainer.appendChild(card);
  });
  addToCartButton();
}

function addToCartButton() {
  const addButton = document.querySelectorAll(".productoAgregar");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id;
      const selectedProduct = productos.find(
        (producto) => producto.id == productId
      );
      const productInCart = cartProducts.find((item) => item.id == productId);

      if (productInCart) {
        productInCart.cantidad += 1;
      } else {
        selectedProduct.cantidad = 1;
        cartProducts.push(selectedProduct);
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      showNotification(
        `Producto ${selectedProduct.nombre} agregado al carrito.`
      );
      updateCartCount();
    };
  });
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cartProducts.reduce(
    (sum, product) => sum + product.cantidad,
    0
  );
  cartCount.textContent = totalItems;
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    renderProductos(productos);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    showNotification("Error loading products.");
  });

updateCartCount();
