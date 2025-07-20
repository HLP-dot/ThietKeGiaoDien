
// NEXT AND PREV BUTTON
const slider = document.querySelector('.slider');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  let scrollAmount = 0;

  nextBtn.addEventListener('click', () => {
    scrollAmount += 110; // ảnh 100px + margin 10px
    slider.style.transform = `translateX(-${scrollAmount}px)`;
  });

  prevBtn.addEventListener('click', () => {
    scrollAmount -= 110;
    if (scrollAmount < 0) scrollAmount = 0;
    slider.style.transform = `translateX(-${scrollAmount}px)`;
  });
// ĐÁNH DẤU HÌNH ẢNH ĐANG XEM
const productImg = document.querySelector('.product-img');
const thumbnails = document.querySelectorAll('.thumbnail-container img');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    // Đổi ảnh chính
    const newSrc = thumbnail.getAttribute('src');
    productImg.setAttribute('src', newSrc);

    // Bỏ class active ở tất cả
    thumbnails.forEach(img => img.classList.remove('active'));

    // Thêm active cho ảnh đang chọn
    thumbnail.classList.add('active');
  });
});
// RELATE PRODUCT BUTTON
 const images = [
    '../images/szn02.jpg',
    '../images/stx01.png',
    '../images/stx03.png',
    '../images/stx02.png',
    '../images/szn03.jpg',
    '../images/stx08.png',
    '../images/view03.png',
    '../images/view04.png',

  ];
  let current = 0;

  function updateImage() {
    document.getElementById('product-image').src = images[current];
  }

  function nextImage() {
    current = (current + 1) % images.length;
    updateImage();
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    updateImage();
  }