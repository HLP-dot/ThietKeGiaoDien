document.addEventListener("DOMContentLoaded", function () {
  // === 1. SLIDER THUMBNAIL ẨN/HIỆN NÚT ===
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  let scrollAmount = 0;
  const scrollStep = 80; // điều chỉnh theo độ rộng ảnh + margin
  const maxScroll = thumbnailContainer.scrollWidth - thumbnailContainer.clientWidth;

  function updateThumbnailSlider() {
    thumbnailContainer.style.transform = `translateX(-${scrollAmount}px)`;

    // Ẩn/hiện nút
    prevBtn.style.display = scrollAmount <= 0 ? 'none' : 'flex';
    nextBtn.style.display = scrollAmount >= maxScroll ? 'none' : 'flex';
  }

  nextBtn.addEventListener('click', () => {
    scrollAmount += scrollStep;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    updateThumbnailSlider();
  });

  prevBtn.addEventListener('click', () => {
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) scrollAmount = 0;
    updateThumbnailSlider();
  });

  updateThumbnailSlider();

  // === 2. ĐÁNH DẤU ẢNH ĐANG CHỌN ===
  const productImg = document.querySelector('.product-img');
  const thumbnails = document.querySelectorAll('.thumbnail-container img');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const newSrc = thumbnail.getAttribute('src');
      productImg.setAttribute('src', newSrc);

      thumbnails.forEach(img => img.classList.remove('active'));
      thumbnail.classList.add('active');
    });
  });

  // === 3. RELATE PRODUCT SLIDER ===
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

  window.nextImage = function () {
    current = (current + 1) % images.length;
    updateImage();
  };

  window.prevImage = function () {
    current = (current - 1 + images.length) % images.length;
    updateImage();
  };
});
