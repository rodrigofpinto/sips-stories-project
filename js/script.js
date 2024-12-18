(function ($) {
  "use strict";

  var initPreloader = function () {
    $(document).ready(function () {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).on('load', function () {
      $('.preloader').fadeOut();
      $('body').removeClass('preloader-site');
    });
  };

  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    });
  };

  $(document).ready(function () {
    var $container = $('.isotope-container').isotope({
      itemSelector: '.item',
      layoutMode: 'masonry',
    });

    $('.filter-button').click(function () {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue === '*' ? '*' : filterValue });
      $('.filter-button').removeClass('active');
      $(this).addClass('active');
    });

    var $videoSrc;
    $('.play-btn').click(function () {
      $videoSrc = $(this).data("src");
    });

    $('#myModal').on('shown.bs.modal', function () {
      $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });

    $('#myModal').on('hide.bs.modal', function () {
      $("#video").attr('src', $videoSrc);
    });

    var initSwiper = function () {
      new Swiper(".slider", { effect: "fade" });

      new Swiper(".boxes-swiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: ".boxes-slider-button-next",
          prevEl: ".boxes-slider-button-prev",
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        },
      });

      new Swiper(".gallery-swiper", {
        effect: "fade",
        loop: true,
        navigation: {
          nextEl: ".gallery-slider-button-next",
          prevEl: ".gallery-slider-button-prev",
        },
      });

      new Swiper(".product-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".product-slider-button-next",
          prevEl: ".product-slider-button-prev",
        },
      });
    };

    var initSwiperValues = function () {
      document.querySelectorAll(".init-swiper-values").forEach(function (swiperElement) {
        let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
        const dotsContainer = swiperElement.closest("section").querySelector(".js-custom-dots");
        if (!dotsContainer) return;

        const customDots = dotsContainer.querySelectorAll("a");
        delete config.pagination;

        const swiperInstance = new Swiper(swiperElement, config);

        swiperInstance.on("slideChange", function () {
          updateSwiperValuesPagination(swiperInstance, customDots);
        });

        customDots.forEach((dot, index) => {
          dot.addEventListener("click", function (e) {
            e.preventDefault();
            swiperInstance.slideToLoop(index);
            updateSwiperValuesPagination(swiperInstance, customDots);
          });
        });

        updateSwiperValuesPagination(swiperInstance, customDots);
      });
    };

    var updateSwiperValuesPagination = function (swiperInstance, customDots) {
      const activeIndex = swiperInstance.realIndex;
      customDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    };

    window.addEventListener("load", initSwiperValues);

    initPreloader();
    initChocolat();

    AOS.init({
      duration: 1000,
      once: true,
    });

    initSwiper();
  });
})(jQuery);

// TRABALHO DE GRUPO 2

function closePopup() {
  document.getElementById('popup-cookies').style.display = "none";
}

window.onload = function () {
  document.getElementById('popup-cookies').style.display = "flex";
};

async function fillClientInfo() {
  let data = await loadJSONData("../info-cliente.json");
  document.getElementById("dpname").value = data.name;
  document.getElementById("dphome").value = data.home.street + " . " + data.home.number;
  document.getElementById("dpemail").value = data.email;
  document.getElementById("dpphone").value = data.phone;
}

async function loadJSONData(file) {
  let obj = await fetch(file);
  let data = await obj.json();
  return data;
}

var numbook = 0;

function addNewBook() {
  numbook++;
  const bookInput = document.getElementById("newbook");
  const bookValue = bookInput.value.trim();

  if (bookValue === "") {
    alert("Por favor, adicione o nome do livro antes de submeter.");
    return;
  }

  const idbook = "book" + numbook;
  const newbook = `
    <div id="${idbook}" class="input-group mb-1"> 
      <span class="form-control">${bookValue}</span>
    </div>
  `;

  document.getElementById("books").innerHTML += newbook;
  bookInput.value = "";
}

const elemImages = document.getElementById("image-container");

const createImage = (image) => {
  const elemPicture = document.createElement("picture");
  elemPicture.classList.add("picture-suggestion");

  const elemImg = document.createElement("img");
  elemImg.classList.add("img-suggestion");
  elemImg.setAttribute("src", image);

  elemPicture.appendChild(elemImg);
  return elemPicture;
};

const loadImages = (images) => {
  images.forEach((image) => {
    const imageElement = createImage(image.image);
    elemImages.appendChild(imageElement);
  });
};

fetch("images.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(loadImages);

var user = "joana_masgalos";
var pass = "jana1234";

function login() {
  let usr = document.getElementById("user").value;
  let pwd = document.getElementById("pass").value;

  if (usr === user && pwd === pass) {
    window.location.href = "my_account.html";
  } else {
    alert("Hmmm! Parece que te enganaste, tenta novamente");
    location.reload();
  }
}

function signup() {
  let usr = document.getElementById("user").value;
  let eml = document.getElementById("email").value;
  let pwd = document.getElementById("pass").value;
  let pwd_confirm = document.getElementById("pass_confirm").value;

  if (pwd !== pwd_confirm) {
    alert("UPS! Alguma coisa está diferentes nas tuas password's, tenta novamente");
    return;
  } else {
    alert("Conta criada com sucesso! Entra agora no clube mais cool de leitura!");
    window.location.href = "login.html";
  }
}

async function fillFooterContacts() {
  let data = await loadJSONData("contacts.json");

  document.getElementById("contacts-address").innerHTML = `
    <svg class="color me-1" width="15" height="15">
      <use xlink:href="#location"></use>
    </svg>
    ${data.address}
  `;
  document.getElementById("contacts-phone").innerHTML = `
    <svg class="color me-1" width="15" height="15">
      <use xlink:href="#phone"></use>
    </svg>
    ${data.phone}
  `;
  document.getElementById("contacts-email").innerHTML = `
    <svg class="color me-1" width="15" height="15">
      <use xlink:href="#email"></use>
    </svg>
    ${data.email}
  `;
}

document.addEventListener('DOMContentLoaded', fillFooterContacts);

async function fillHeaderContacts() {
  let data = await loadJSONData("contacts2.json");

  document.getElementById("contacts2-address").innerHTML = `
    <svg class="color me-1" width="15" height="15">
      <use xlink:href="#location"></use>
    </svg>
    ${data.address}
  `;
  document.getElementById("contacts2-phone").innerHTML = `
    <svg class="color me-1" width="15" height="15">
      <use xlink:href="#phone"></use>
    </svg>
    ${data.phone}
  `;
  document.getElementById("contacts2-email").innerHTML = `
    <svg class="color me-1" width="15" height="15">
      <use xlink:href="#email"></use>
    </svg>
    ${data.email}
  `;
}

document.addEventListener('DOMContentLoaded', fillHeaderContacts);
