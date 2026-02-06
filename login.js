// Handle Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload

  // Get selected role
  const roleSelect = document.querySelector("#loginForm select");
  const role = roleSelect ? roleSelect.value : "student";

  // Redirect based on role
  if (role === "student") {
    window.location.href = "student.html";
  } else if (role === "canteen") {
    window.location.href = "canteen.html";
  } else if (role === "admin") {
    window.location.href = "admin.html";
  } else {
    alert("Please select a role before logging in.");
  }
});

// Switch Tabs
document.getElementById("loginTab").onclick = function () {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  this.classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
};

document.getElementById("registerTab").onclick = function () {
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  this.classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
};

// Toggle Password Visibility
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}
