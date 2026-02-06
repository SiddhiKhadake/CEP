// ==============================
// STUDENT DASHBOARD JS
// ==============================

// Cart array
let cart = [];

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find(i => i.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  renderCart();
}

// Render cart
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const totalPriceSpan = document.getElementById("totalPrice");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p class="empty-cart">Cart is empty</p>';
    totalPriceSpan.textContent = 0;
    return;
  }

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeFromCart('${item.name}')">❌</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  totalPriceSpan.textContent = total;
}

// Remove item from cart
function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

// Place order
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("studentOrders")) || [];
  const studentName = "Test Student"; // replace with logged-in student name/email

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const newOrder = {
    orderNo: Date.now(),
    student: studentName,
    items: cart,
    total,
    status: "Pending"
  };

  orders.push(newOrder);
  localStorage.setItem("studentOrders", JSON.stringify(orders));

  cart = []; // empty cart
  renderCart();

  alert("Order placed successfully!");
  window.location.href = "student-order.html";
}

// Go to student order status page
function goToOrderStatus() {
  window.location.href = "student-order.html";
}

// CATEGORY FILTER
function filterCategory(category, btn) {
  document.querySelectorAll(".category-tabs button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".menu-category").forEach(cat => {
    cat.style.display = cat.dataset.category === category ? "block" : "none";
  });
}

// Initial render
renderCart();
filterCategory("breakfast", document.querySelector(".category-tabs button"));
