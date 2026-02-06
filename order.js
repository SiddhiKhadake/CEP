// ================================
// CANTEEN ORDERS (LIVE FROM STUDENTS)
// ================================

const ordersBody = document.getElementById("ordersBody");

// Get orders from localStorage
function getOrders() {
  return JSON.parse(localStorage.getItem("studentOrders")) || [];
}

// Save orders back
function saveOrders(orders) {
  localStorage.setItem("studentOrders", JSON.stringify(orders));
}

// Render orders in table
function renderOrders() {
  const orders = getOrders();
  ordersBody.innerHTML = "";

  if (orders.length === 0) {
    ordersBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">No incoming orders</td>
      </tr>
    `;
    return;
  }

  orders.forEach(order => {
    const row = document.createElement("tr");

    const itemsText = order.items
      .map(i => `${i.name} x${i.quantity}`)
      .join(", ");

    row.innerHTML = `
      <td>${order.orderNo}</td>
      <td>Student</td>
      <td>${itemsText}</td>
      <td>₹${order.total}</td>
      <td>${order.status}</td>
      <td>
        ${order.status === "Pending" ? `<button class="start-btn">Start</button>` : ""}
        ${order.status === "Preparing" ? `<button class="ready-btn">Ready</button>` : ""}
        ${order.status === "Ready" ? `<button class="done-btn">Collected</button>` : ""}
      </td>
    `;

    // START PREPARING
    const startBtn = row.querySelector(".start-btn");
    if (startBtn) {
      startBtn.onclick = () => updateStatus(order.orderNo, "Preparing");
    }

    // READY
    const readyBtn = row.querySelector(".ready-btn");
    if (readyBtn) {
      readyBtn.onclick = () => updateStatus(order.orderNo, "Ready");
    }

    // COLLECTED
    const doneBtn = row.querySelector(".done-btn");
    if (doneBtn) {
      doneBtn.onclick = () => updateStatus(order.orderNo, "Collected");
    }

    ordersBody.appendChild(row);
  });
}

// Update order status
function updateStatus(orderNo, newStatus) {
  const orders = getOrders();

  orders.forEach(order => {
    if (order.orderNo === orderNo) {
      order.status = newStatus;
    }
  });

  saveOrders(orders);
  renderOrders();
}

// LIVE REFRESH every 3 seconds
setInterval(renderOrders, 3000);

// Initial load
renderOrders();
