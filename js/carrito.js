let cartSection = document.getElementById("cart-section");

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

function renderCart() {
  cartSection.innerHTML = "";
  if (cartProducts.length === 0) {
    cartSection.innerHTML = "<p>No hay productos en el carrito</p>";
  } else {
    cartProducts.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-4";
      productCard.innerHTML = `<div class="card">
                                  <img src="${
                                    product.imagen
                                  }" class="card-img-top product-image" alt="${
        product.nombre
      }">
                                  <div class="card-body">
                                      <h5 class="card-title">${
                                        product.nombre
                                      }</h5>
                                      <p class="card-text">Precio: $${
                                        product.precio
                                      }</p>
                                      <p class="card-text">Cantidad: 
                                        <button class="btn btn-secondary decrease-quantity" data-index="${index}">-</button>
                                        ${product.cantidad}
                                        <button class="btn btn-secondary increase-quantity" data-index="${index}">+</button>
                                      </p>
                                      <p class="card-text">Subtotal: $<span class="subtotal">${
                                        product.precio * product.cantidad
                                      }</span></p>
                                      <button class="btn btn-danger remove-product" data-index="${index}">Eliminar</button>
                                  </div>
                                </div>`;
      cartSection.appendChild(productCard);
    });
    addCartListeners();
    addPurchaseButton();
    updateTotal();
  }
}

function addCartListeners() {
  document.querySelectorAll(".remove-product").forEach((button) => {
    button.onclick = (e) => {
      const productIndex = e.currentTarget.dataset.index;
      cartProducts.splice(productIndex, 1);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      renderCart();
    };
  });

  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.onclick = (e) => {
      const productIndex = e.currentTarget.dataset.index;
      cartProducts[productIndex].cantidad += 1;
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      renderCart();
    };
  });

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.onclick = (e) => {
      const productIndex = e.currentTarget.dataset.index;
      if (cartProducts[productIndex].cantidad > 1) {
        cartProducts[productIndex].cantidad -= 1;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        renderCart();
      }
    };
  });
}

function updateTotal() {
  const total = cartProducts.reduce(
    (sum, product) => sum + product.precio * product.cantidad,
    0
  );
  document.getElementById("total-price").textContent = `Total: $${total}`;
}

function addPurchaseButton() {
  const existingButton = document.getElementById("confirm-purchase");
  if (!existingButton) {
    const purchaseButton = document.createElement("button");
    purchaseButton.className = "btn btn-success btn-block mt-4";
    purchaseButton.id = "confirm-purchase";
    purchaseButton.innerText = "Confirmar Compra";
    purchaseButton.onclick = handlePurchase;
    cartSection.appendChild(purchaseButton);
  }
}

function handlePurchase() {
  Swal.fire({
    title: "Confirmar Compra",
    html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre">
           <input type="text" id="surname" class="swal2-input" placeholder="Apellido">
           <input type="text" id="address" class="swal2-input" placeholder="Dirección">
           <input type="text" id="phone" class="swal2-input" placeholder="Celular">`,
    confirmButtonText: "Confirmar",
    focusConfirm: false,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const surname = Swal.getPopup().querySelector("#surname").value;
      const address = Swal.getPopup().querySelector("#address").value;
      const phone = Swal.getPopup().querySelector("#phone").value;
      if (!name || !surname || !address || !phone) {
        Swal.showValidationMessage(`Por favor completa todos los campos`);
      }
      return { name: name, surname: surname, address: address, phone: phone };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, surname, address, phone } = result.value;
      const purchaseSummary = cartProducts
        .map(
          (product) => `
        <p>${product.nombre} - Cantidad: ${product.cantidad} - Precio: $${
            product.precio * product.cantidad
          }</p>
      `
        )
        .join("");
      const totalAmount = cartProducts.reduce(
        (total, product) => total + product.precio * product.cantidad,
        0
      );

      var DateTime = luxon.DateTime;
      const now = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);

      Swal.fire({
        title: "Resumen de Compra",
        html: `<p>Nombre: ${name}</p>
               <p>Apellido: ${surname}</p>
               <p>Dirección: ${address}</p>
               <p>Celular: ${phone}</p>
               <p>Fecha y Hora: ${now}</p>
               ${purchaseSummary}
               <p>Total: $${totalAmount}</p>`,
        confirmButtonText: "Finalizar Compra",
      }).then(() => {
        localStorage.removeItem("cartProducts");
        cartProducts = [];
        renderCart();
        Swal.fire("Compra Confirmada", "Gracias por tu compra", "success");
        document.getElementById("total-price").textContent = `Total: $0`;
      });
    }
  });
}

renderCart();
