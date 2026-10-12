# Akash Nayak Portfolio — GitHub Pages Site

Welcome to the personal portfolio website for **Akash Nayak** ([@akash-zoro](https://github.com/akash-zoro)).

Built with pure, modern vanilla web standards (HTML5, CSS3, JavaScript ES6+), featuring an interactive particle constellation physics engine, glassmorphic design system, responsive architecture, and zero runtime dependencies.

---

## 🌟 Live Features

- **Constellation Particle Physics Engine**: High-performance interactive background built with the HTML5 Canvas API and Euler kinematics, complete with cursor proximity repulsion and responsive particle link boundaries.
- **3D Tilt Hologram Profile Card**: Interactive 3D perspective mouse-tracking card displaying verified developer status and dynamic code snippet.
- **Dynamic Typing Subheadline**: Automated loop cycling through core development strengths.
- **Curated Project Showcase**:
  - **Constellation Grid** (based on `akash-zoro/akproject`) with full live interactive modal simulator.
  - **CueMaster Snooker Club** (based on `akash-zoro/freecodecamp-web-design`) with table reservation prototype modal.
  - **Component Lab & Digital Badges** with interactive name tag generator.
- **Skills Arsenal**: Categorized interactive filter tabs with animated progress meters.
- **Contact & Connect Hub**: Direct links to [LinkedIn](https://www.linkedin.com/in/akash-nayak-d/) and [GitHub](https://github.com/akash-zoro) plus validated messaging form with instant feedback toast.
- **Production GitHub Pages CI/CD**: Pre-configured `.github/workflows/deploy.yml` workflow for automated GitHub Pages deployments.

---

## 🚀 How to Deploy to GitHub Pages (2 Minutes)

### Option 1: Personal User Site (Recommended)
This makes the site accessible at your primary URL: **`https://akash-zoro.github.io/`**

1. Go to [GitHub New Repository](https://github.com/new).
2. Name the repository exactly:
   ```text
   akash-zoro.github.io
   ```
3. Set the repository to **Public**.
4. In your terminal inside this project directory, run:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Akash Nayak portfolio"
   git branch -M main
   git remote add origin https://github.com/akash-zoro/akash-zoro.github.io.git
   git push -u origin main
   ```
5. In GitHub, navigate to **Settings** &rarr; **Pages**:
   - Under **Build and deployment > Source**, select **GitHub Actions** (the included `.github/workflows/deploy.yml` will deploy automatically on push) OR select **Deploy from a branch > main > / (root)**.
6. Your portfolio is live at `https://akash-zoro.github.io/`! 🎉

---

### Option 2: Project Repository Site
If you prefer naming the repository `portfolio`, `akash-portfolio`, or similar:

1. Create a repository on GitHub (e.g., `portfolio`).
2. Push the files:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio site release"
   git branch -M main
   git remote add origin https://github.com/akash-zoro/portfolio.git
   git push -u origin main
   ```
3. In **Settings** &rarr; **Pages**, choose **GitHub Actions** or **Deploy from branch (main / root)**.
4. Your site will be live at `https://akash-zoro.github.io/portfolio/`.

---

## 💻 Local Preview

You can test and view the site locally with any standard lightweight local HTTP server:

```bash
# Using Python 3 (built-in on macOS)
python3 -m http.server 8080

# Or using Node.js npx serve
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📂 File Structure

```text
├── index.html                   # Master entrypoint & semantic HTML5 structure
├── css/
│   └── styles.css               # Glassmorphism design system & responsive styling
├── js/
│   ├── particles.js             # Physics-based constellation canvas engine
│   └── main.js                  # 3D card tilt, typing loop, modal & form logic
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages auto-deploy GitHub Actions workflow
└── README.md                    # Setup and documentation
```

---

## 🔗 Official Profiles

- **GitHub**: [https://github.com/akash-zoro](https://github.com/akash-zoro)
- **LinkedIn**: [https://www.linkedin.com/in/akash-nayak-d/](https://www.linkedin.com/in/akash-nayak-d/)
