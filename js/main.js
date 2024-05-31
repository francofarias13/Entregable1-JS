const products = [
    { id: 1, name: "Caño de Escape Deportivo", price: 15000 },
    { id: 2, name: "Caño de Escape Original", price: 12000 },
    { id: 3, name: "Service Básico", price: 5000 },
    { id: 4, name: "Service Completo", price: 10000 }
];
const cart = [];
let productCount = products.length;
let totalCost = 0;

function listProducts() {
    console.log("Productos disponibles:");
    products.forEach(product => {
        console.log(`ID: ${product.id}, Nombre: ${product.name}, Precio: $${product.price}`);
    });
}

function addToCart() {
    const productId = parseInt(prompt("Ingrese el ID del producto que desea agregar al carrito:"), 10);

    if (isNaN(productId) || productId <= 0 || productId > productCount) {
        alert("El ID debe ser un número válido.");
        return;
    }

    const product = products.find(p => p.id === productId);
    cart.push(product);
    totalCost += product.price;
    alert(`Producto agregado al carrito: \nNombre: ${product.name}\nPrecio: $${product.price}`);
}

function listCart() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    console.log("Productos en el carrito:");
    cart.forEach(product => {
        console.log(`Nombre: ${product.name}, Precio: $${product.price}`);
    });
    console.log(`Costo total: $${totalCost}`);
}

function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío. No se puede realizar la compra.");
        return;
    }

    const firstName = prompt("Ingrese su nombre:");
    const lastName = prompt("Ingrese su apellido:");
    const address = prompt("Ingrese su dirección:");
    const phoneNumber = prompt("Ingrese su número de teléfono:");

    alert(`Compra realizada exitosamente:\nNombre: ${firstName} ${lastName}\nDirección: ${address}\nTeléfono: ${phoneNumber}\nCosto total: $${totalCost}`);
    
    cart.length = 0;
    totalCost = 0;
}

function runSimulator() {
    let exit = false;
    while (!exit) {
        const action = prompt("Seleccione una acción:\n1. Listar productos\n2. Agregar producto al carrito\n3. Ver carrito\n4. Realizar compra\n5. Salir");
        switch (action) {
            case '1':
                listProducts();
                break;
            case '2':
                addToCart();
                break;
            case '3':
                listCart();
                break;
            case '4':
                checkout();
                break;
            case '5':
                exit = confirm("¿Está seguro de que desea salir?");
                break;
            default:
                alert("Opción no válida.");
        }
    }
    alert("Gracias por usar el simulador de venta de caños de escape y servicios de motos.");
}

runSimulator();
