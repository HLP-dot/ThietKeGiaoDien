document.addEventListener("DOMContentLoaded", function () {
  updateCartSummary();

  // Xử lý nút xóa sản phẩm
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = this.closest(".cart-item");
      if (item) {
        item.remove();
        updateCartSummary();
      }
    });
  });

  // Xử lý nút yêu thích ♥
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("liked");
      this.style.color = this.classList.contains("liked") ? "red" : "";
    });
  });

  // Xử lý nút tăng/giảm số lượng
  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = this.closest(".cart-item");
      const qtyDisplay = item.querySelector(".quantity-display");
      let quantity = parseInt(qtyDisplay.textContent);
      qtyDisplay.textContent = ++quantity;
      updateCartSummary();
    });
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = this.closest(".cart-item");
      const qtyDisplay = item.querySelector(".quantity-display");
      let quantity = parseInt(qtyDisplay.textContent);
      if (quantity > 1) {
        qtyDisplay.textContent = --quantity;
        updateCartSummary();
      }
    });
  });
});

// Hàm cập nhật tổng số lượng và tổng tiền
function updateCartSummary() {
  const items = document.querySelectorAll(".cart-item");
  let totalItems = 0;
  let totalPrice = 0;

  items.forEach((item) => {
    const price = parseInt(item.getAttribute("data-price"));
    const quantity = parseInt(item.querySelector(".quantity-display").textContent);
    totalItems += quantity;
    totalPrice += price * quantity;
  });

  // Cập nhật số lượng item
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = `${totalItems} item${totalItems > 1 ? "s" : ""} | ${formatVND(totalPrice)}`;
  }

  // Cập nhật tổng tiền
  const subtotal = document.getElementById("subtotal");
  const total = document.getElementById("total");
  if (subtotal && total) {
    subtotal.textContent = formatVND(totalPrice);
    total.textContent = formatVND(totalPrice);
  }

  // Cập nhật icon cart nếu cần
  const cartIcon = document.querySelector(".btn-cart");
  if (cartIcon) {
    cartIcon.setAttribute("data-quantity", totalItems);
  }
}

// Hàm định dạng tiền Việt
function formatVND(number) {
  return number.toLocaleString("vi-VN") + "₫";
}
function renderCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const container = document.getElementById("cart-items");
      const totalEl = document.getElementById("total");
      container.innerHTML = "";

      if (cart.length === 0) {
        container.innerHTML = "<p style='color: #ccc;'>Giỏ hàng của bạn đang trống.</p>";
        totalEl.textContent = "Total: 0 ₫";
        return;
      }

      let total = 0;

      cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.gap = "20px";
        div.style.alignItems = "center";
        div.style.background = "#222";
        div.style.padding = "15px";
        div.style.borderRadius = "12px";

        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width:80px; border-radius: 10px;" />
          <div style="flex: 1;">
            <h4 style="margin-bottom: 5px;">${item.name}</h4>
            <p>Size: ${item.size}</p>
            <p>Price: ${item.price.toLocaleString()} ₫</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
        `;

        container.appendChild(div);
      });

      totalEl.textContent = "Total: " + total.toLocaleString() + " ₫";
    }

    document.addEventListener("DOMContentLoaded", renderCart);