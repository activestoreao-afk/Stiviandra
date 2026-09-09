(() => {
  "use strict";

  document.documentElement.classList.add("js-ready");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "fechar" : "menu";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "menu";
      });
    });
  }

  // Scroll reveal: graceful fallback if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Gentle cursor light on desktop.
  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches && !reducedMotion) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    window.addEventListener("pointermove", event => {
      targetX = event.clientX - 130;
      targetY = event.clientY - 130;
    }, { passive: true });

    const animateGlow = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animateGlow);
    };
    requestAnimationFrame(animateGlow);
  }

  // Subtle depth movement for universe elements.
  if (!reducedMotion) {
    const hero = document.querySelector(".hero");
    const sun = document.querySelector(".hero-sun");
    const planet = document.querySelector(".hero-planet");
    const orbit = document.querySelector(".hero-orbit-a");

    if (hero && sun && planet && orbit && window.matchMedia("(pointer:fine)").matches) {
      hero.addEventListener("pointermove", event => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        sun.style.transform = `translateX(calc(-50% + ${x * 18}px)) translateY(${y * 10}px)`;
        planet.style.transform = `translate(${x * 22}px, ${y * 18}px)`;
        orbit.style.transform = `translate(calc(-50% + ${x * 8}px), calc(-50% + ${y * 6}px)) rotate(-17deg)`;
      }, { passive: true });
    }
  }

  // Active nav section highlighting.
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Keep the site usable if an image fails.
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.alt = "Fotografia indisponível";
      img.style.minHeight = "220px";
      img.style.background = "linear-gradient(135deg,#0a1428,#172744)";
    });
  });
})();
