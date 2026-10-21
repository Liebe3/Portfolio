# Jallen Portugal — Portfolio

A personal portfolio showcasing my skills, freelance and professional work, and personal projects. The site is built with HTML, CSS, and JavaScript.

## Features

- Responsive home, skills, projects, and contact sections
- Skills and tools from my CV, grouped by category with labeled icons
- Project cards with expandable descriptions and a **Show more projects** button
- Links to public project repositories and live demos where available
- Downloadable CV

## Run locally

Clone or download this repository, then open `index.html` in a browser. There is no install or build step.

## Project files

| Path | Purpose |
| --- | --- |
| `index.html` | Page content and external service links |
| `style.css`, `about.css`, `skills.css`, `projects.css`, `contact.css` | Section styles and responsive layouts |
| `porfolio.js` | Mobile navigation and project expand/collapse behavior |
| `images/` | Profile, project, and contact images |
| `assets/JallenJPortugal.pdf` | CV used by the **Download CV** button |

To update the portfolio, edit the content in `index.html` and the matching section stylesheet. Add new image files to `images/` and update their paths in the HTML. Keep the CV link in `index.html` in sync if you replace or rename the PDF.

## External services

The page loads fonts, icons, and scroll animations from Google Fonts, Devicon, Font Awesome, and AOS. It uses jQuery for the page preloader and sends the contact form to Formspree. These features require an internet connection.
