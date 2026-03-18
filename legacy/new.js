// Initialize particles.js
  particlesJS("particles-js", {
    "particles": {
      "number": {"value": 100, "density": {"enable": true, "value_area": 800}},
      "color": {"value": "#ffffff"},
      "shape": {"type": "circle"},
      "opacity": {"value": 0.8},
      "size": {"value": 4.5, "random": true},
      "line_linked": {"enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.5, "width": 2},
      "move": {"enable": true, "speed": 2, "out_mode": "out"}
    },
    "interactivity": {
      "events": {
        "onhover": {"enable": true, "mode": "grab"},
        "onclick": {"enable": true, "mode": "push"},
        "resize": true
      },
      "modes": {
        "grab": {"distance": 250, "line_linked": {"opacity": 1}},
        "push": {"particles_nb": 4}
      }
    },
    "retina_detect": true
  });
