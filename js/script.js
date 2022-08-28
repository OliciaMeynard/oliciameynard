// 'use strict';

/////////////////////////////////////////////////////////////////////
/////////////////SELECTORS ///////////////////////////////////////////

const heroBtn = document.querySelector('.hero-btn-cta');
const modal = document.querySelector('.section-cta');
const overlay = document.querySelector('.overlay');
const closeBtnModal = document.querySelector('.btn-close-modal');
const ctaBox = document.querySelector('.cta-box');
const ctaImgBox = document.querySelector('.cta-img-box');

/////////////////////////////////////////////////////////////////////
///// SET CURRENT YEAR///////////////

// const yearEL = document.querySelector(".year");
// const currentYear = new Date().getFullYear();
// // console.log(currentYear);
// yearEL.textContent = currentYear;

const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

////////////////////////////////////////////////////////////////////////
////////////// MAKE MOBILE NAVIGATION WORK /////////////////////////

// const btnNavEL = document.querySelector(".btn-mobile-nav");
// const headerEL = document.querySelector(".header");
// btnNavEL.addEventListener("click", function () {
//   headerEL.classList.toggle("nav-open");
// });

const btnNav = document.querySelector('.btn-mobile-nav');
const outerNav = document.querySelector('.outer-nav');
btnNav.addEventListener('click', function () {
  outerNav.classList.toggle('nav-open');
  overlay.classList.add('hidden');
});

///////////////////////////////////////////////////////////////////
//////////////// MAKE LINKS WORK SMOOTH SCROLL /////////////////////////////////
// const allLinks = document.querySelectorAll('a:link');
// allLinks.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = link.getAttribute('href');

//     //scroll back to top
//     if (href === '#')
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });

//     if (href !== '#' && href.startsWith('#')) {
//       const sectionEL = document.querySelector(href);
//       sectionEL.scrollIntoView({ behavior: 'smooth' });
//     }
//     if (link.classList.contains('nav-link'))
//       outerNav.classList.toggle('nav-open');
//   });
// });

document.querySelector('.outer-nav').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    outerNav.classList.remove('nav-open');
  }
});

////////////////////////////////////////////////////////////////
///////////////STICKY NAVIGATION////////////////////////////////

const sectionHeadEl = document.querySelector('.header');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);

    if (ent.isIntersecting === false) {
      document.querySelector('.header').classList.add('sticky');
      // document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.querySelector('.header').classList.remove('sticky');
      // document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport //
    root: null,
    threshold: 0,
    rootMargin: '-144px',
  }
);
obs.observe(sectionHeadEl);

/*********************************************/

/********************************* */
// MODAL
/********************* */

const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.remove('cta-modal');
  closeBtnModal.classList.add('hidden');
  ctaBox.classList.add('grid');
  ctaBox.classList.add('grid');
};
const openModal = function () {
  modal.classList.add('cta-modal');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  closeBtnModal.classList.remove('hidden');
  ctaBox.classList.remove('grid');

  modal.style.paddingTop = '0';
  modal.style.paddingBottom = '0';
};

heroBtn.addEventListener('click', openModal);
closeBtnModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log('A key wass pressed', e);
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    // modal.classList.add('hidden');
    // overlay.classList.add('hidden');

    closeModal();
  }
});

/********************************* */
// TABS SECTION
/********************* */
const btnProjects = document.querySelectorAll('.btn-projects');
const tabContent = document.querySelectorAll('.tab-content');
const divBtns = document.querySelector('.div-buttons');

divBtns.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.btn-projects');
  console.log(clicked);

  if (!clicked) return;
  btnProjects.forEach(b => b.classList.remove('btn-projects-active'));
  tabContent.forEach(t => t.classList.remove('tab-content-active'));

  clicked.classList.add('btn-projects-active');

  document
    .querySelector(`.tab-content-${clicked.dataset.tab}`)
    .classList.add('tab-content-active');
});

///////////////////////////////////////////////////////////////
////////////////REVEALING ELEMENTS ON SCROLL////////////////////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////////////////////////
////////////////SLIDER////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  //CREATING DOTS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot"
    data-slide="${i}"></button>`
      );
    });
  };

  createDots();

  //FUNCTION FOR ACTIVE DOT
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  ///FOR DEBUGGING
  // slider.style.transform = 'scale(0.4) translateX(-600px)';
  // slider.style.overflow = 'visible';
  //0, 100%, 200%, 300%

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      //// -1 because it will still slide one more time even if there is nothing left to slide
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    activeDot(0);
  };
  init();

  //EVENT HANDLERS
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  //KEYBOARD EVENTS
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  ///EVENT FOR THE DOTS
  dotContainer.addEventListener('click', function (e) {
    // e.preventDefault();
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset;
      // console.log(slide); //output DOMStringMap {slide: '1'}
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });

  // h1.addEventListener('mouseenter', alertH1);
  // setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

  setInterval(() => {
    nextSlide(curSlide);
  }, 2000);
};
slider();

// ////////////////////////////////////////////////////////////////
// ////////////////VIDEO POPUP////////////////////////////////////
// const popUpVid = document.querySelector('.popup-video');
// const videoContainerVid = document.querySelectorAll('.video-container video');
// const vidCloseBtn = document.querySelector('.vid-close-btn');

// videoContainerVid.forEach(vid => {
//   vid.addEventListener('click', function (e) {
//     e.preventDefault();
//     popUpVid.style.display = 'block';
//     document.querySelector('.popup-video video').src = vid.getAttribute('src');
//     overlay.classList.remove('hidden');
//   });
// });

// const closeVid = function () {
//   popUpVid.style.display = 'none';
//   overlay.classList.add('hidden');
//   document.querySelector('.popup-video video').src = '';
// };

// vidCloseBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   closeVid();
// });

// ////Function overlay
// popUpVid.addEventListener('click', function () {
//   closeVid();
// });

////////////////////////////////////////////////////////////////
////////////////VIDEO POPUP////////////////////////////////////
const popUpVid = document.querySelector('.popup-video');
const thumb = document.querySelectorAll('.thumb');
const vidCloseBtn = document.querySelector('.vid-close-btn');

thumb.forEach(vid => {
  vid.addEventListener('click', function (e) {
    const clicked = e.target.closest('.thumb');
    // console.log('click');
    // console.log(clicked.dataset.src);
    popUpVid.style.display = 'block';
    document.querySelector('.popup-video video').src = clicked.dataset.src;
    overlay.classList.remove('hidden');
  });
});

const closeVid = function () {
  popUpVid.style.display = 'none';
  overlay.classList.add('hidden');
  document.querySelector('.popup-video video').src = '';
};

vidCloseBtn.addEventListener('click', function (e) {
  e.preventDefault();
  closeVid();
});

////Function overlay
popUpVid.addEventListener('click', function () {
  closeVid();
});

////////////////////////////////////////////////////////////////
////////////////IMG POPUP////////////////////////////////////
const popUpImg = document.querySelector('.popup-img');
const imgPop = document.querySelectorAll('.imgPop');
const imgCloseBtn = document.querySelector('.img-close-btn');
const imgPopUp = document.querySelector('.imgPopUp');

imgPop.forEach(img => {
  img.addEventListener('click', function (e) {
    const clicked = e.target.closest('.imgPop');

    // console.log(clicked.getAttribute('src'));
    imgPopUp.src = clicked.getAttribute('src');
    popUpImg.style.display = 'block';
    overlay.classList.remove('hidden');
  });
});

const closeImg = function () {
  popUpImg.style.display = 'none';
  overlay.classList.add('hidden');
};

imgCloseBtn.addEventListener('click', closeImg);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeVid();
    closeImg();
  }
});

popUpImg.addEventListener('click', closeImg);
////////////////////////////////////////////////////////////////
////////////////WEB POPUP////////////////////////////////////
const popupWeb = document.querySelector('.popup-web');
const webPop = document.querySelectorAll('.webPop');
const webCloseBtn = document.querySelector('.web-close-btn');
const webpopImg = document.querySelector('.web-pop');
const popLink = document.querySelector('.pop-link');

webPop.forEach(img => {
  img.addEventListener('click', function (e) {
    const clicked = e.target.closest('.webPop');

    // console.log(clicked.getAttribute('src'));
    webpopImg.src = clicked.getAttribute('src');
    popLink.href = clicked.dataset.webhref;
    // data-web-src
    popupWeb.style.display = 'block';
    overlay.classList.remove('hidden');
  });
});

const closeWeb = function () {
  popupWeb.style.display = 'none';
  overlay.classList.add('hidden');
};

webCloseBtn.addEventListener('click', closeWeb);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeVid();
    closeWeb();
    closeImg();
  }
});

popupWeb.addEventListener('click', closeWeb);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
} */
