// ==============================
// CANTEEN ORDERS DASHBOARD
// ==============================

const ordersBody = document.getElementById("ordersBody");

// Get orders from localStorage
function getOrders() {
  return JSON.parse(localStorage.getItem("studentOrders")) || [];
}

// Save orders to localStorage
function saveOrders(orders) {
  localStorage.setItem("studentOrders", JSON.stringify(orders));
}

// Render orders table
function renderOrders() {
  const orders = getOrders();
  ordersBody.innerHTML = "";

  if (orders.length === 0) {
    ordersBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; font-weight:600;">No orders yet</td>
      </tr>
    `;
    return;
  }

  orders.forEach(order => {
    const row = document.createElement("tr");

    const itemsText = order.items.map(i => `${i.name} x${i.quantity}`).join(", ");

    row.innerHTML = `
      <td>#${order.orderNo}</td>
      <td>${order.student}</td>
      <td>${itemsText}</td>
      <td>₹${order.total}</td>
      <td>
        <select onchange="changeStatus('${order.orderNo}', this.value)">
          ${["Pending","Preparing","Ready","Collected","Paid"]
            .map(s => `<option value="${s}" ${order.status === s ? "selected" : ""}>${s}</option>`).join("")}
        </select>
      </td>
      <td>
        ${order.status === "Pending" ? `<button onclick="markReady('${order.orderNo}')">Mark Ready</button>` : ""}
      </td>
    `;

    ordersBody.appendChild(row);
  });
}

// Change order status
function changeStatus(orderNo, newStatus) {
  const orders = getOrders();
  const updatedOrders = orders.map(o => o.orderNo.toString() === orderNo.toString() ? {...o, status: newStatus} : o);
  saveOrders(updatedOrders);
  renderOrders();
}

// Quick action button
function markReady(orderNo) {
  changeStatus(orderNo.toString(), "Ready");
}

// Optional: Add a sample order
document.querySelector(".add-order-btn")?.addEventListener("click", () => {
  const orders = getOrders();
  const newOrder = {
    orderNo: Date.now().toString(), // ✅ convert to string
    student: "Test Student",
    items: [{ name: "Veg Sandwich", quantity: 1, price: 60 }],
    total: 60,
    status: "Pending"
  };
  orders.push(newOrder);
  saveOrders(orders);
  renderOrders();
});

// Auto-refresh every 2 seconds to show live incoming orders
setInterval(renderOrders, 2000);

// Initial render
renderOrders();
