/**
 * ============================================================================
 * CONSTELLATION PARTICLE PHYSICS ENGINE
 * Inspired by & elevating Akash Nayak's `akproject` Animated Dots Architecture
 * ============================================================================
 */

class ParticleEngine {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Configurable options
    this.options = Object.assign({
      particleCount: window.innerWidth < 768 ? 45 : 90,
      linkDistance: window.innerWidth < 768 ? 95 : 130,
      repulsionDistance: 120,
      repulsionStrength: 0.8,
      speedFactor: 0.5,
      nodeColor: 'rgba(0, 245, 155, 0.75)',
      secondaryNodeColor: 'rgba(6, 182, 212, 0.75)',
      linkColor: '0, 245, 155',
      interactive: true,
      glowEffect: true
    }, options);

    this.particles = [];
    this.mouse = { x: null, y: null, active: false };
    this.animationId = null;
    this.isRunning = false;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    const count = this.options.particleCount;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.options.speedFactor,
        vy: (Math.random() - 0.5) * this.options.speedFactor,
        baseRadius: Math.random() * 2 + 1.2,
        radius: Math.random() * 2 + 1.2,
        color: Math.random() > 0.4 ? this.options.nodeColor : this.options.secondaryNodeColor,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    this.handleResize = () => {
      this.resize();
      // Adjust particle count dynamically
      const targetCount = window.innerWidth < 768 ? 45 : 90;
      if (Math.abs(this.particles.length - targetCount) > 20) {
        this.options.particleCount = targetCount;
        this.createParticles();
      }
    };
    window.addEventListener('resize', this.handleResize);

    if (this.options.interactive) {
      this.handleMouseMove = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
        this.mouse.active = true;
      };

      this.handleMouseLeave = () => {
        this.mouse.active = false;
        this.mouse.x = null;
        this.mouse.y = null;
      };

      window.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  update() {
    const time = Date.now() * 0.002;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Pulse radius slightly
      p.radius = p.baseRadius + Math.sin(time + p.pulseOffset) * 0.4;

      // Screen edge bounce with wrap
      if (p.x < 0) p.x = this.width;
      else if (p.x > this.width) p.x = 0;

      if (p.y < 0) p.y = this.height;
      else if (p.y > this.height) p.y = 0;

      // Mouse repulsion physics
      if (this.mouse.active && this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.options.repulsionDistance && dist > 0) {
          const force = (this.options.repulsionDistance - dist) / this.options.repulsionDistance;
          const normalX = dx / dist;
          const normalY = dy / dist;
          p.x += normalX * force * 3 * this.options.repulsionStrength;
          p.y += normalY * force * 3 * this.options.repulsionStrength;
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Links
    const linkDist = this.options.linkDistance;
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < len; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < linkDist) {
          const alpha = (1 - dist / linkDist) * 0.35;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${this.options.linkColor}, ${alpha})`;
          this.ctx.lineWidth = 0.9;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      // Link to Mouse
      if (this.mouse.active && this.mouse.x !== null) {
        const mdx = p1.x - this.mouse.x;
        const mdy = p1.y - this.mouse.y;
        const mdist = Math.hypot(mdx, mdy);

        if (mdist < this.options.repulsionDistance * 1.2) {
          const mAlpha = (1 - mdist / (this.options.repulsionDistance * 1.2)) * 0.65;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          this.ctx.lineWidth = 1.2;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw Particles
    for (let i = 0; i < len; i++) {
      const p = this.particles[i];

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      if (this.options.glowEffect) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 245, 155, 0.06)';
        this.ctx.fill();
      }
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.loop());
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      return false;
    } else {
      this.start();
      return true;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    if (this.handleMouseMove) {
      window.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }
}

// Global initialization
window.ParticleEngine = ParticleEngine;
