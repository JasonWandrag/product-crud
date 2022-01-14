const cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
console.log(cart);
function readCart(cart) {
  document.querySelector("#cart").innerHTML = "";

  let total = Math.round(
    cart.reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
  );

  cart.forEach((product, position) => {
    document.querySelector("#cart").innerHTML += `
      <div class="card mb-3 w-100" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.img}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.price}</p>
              <div class="d-flex mb-3 justify-content-between">
              <input type="number" min=1 id="remove${position}" value=${product.qty} />
              <button type="button" class="btn btn-primary" onclick="updateCart(${position})">Update Product</button>
              </div>
              <button type="button" class="btn btn-danger" onclick="removeFromCart(${position})">Remove Product</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector("#cart").innerHTML += `
    <h3>Total cost: R${total}</h3>
  `;
}

readCart(cart);
// UPDATE
function updateCart(position) {
  let qty = document.querySelector(`#remove${position}`).value;

  cart[position] = { ...cart[position], qty };

  readCart(cart);
}

// REMOVE
function removeFromCart(position) {
  cart.splice(position, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}

// CHECKOUT
function checkout() {
  cart.length = 0;
  localStorage.removeItem("cart");
  readCart(cart);
}
