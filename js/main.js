const productos = [
    { id: 1, nombre: "Caño de Escape Deportivo", precio: 15000, imagen: "https://http2.mlstatic.com/D_629859-MLA74866055448_032024-C.jpg" },
    { id: 2, nombre: "Caño de Escape Original", precio: 12000, imagen: "https://urquizamotos.com.ar/67837-large_default/ca%C3%B1o-escape-corven-energy-110-original-.jpg" },
    { id: 3, nombre: "Service Básico", precio: 5000, imagen: "https://fulltimemotos.com.ar/wp-content/uploads/cuando-hacer-service-a-la-moto.webp" },
    { id: 4, nombre: "Rueda", precio: 30000, imagen: "https://fulltimemotos.com.ar/wp-content/uploads/que-tipos-de-neumaticos-hay-1.webp" },
    { id: 5, nombre: "Sistema motor", precio: 100000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZgioqBtXAdxkb8wMHU8vUsMdcZNfHFk2iQ&s" },
    { id: 6, nombre: "Sistema Frenos", precio: 80000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNtKUqkvVfapqJ0BeHZWzLG6GpGnn_fmm4zA&s" },
    { id: 7, nombre: "Manillar", precio: 20000, imagen: "https://http2.mlstatic.com/D_NQ_NP_641769-MLA53382707186_012023-O.webp" }
];

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let productsContainer = document.getElementById("products-container");
let productForm = document.getElementById("product-form");
let notification = document.getElementById("notification");

function showNotification(message) {
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function renderProductos(productsArray) {
    productsContainer.innerHTML = '';
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `<div class="card">
                            <img src="${producto.imagen}" class="card-img-top product-image" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.precio}</p>
                                <button class="btn btn-primary productoAgregar" id="${producto.id}">Agregar</button>
                            </div>
                          </div>`;
        productsContainer.appendChild(card);
    });

    addToCartButton();
}

productForm.onsubmit = (e) => {
    e.preventDefault();
    const newName = document.getElementById("product-name").value;
    const newPrice = document.getElementById("product-price").value;
    const newImage = document.getElementById("product-image").value;
    const newProduct = { id: productos.length + 1, nombre: newName, precio: Number(newPrice), imagen: newImage };

    productos.push(newProduct);
    renderProductos(productos);

    document.getElementById("product-name").value = '';
    document.getElementById("product-price").value = '';
    document.getElementById("product-image").value = '';

    showNotification(`Producto ${newName} agregado.`);
};

function addToCartButton() {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            const productInCart = cartProducts.find(item => item.id == productId);

            if (productInCart) {
                productInCart.cantidad += 1;
            } else {
                selectedProduct.cantidad = 1;
                cartProducts.push(selectedProduct);
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

            showNotification(`Producto ${selectedProduct.nombre} agregado al carrito.`);
        };
    });
}

renderProductos(productos);