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
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  $(document).ready(function () {
    // Isotope Initialization
    var $container = $('.isotope-container').isotope({
      itemSelector: '.item',
      layoutMode: 'masonry',
    });

    // Filter items on button click
    $('.filter-button').click(function () {
      var filterValue = $(this).attr('data-filter');
      if (filterValue === '*') {
        $container.isotope({ filter: '*' });
      } else {
        $container.isotope({ filter: filterValue });
      }
      $('.filter-button').removeClass('active');
      $(this).addClass('active');
    });

    // Video Modal
    var $videoSrc;
    $('.play-btn').click(function () {
      $videoSrc = $(this).data("src");
    });

    $('#myModal').on('shown.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })

    $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc);
    })

    // Swiper Initialization
    var sliderSwiper = new Swiper(".slider", {
      effect: "fade",
    });

    var boxSwiper = new Swiper(".boxes-swiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: ".boxes-slider-button-next",
        prevEl: ".boxes-slider-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
      },
    });
 

    var gallerySwiper = new Swiper(".gallery-swiper", {
      effect: "fade",
      loop:true,
      navigation: {
        nextEl: ".gallery-slider-button-next",
        prevEl: ".gallery-slider-button-prev",
      },
    });

    var productSwiper = new Swiper(".product-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".product-slider-button-next",
        prevEl: ".product-slider-button-prev",
    }});

    
  
   // VALUES SWIPER

 function initSwiperValues() {
  document
    .querySelectorAll(".init-swiper-values")
    .forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      const dotsContainer = swiperElement
        .closest("section")
        .querySelector(".js-custom-dots");
      if (!dotsContainer) return;

      const customDots = dotsContainer.querySelectorAll("a");

      delete config.pagination;

      const swiperInstance = new Swiper(swiperElement, config);

      swiperInstance.on("slideChange", function() {
        updateSwiperValuesPagination(swiperInstance, customDots);
      });

      customDots.forEach((dot, index) => {
        dot.addEventListener("click", function(e) {
          e.preventDefault();
          swiperInstance.slideToLoop(index);
          updateSwiperValuesPagination(swiperInstance, customDots);
        });
      });

      updateSwiperValuesPagination(swiperInstance, customDots);
    });
}

function updateSwiperValuesPagination(swiperInstance, customDots) {
  const activeIndex = swiperInstance.realIndex;
  customDots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

window.addEventListener("load", initSwiperValues);

    
    // Preloader
    initPreloader();

    // Chocolat
    initChocolat();

    // Animate on Scroll
    AOS.init({
      duration: 1000,
      once: true,
    });

  });
})(jQuery);




// TRABALHO DE GRUPO 2

// Pop-up Cookies
function closePopup() {
  document.getElementById('popup-cookies').style.display = "none";
}

window.onload = function () {
  document.getElementById('popup-cookies').style.display = "flex";
};

// Dados pessoais
async function fill() {
  let data = await LoadData("info-cliente.json");
  document.getElementById ("name"). value = data.name;
  document.getElementById ("home"). value = data.home.street + " . " + data.home.number;
  document.getElementById ("email"). value = data.email;
  document.getElementById ("phone"). value = data.phone;

  async function LoadData(file) {
    let obj = await fetch(file);
    let data = await obj.json();
    return data;
  }
}

// Book Wishlist

var numbook = 0;
function addNewBook() {
  numbook++;
  idbook = "book" + numbook;
  newbook =  '<div id="'+idbook+'" class="input-group mb-1"><span class="form-control">';
  newbook += document.getElementById("newbook").value + '<span></div>';
  document.getElementById("books").innerHTML += newbook;
}


const elemImages = document.getElementById("image-container"); // Seleciona a div pelo ID

// Função para criar uma imagem dentro de um <picture>
const createImage = (image) => {
    const elemPicture = document.createElement("picture");
    elemPicture.classList.add("picture-suggestion");

    const elemImg = document.createElement("img");
    elemImg.classList.add("img-suggestion");
    elemImg.setAttribute("src", image);

    elemPicture.appendChild(elemImg); // Adiciona a imagem ao <picture>
    return elemPicture;
};

// Função para carregar as imagens do JSON
const loadImages = (images) => {
    images.forEach((image) => {
        const imageElement = createImage(image.image); // Cria um elemento de imagem
        elemImages.appendChild(imageElement); // Adiciona a imagem à div
    });
};

// Fetch para obter o JSON com os caminhos das imagens
fetch("images.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(loadImages)

// JAVASCRIP PARA LOGIN

var user = "joana_masgalos"
var pass = "jana1234"

function login()
{
  let usr = document.getElementById("user").value;
  let pwd = document.getElementById("pass").value;

  if (usr == user && pwd == pass)
    {
  window.location.href = "my_account.html";
}
  else
  {
    alert("Hmmm! Parece que te enganaste, tenta novamente");
    location.reload();
  }
}

// SIGN UP 

function signup()
{
  let usr = document.getElementById("user").value;
  let eml = document.getElementById("email").value;
  let pwd = document.getElementById("pass").value;
  let pwd_confirm = document.getElementById("pass_confirm").value;

// VALIDAR OS CAMPOS PREENCHIDOS
if(pwd !== pwd_confirm) {
  alert("UPS! Alguma coisa está diferentes nas tuas password's, tenta novamente");
  return;
}
else
{
  alert("Conta criada com sucesso! Entra agora no clube mais cool de leitura!");
window.location.href = "login.html";
}
}

//CONTACTOS HEADER EM JSON

async function fillHeader() {
  let data = await LoadData("contacts2.json");

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

async function LoadData(file) {
  let obj = await fetch(file);
  let data = await obj.json();
  return data;
}

document.addEventListener('DOMContentLoaded', function() {
  fillHeader();
})


// CONTACTOS FOOTER EM JSON

async function fill() {
  let data = await LoadData("contacts.json");

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

async function LoadData(file) {
  let obj = await fetch(file);
  let data = await obj.json();
  return data;
}

document.addEventListener('DOMContentLoaded', function() {
  fill();
})