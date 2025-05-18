import anime from 'animejs';

// Problems table slide-in animation
const animateProblemsTable = () => {
  anime({
    targets: '.problems-table td.slide-left',
    opacity: [0, 1],
    translateX: [-60, 0],
    duration: 900,
    easing: 'easeOutExpo',
    delay: anime.stagger(200, {start: 200})
  });
  anime({
    targets: '.problems-table td.slide-right',
    opacity: [0, 1],
    translateX: [60, 0],
    duration: 900,
    easing: 'easeOutExpo',
    delay: anime.stagger(200, {start: 300})
  });
};

// Tech steps scroll-in animation
const animateTechSteps = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateX: [entry.target.dataset.aos === 'fade-left' ? 60 : -60, 0],
          duration: 900,
          easing: 'easeOutExpo',
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.tech-step').forEach(step => observer.observe(step));
};

// Counter animation
const animateCounters = () => {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        anime({
          targets: counter,
          innerHTML: [0, target],
          round: 1,
          duration: 2000,
          easing: 'easeInOutExpo'
        });
        counterObserver.unobserve(counter);
      }
    });
  });
  document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));
};

// Prevent auto-scroll to anchor on load
const preventAutoScroll = () => {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  preventAutoScroll();
  animateProblemsTable();
  animateTechSteps();
  animateCounters();
});