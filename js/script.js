
class TypeWriter {
  constructor(txtElement, words, wait = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullText = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullText) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 300;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init App
function init() {
  const txtElement = document.querySelector('#roleTypeWriter');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

const parallax = document.querySelectorAll(".main-content");
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax.forEach(function (prllx, i) {
    prllx.style.backgroundPositionY = (offset - prllx.offsetTop) * 0.7 + "px";
  })
})

let calcScrollValue = () => {
  let scrollProgress = document.querySelector('#scroll__progress');

  let scrollPosition = document.documentElement.scrollTop;
  let calcScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollValue = Math.round((scrollPosition * 100) / calcScrollHeight);

  document.querySelector('header').classList.toggle('sticky', window.scrollY > 10);

  scrollProgress.style.display = scrollPosition > 100 ? 'grid' : 'none';
  scrollProgress.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#006c6c ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}
let sections = document.querySelectorAll('section');
let links = document.querySelectorAll('.nav-link-item');
let navMenuActive = () => {
  let sectionsCount = sections.length;
  while (--sectionsCount && window.scrollY +150 < sections[sectionsCount].offsetTop){}
  links.forEach(link => link.classList.remove('active'));
  links[sectionsCount].classList.add('active');
}
window.onscroll = function () { calcScrollValue(),navMenuActive() };

document.addEventListener("DOMContentLoaded", function () {

  init();

  // Card Tilt Initiation
  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
  });

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create(
    {
      trigger: ".skills",
      onEnter: function () { startSkillsAnimations('.skills') },
      onEnterBack: function () { startSkillsAnimations('.skills') },
      onLeave: function () { stopSkillsAnimations('.skills') },
      onLeaveBack: function () { stopSkillsAnimations('.skills') }
    }
  );
  gsap.utils.toArray('.reveal').forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    // Scroll Trigger Slide Reveal Animation
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () { gsapSlideRevealAnimation(elem) },
      onEnterBack: function () { gsapSlideRevealAnimation(elem, -1) },
      onLeave: function () { hide(elem) }, // assure that the element is hidden when scrolled into view
      onLeaveBack: function () { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });


});

let startSkillsAnimations = (elem) => {
  unHide(elem);
  document.querySelector('.html').classList.add('animate');
  document.querySelector('.css').classList.add('animate');
  document.querySelector('.Python').classList.add('animate');
  document.querySelector('.Csharp').classList.add('animate');
  document.querySelector('.Blender').classList.add('animate');
}

let stopSkillsAnimations = (elem) => {
  hide(elem);
  document.querySelector('.html').classList.remove('animate');
  document.querySelector('.css').classList.remove('animate');
  document.querySelector('.Python').classList.remove('animate');
  document.querySelector('.Csharp').classList.remove('animate');
  document.querySelector('.Blender').classList.remove('animate');
}

// Hide Element for GSAP Animation
let hide = (elem) => {
  gsap.set(elem, { autoAlpha: 0 });
}

// UnHide Element for GSAP Animation
let unHide = (elem) => {
  gsap.set(elem, { autoAlpha: 1 });
}