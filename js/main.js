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

  // Animation audit v3: auto-enroll content blocks as reveals on pages
  // that have none (town/service/contact pages felt static)
  try {
    document.querySelectorAll(".card, .service-row, .scene-card, .expect-step, details.faq, .quote-panel, .step, .photo-card, .guarantee-inner").forEach(function (el) {
      if ((" " + el.className + " ").indexOf(" reveal ") === -1) el.classList.add("reveal");
    });
  } catch (e) { /* decorative */ }

  // Reveal-on-scroll (staggered children get an incremental delay)
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    var kids = group.querySelectorAll(".reveal");
    kids.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", (i * 0.09).toFixed(2) + "s");
    });
  });
  // Generic sibling stagger for every remaining reveal group
  try {
    var parents = [];
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (parents.indexOf(el.parentNode) === -1) parents.push(el.parentNode);
    });
    parents.forEach(function (p) {
      var i = 0;
      Array.prototype.forEach.call(p.children, function (ch) {
        if (ch.classList && ch.classList.contains("reveal") && !ch.style.getPropertyValue("--reveal-delay")) {
          ch.style.setProperty("--reveal-delay", (i * 0.08).toFixed(2) + "s");
          i++;
        }
      });
    });
  } catch (e) { /* decorative */ }
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

  // Buttery parallax on hero scene — rAF lerp, no transition lag (reduced-motion skipped)
  var media = window.matchMedia("(prefers-reduced-motion: reduce)");
  var layers = document.querySelectorAll(".parallax");
  if (layers.length && !media.matches) {
    var pCur = 0, pActive = false;
    var pTick = function () {
      var target = window.scrollY || 0;
      pCur += (target - pCur) * 0.14;
      if (Math.abs(target - pCur) < 0.15) pCur = target;
      layers.forEach(function (el) {
        var depth = parseFloat(el.getAttribute("data-depth") || "0.05");
        el.style.transform = "translateY(" + (pCur * depth).toFixed(2) + "px)";
      });
      if (pCur !== target) { window.requestAnimationFrame(pTick); } else { pActive = false; }
    };
    window.addEventListener("scroll", function () {
      if (!pActive) { pActive = true; window.requestAnimationFrame(pTick); }
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
    handle.classList.add("ba-nudge");

    var dragging = false;
    frame.addEventListener("pointerdown", function (ev) {
      dragging = true;
      handle.classList.add("ba-used");
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
      handle.classList.add("ba-used");
      if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") { setPos(pos - step); ev.preventDefault(); }
      else if (ev.key === "ArrowRight" || ev.key === "ArrowUp") { setPos(pos + step); ev.preventDefault(); }
      else if (ev.key === "Home") { setPos(0); ev.preventDefault(); }
      else if (ev.key === "End") { setPos(100); ev.preventDefault(); }
    });
  });

  /* ===== Elevation kit v2 (all decorative; each block fails safe) ===== */

  // Film-grain overlay
  try {
    var grain = document.createElement("div");
    grain.className = "grain";
    grain.setAttribute("aria-hidden", "true");
    document.body.appendChild(grain);
  } catch (e) { /* decorative */ }

  // Drifting drywall-dust motes in the hero light (canvas, injected)
  try {
    if (!media.matches) {
      document.querySelectorAll(".hero, .page-hero").forEach(function (hero) {
        var canvas = document.createElement("canvas");
        canvas.className = "dust-canvas";
        canvas.setAttribute("aria-hidden", "true");
        hero.insertBefore(canvas, hero.firstChild);
        var ctx = canvas.getContext("2d");
        if (!ctx) return;
        var W = 0, H = 0;
        function fit() {
          var w = hero.clientWidth, h = hero.clientHeight;
          if (w && h && (w !== W || h !== H)) { W = w; H = h; canvas.width = W; canvas.height = H; }
        }
        fit();
        var COUNT = Math.max(26, Math.min(60, Math.round((W || 900) / 18)));
        var motes = [];
        for (var i = 0; i < COUNT; i++) {
          motes.push({
            x: Math.random(), y: Math.random(),
            r: 0.6 + Math.random() * 1.9,
            s: 0.12 + Math.random() * 0.3,
            a: 0.1 + Math.random() * 0.35,
            p: Math.random() * Math.PI * 2,
            w: 0.4 + Math.random() * 0.9
          });
        }
        var running = true;
        function frame() {
          fit();
          if (W && H) {
            ctx.clearRect(0, 0, W, H);
            for (var j = 0; j < motes.length; j++) {
              var m = motes[j];
              m.y -= m.s / H;
              m.p += 0.012;
              if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); }
              var x = m.x * W + Math.sin(m.p) * (m.w * 8);
              var y = m.y * H;
              var g = ctx.createRadialGradient(x, y, 0, x, y, m.r * 4);
              g.addColorStop(0, "rgba(255,236,170," + m.a.toFixed(3) + ")");
              g.addColorStop(1, "rgba(255,236,170,0)");
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(x, y, m.r * 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          if (running) window.requestAnimationFrame(frame);
        }
        if ("IntersectionObserver" in window) {
          new IntersectionObserver(function (entries) {
            var now = entries[0].isIntersecting;
            if (now && !running) { running = true; window.requestAnimationFrame(frame); }
            else if (!now) { running = false; }
          }, { threshold: 0 }).observe(hero);
        }
        window.requestAnimationFrame(frame);
        window.addEventListener("resize", fit);
      });
    }
  } catch (e) { /* decorative */ }

  // 3D tilt on cards — fine pointers only, reduced-motion respected
  try {
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (fine.matches && !media.matches) {
      document.querySelectorAll(".card, .scene-card").forEach(function (el) {
        el.classList.add("tilt");
        el.addEventListener("pointermove", function (ev) {
          var r = el.getBoundingClientRect();
          var rx = ((ev.clientY - r.top) / r.height - 0.5) * -5;
          var ry = ((ev.clientX - r.left) / r.width - 0.5) * 5;
          el.style.transform = "perspective(760px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-6px)";
        });
        el.addEventListener("pointerleave", function () { el.style.transform = ""; });
      });
    }
  } catch (e) { /* decorative */ }

})();
