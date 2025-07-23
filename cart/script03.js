document.addEventListener("DOMContentLoaded", function () {
  // --- PHẦN GIỎ HÀNG ---
  const quantityEl = document.getElementById("quantity");
  const priceDisplay = document.getElementById("price-display");
  const itemText = document.getElementById("item-text");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  const btnIncrease = document.getElementById("btn-increase");
  const btnDecrease = document.getElementById("btn-decrease");

  const unitPrice = 4659000;

  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  function updateDisplay(quantity) {
    quantityEl.innerText = quantity;

    const totalPrice = unitPrice * quantity;

    priceDisplay.innerText = formatCurrency(totalPrice);
    subtotalEl.innerText = formatCurrency(totalPrice);
    totalEl.innerText = formatCurrency(totalPrice);

    itemText.innerText = quantity > 1 ? `${quantity} items` : `${quantity} item`;
  }

  btnIncrease.addEventListener("click", () => {
    let current = parseInt(quantityEl.innerText);
    current++;
    updateDisplay(current);
  });

  btnDecrease.addEventListener("click", () => {
    let current = parseInt(quantityEl.innerText);
    if (current > 1) {
      current--;
      updateDisplay(current);
    }
  });

  
});
