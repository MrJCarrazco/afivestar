/* A Five Drywall — site interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is chosen
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal-on-scroll (staggered children get an incremental delay)
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    var kids = group.querySelectorAll(".reveal");
    kids.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", (i * 0.09).toFixed(2) + "s");
    });
  });
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Subtle parallax on hero scene (skipped for reduced-motion users)
  var media = window.matchMedia("(prefers-reduced-motion: reduce)");
  var layers = document.querySelectorAll(".parallax");
  if (layers.length && !media.matches) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        layers.forEach(function (el) {
          var depth = parseFloat(el.getAttribute("data-depth") || "0.05");
          el.style.transform = "translateY(" + (y * depth).toFixed(1) + "px)";
        });
        ticking = false;
      });
    }, { passive: true });
  }

  // Before/After compare slider (pointer events + keyboard)
  document.querySelectorAll("[data-ba]").forEach(function (frame) {
    var handle = frame.querySelector(".ba-handle");
    if (!handle) return;
    var pos = 50;

    function setPos(pct) {
      pos = Math.max(0, Math.min(100, pct));
      frame.style.setProperty("--ba-pos", pos + "%");
      handle.setAttribute("aria-valuenow", String(Math.round(pos)));
    }

    function posFromEvent(ev) {
      var rect = frame.getBoundingClientRect();
      return ((ev.clientX - rect.left) / rect.width) * 100;
    }

    setPos(50);

    var dragging = false;
    frame.addEventListener("pointerdown", function (ev) {
      dragging = true;
      frame.setPointerCapture(ev.pointerId);
      setPos(posFromEvent(ev));
      ev.preventDefault();
    });
    frame.addEventListener("pointermove", function (ev) {
      if (dragging) setPos(posFromEvent(ev));
    });
    function stop(ev) {
      dragging = false;
      if (frame.hasPointerCapture && frame.hasPointerCapture(ev.pointerId)) {
        frame.releasePointerCapture(ev.pointerId);
      }
    }
    frame.addEventListener("pointerup", stop);
    frame.addEventListener("pointercancel", stop);

    handle.addEventListener("keydown", function (ev) {
      var step = ev.shiftKey ? 10 : 4;
      if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") { setPos(pos - step); ev.preventDefault(); }
      else if (ev.key === "ArrowRight" || ev.key === "ArrowUp") { setPos(pos + step); ev.preventDefault(); }
      else if (ev.key === "Home") { setPos(0); ev.preventDefault(); }
      else if (ev.key === "End") { setPos(100); ev.preventDefault(); }
    });
  });
})();
