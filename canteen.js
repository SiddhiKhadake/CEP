// ===============================
// CATEGORY FILTER
// ===============================
function filterCategory(category, event) {
  const buttons = document.querySelectorAll(".category-tabs button");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  const cards = document.querySelectorAll(".food-card");
  cards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ===============================
// UPDATE SUMMARY
// ===============================
function updateSummary() {
  const cards = document.querySelectorAll(".food-card");
  let total = cards.length;
  let available = 0;

  cards.forEach(card => {
    const availability = card.querySelector(".availability").value;
    if (availability === "available") available++;
  });

  document.getElementById("totalItems").textContent = total;
  document.getElementById("availableItems").textContent = available;
  document.getElementById("unavailableItems").textContent = total - available;
}

// ===============================
// EDIT ITEM
// ===============================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    const card = e.target.closest(".food-card");
    const nameEl = card.querySelector(".item-name");
    const priceEl = card.querySelector(".item-price");

    const newName = prompt("Edit item name:", nameEl.textContent);
    if (newName) nameEl.textContent = newName;

    const newPrice = prompt("Edit item price (₹):", priceEl.textContent.replace("₹", ""));
    if (newPrice) priceEl.textContent = `₹${newPrice}`;
  }
});

// ===============================
// DELETE ITEM
// ===============================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".food-card");
    if (confirm("Are you sure you want to delete this item?")) {
      card.remove();
      updateSummary();
    }
  }
});

// ===============================
// ADD NEW ITEM
// ===============================
document.querySelector(".add-item-btn").addEventListener("click", function () {
  const name = prompt("Enter item name:");
  if (!name) return;

  const price = prompt("Enter price:");
  if (!price) return;

  const category = prompt("Enter category (breakfast / lunch / snacks / beverages):");
  if (!category) return;

  const menuGrid = document.querySelector(".menu-grid");

  const card = document.createElement("div");
  card.className = "food-card";
  card.dataset.category = category.toLowerCase();

  card.innerHTML = `
    <img src="images/default-food.png" alt="${name}">
    <div class="card-content">
      <span class="item-name">${name}</span>
      <span class="item-price">₹${price}</span>
      <select class="availability">
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  menuGrid.appendChild(card);
  updateSummary();
});

// ===============================
// AVAILABILITY CHANGE
// ===============================
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("availability")) {
    updateSummary();
  }
});

// ===============================
// INITIAL LOAD
// ===============================
updateSummary();
