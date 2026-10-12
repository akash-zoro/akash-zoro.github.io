/**
 * ============================================================================
 * AKASH NAYAK PORTFOLIO — CLIENT-SIDE LOGIC & INTERACTIONS
 * Zero External Dependencies • Pure Vanilla JavaScript
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Main Background Constellation Canvas
  const bgCanvas = document.getElementById('bg-canvas');
  let bgEngine = null;
  if (bgCanvas && window.ParticleEngine) {
    bgEngine = new ParticleEngine(bgCanvas, {
      particleCount: window.innerWidth < 768 ? 40 : 85,
      linkDistance: 130,
      repulsionDistance: 120,
      glowEffect: true
    });
  }

  // Particle Toggle Button
  const particleToggleBtn = document.getElementById('particle-toggle-btn');
  if (particleToggleBtn && bgEngine) {
    particleToggleBtn.addEventListener('click', () => {
      const active = bgEngine.toggle();
      particleToggleBtn.style.color = active ? 'var(--accent-emerald-bright)' : 'var(--text-muted)';
      particleToggleBtn.title = active ? 'Disable background particles' : 'Enable background particles';
    });
  }

  // 2. Mini Preview Canvas on Project Card
  const miniCanvas = document.getElementById('mini-preview-canvas');
  if (miniCanvas && window.ParticleEngine) {
    new ParticleEngine(miniCanvas, {
      particleCount: 30,
      linkDistance: 80,
      repulsionDistance: 90,
      speedFactor: 0.7,
      interactive: true,
      glowEffect: false
    });
  }

  // 3. Dynamic Typing Subheadline Effect
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      "Modern Web Experiences",
      "Creative Canvas Physics",
      "Responsive Frontend UIs",
      "Clean Semantic Markup"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIdx];
      
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 45;
      } else {
        typingElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2200; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // 4. 3D Tilt Effect on Hero Hologram Card
  const holoCard = document.getElementById('hologram-card');
  if (holoCard && window.innerWidth > 992) {
    holoCard.addEventListener('mousemove', (e) => {
      const rect = holoCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      holoCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    holoCard.addEventListener('mouseleave', () => {
      holoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 5. Skills Category Filter Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 6. Navigation Bar Scroll Spy & Sticky Styling
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar Scrolled Glass
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Spy Active Item
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 7. Mobile Navigation Drawer Toggle
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
    if (isOpen) {
      mobileDrawer.classList.add('active');
      menuToggleBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('active');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (menuToggleBtn && mobileDrawer) {
    menuToggleBtn.addEventListener('click', () => toggleMobileMenu());

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleMobileMenu(false);
      }
    });
  }

  // 8. Copy to Clipboard Utility
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const contactRowEmail = document.getElementById('contact-row-email');
  const contactEmailDisplay = document.getElementById('contact-email-display');
  const targetEmail = 'akash.nayak.connect@gmail.com';
  
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(targetEmail).then(() => {
        const original = copyText.textContent;
        copyText.textContent = 'Copied to Clipboard! ✓';
        copyBtn.style.borderColor = 'var(--accent-emerald-bright)';
        setTimeout(() => {
          copyText.textContent = original;
          copyBtn.style.borderColor = '';
        }, 2200);
      }).catch(() => {
        copyText.textContent = targetEmail;
      });
    });
  }

  if (contactRowEmail && contactEmailDisplay) {
    const handleEmailCopy = () => {
      navigator.clipboard.writeText(targetEmail).then(() => {
        const original = contactEmailDisplay.textContent;
        contactEmailDisplay.textContent = 'Copied to Clipboard! ✓';
        contactEmailDisplay.style.color = 'var(--accent-emerald-bright)';
        contactRowEmail.style.borderColor = 'var(--accent-emerald-bright)';
        setTimeout(() => {
          contactEmailDisplay.textContent = original;
          contactEmailDisplay.style.color = '';
          contactRowEmail.style.borderColor = '';
        }, 2200);
      }).catch(() => {
        window.location.href = `mailto:${targetEmail}`;
      });
    };

    contactRowEmail.addEventListener('click', handleEmailCopy);
    contactRowEmail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEmailCopy();
      }
    });
  }

  // 9. Interactive Project Modal Dialog
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const projectDemoButtons = document.querySelectorAll('.project-demo-btn');

  let activeModalEngine = null;

  function openProjectModal(projectKey) {
    if (!modal) return;
    
    // Clean up previous instance
    if (activeModalEngine) {
      activeModalEngine.destroy();
      activeModalEngine = null;
    }

    if (projectKey === 'constellation') {
      modalTitle.textContent = 'Interactive Particle Engine Playground (akproject)';
      modalBody.innerHTML = `
        <div class="modal-demo-canvas-wrap">
          <canvas id="modal-interactive-canvas" width="750" height="340" style="width:100%; height:100%;"></canvas>
        </div>
        <div class="modal-demo-controls">
          <button type="button" class="btn btn-sm btn-primary" id="modal-add-dots">Spawn +25 Particles</button>
          <button type="button" class="btn btn-sm btn-glass" id="modal-clear-dots">Reset Grid</button>
          <span style="font-size:0.85rem; color:var(--text-muted); margin-left:auto;">
            Move mouse across canvas to interact with particles
          </span>
        </div>
        <p class="modal-demo-desc">
          This live simulation runs the completed physics engine based on <strong>akash-zoro/akproject</strong>.
          Particles dynamically calculate Euclidean distance vectors with threshold-based alpha attenuation and inverse-distance cursor repulsion.
        </p>
      `;

      modal.showModal();

      setTimeout(() => {
        const modalCanvas = document.getElementById('modal-interactive-canvas');
        if (modalCanvas && window.ParticleEngine) {
          activeModalEngine = new ParticleEngine(modalCanvas, {
            particleCount: 75,
            linkDistance: 110,
            repulsionDistance: 130,
            speedFactor: 0.8
          });

          // Controls
          const addBtn = document.getElementById('modal-add-dots');
          const resetBtn = document.getElementById('modal-clear-dots');

          if (addBtn) {
            addBtn.addEventListener('click', () => {
              activeModalEngine.options.particleCount += 25;
              activeModalEngine.createParticles();
            });
          }

          if (resetBtn) {
            resetBtn.addEventListener('click', () => {
              activeModalEngine.options.particleCount = 50;
              activeModalEngine.createParticles();
            });
          }
        }
      }, 50);

    } else if (projectKey === 'snooker') {
      modalTitle.textContent = 'CueMaster Snooker Club — Interactive Table Prototype';
      modalBody.innerHTML = `
        <div style="background:#04150e; border:1px solid rgba(0,245,155,0.3); border-radius:12px; padding:24px; margin-bottom:20px; text-align:center;">
          <h4 style="font-size:1.3rem; margin-bottom:8px; color:var(--accent-emerald-bright);">🏆 CueMaster Club Table Booking</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:18px;">
            Based on Akash's snooker club portal project in <code>freecodecamp-web-design</code>.
          </p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; max-width:550px; margin:0 auto 20px;">
            <div class="booking-slot" style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); cursor:pointer;" onclick="this.style.borderColor='var(--accent-emerald-bright)'; this.style.background='rgba(0,245,155,0.15)'">
              <strong>Table 1 (Championship)</strong><br><span style="font-size:0.75rem; color:#00f59b;">Available 18:00</span>
            </div>
            <div class="booking-slot" style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); cursor:pointer;" onclick="this.style.borderColor='var(--accent-emerald-bright)'; this.style.background='rgba(0,245,155,0.15)'">
              <strong>Table 2 (Club Standard)</strong><br><span style="font-size:0.75rem; color:#00f59b;">Available 19:30</span>
            </div>
            <div class="booking-slot" style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); cursor:pointer;" onclick="this.style.borderColor='var(--accent-emerald-bright)'; this.style.background='rgba(0,245,155,0.15)'">
              <strong>Table 3 (VIP Room)</strong><br><span style="font-size:0.75rem; color:#38bdf8;">Available 21:00</span>
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-primary" onclick="alert('Table reservation selected! Prototype from akash-zoro/freecodecamp-web-design.')">Confirm Slot Reservation</button>
        </div>
        <p class="modal-demo-desc">
          Created to demonstrate sports club member management, schedule booking, and mobile-friendly responsive forms.
        </p>
      `;
      modal.showModal();

    } else if (projectKey === 'nametags') {
      modalTitle.textContent = 'Digital Name Badge Generator';
      modalBody.innerHTML = `
        <div style="background:#0d1424; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:24px; margin-bottom:20px; text-align:center;">
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:16px;">
            Interactive enhancement of <code>names.html</code> from Akash's FreeCodeCamp exercises.
          </p>
          <div style="max-width:320px; margin:0 auto 20px; background:#fff; border-radius:12px; border:3px solid #ef4444; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.5);">
            <div style="background:#ef4444; color:#fff; font-weight:800; font-size:1.1rem; padding:8px 0; letter-spacing:0.05em;" id="badge-color-header">
              HELLO
            </div>
            <div style="padding:18px 12px; background:#fff;">
              <div style="font-size:0.75rem; color:#64748b; font-weight:700;">MY NAME IS</div>
              <h3 id="interactive-badge-name" style="font-size:1.7rem; color:#0f172a; margin:6px 0; font-weight:800;">Akash Nayak</h3>
              <p id="interactive-badge-role" style="font-size:0.85rem; color:#059669; font-weight:600;">Frontend Developer</p>
            </div>
          </div>
          <div style="display:flex; justify-content:center; gap:12px; max-width:400px; margin:0 auto;">
            <input type="text" id="badge-name-input" placeholder="Type a new name..." style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.2); padding:8px 14px; border-radius:6px; color:#fff; flex-grow:1;">
            <button type="button" class="btn btn-sm btn-primary" id="update-badge-btn">Update Badge</button>
          </div>
        </div>
        <p class="modal-demo-desc">
          Demonstrates dynamic DOM data-binding, typography hierarchy, and CSS component card design.
        </p>
      `;
      modal.showModal();

      setTimeout(() => {
        const input = document.getElementById('badge-name-input');
        const updateBtn = document.getElementById('update-badge-btn');
        const badgeName = document.getElementById('interactive-badge-name');
        
        if (updateBtn && input && badgeName) {
          updateBtn.addEventListener('click', () => {
            if (input.value.trim()) {
              badgeName.textContent = input.value.trim();
            }
          });
        }
      }, 50);
    }
  }

  projectDemoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = btn.dataset.project;
      openProjectModal(proj);
    });
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      if (activeModalEngine) {
        activeModalEngine.destroy();
        activeModalEngine = null;
      }
      modal.close();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (activeModalEngine) {
          activeModalEngine.destroy();
          activeModalEngine = null;
        }
        modal.close();
      }
    });
  }

  // 10. Contact Form Submission & Validation
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (isValid) {
        const subject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Inquiry from ${nameInput.value.trim()}`);
        const body = encodeURIComponent(`Hi Akash,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n\nSent from your portfolio site`);
        
        // Show Toast
        if (formToast) {
          formToast.classList.add('active');
        }

        // Open mailto trigger
        setTimeout(() => {
          window.location.href = `mailto:akash.nayak.connect@gmail.com?subject=${subject}&body=${body}`;
        }, 600);

        // Reset
        setTimeout(() => {
          contactForm.reset();
        }, 1200);
      }
    });
  }

  // Set Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
