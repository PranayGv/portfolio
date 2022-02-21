
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


// Init On DOM Load
// document.addEventListener('DOMContentLoaded', );

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

window.onscroll = function () { calcScrollValue() };

document.addEventListener("DOMContentLoaded", function() {

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
      onEnter: function () {startSkillsAnimations('.skills')},
      onEnterBack: function () {startSkillsAnimations('.skills')},
      onLeave: function () {stopSkillsAnimations('.skills')}, 
      onLeaveBack: function (){stopSkillsAnimations('.skills')}
    }
  );
  gsap.utils.toArray('.reveal').forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    // Scroll Trigger Slide Reveal Animation
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { gsapSlideRevealAnimation(elem) },
      onEnterBack: function() { gsapSlideRevealAnimation(elem, -1) },
      onLeave: function() { hide(elem) }, // assure that the element is hidden when scrolled into view
      onLeaveBack: function() { hide(elem) } // assure that the element is hidden when scrolled into view
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

// // GSAP Reveal Animation Function
function gsapSlideRevealAnimation(elem, direction) {
  direction = direction || 1;
  var x = 0, y = direction * 200;
  unHide(elem);

  if(elem.classList.contains("reveal-fromTop")) {
    x = 0;
    y = -100;
  }
  else if(elem.classList.contains("reveal-fromBottom")) {
    x = 0;
    y = 100;
  }
  else if(elem.classList.contains("reveal-fromLeft")) {
    x = -100;
    y = 0;
  }
  else if (elem.classList.contains("reveal-fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });

  document.querySelector('.html').classList.toggle('animate');
}

// Hide Element for GSAP Animation
let hide = (elem) => {
  gsap.set(elem, {autoAlpha: 0});
}

// UnHide Element for GSAP Animation
let unHide = (elem) => {
  gsap.set(elem, {autoAlpha: 1});
}