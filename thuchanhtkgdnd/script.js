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
