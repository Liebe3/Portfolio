const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menuItems = document.querySelectorAll('nav .mainMenu li a');

openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        close();
    });
});

function show() {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0px';
}

function close() {
    mainMenu.style.top = '-100%';
}

const projectCards = document.querySelectorAll('.projects-list .project-cotaniner');
const projectsToggle = document.querySelector('.projects-toggle');
const initiallyVisibleProjects = 4;

if (projectsToggle && projectCards.length > initiallyVisibleProjects) {
    const extraProjects = Array.from(projectCards).slice(initiallyVisibleProjects);
    const toggleLabel = projectsToggle.querySelector('.projects-toggle-label');
    extraProjects.forEach(card => { card.hidden = true; });
    projectsToggle.hidden = false;

    projectsToggle.addEventListener('click', () => {
        const expanding = projectsToggle.getAttribute('aria-expanded') !== 'true';
        extraProjects.forEach(card => { card.hidden = !expanding; });
        projectsToggle.setAttribute('aria-expanded', String(expanding));
        toggleLabel.textContent = expanding ? 'Show fewer projects' : 'Show more projects';

        requestAnimationFrame(() => {
            syncDescriptionToggles();
            if (window.AOS) window.AOS.refreshHard();
        });

        if (!expanding) {
            projectsToggle.scrollIntoView({ block: 'center' });
        }
    });
}

const descriptionEntries = Array.from(
    document.querySelectorAll('.projects-list .projectDescription-container p')
).map((description, index) => {
    const toggle = document.createElement('button');
    const label = document.createElement('span');

    description.id = `project-description-${index + 1}`;
    description.classList.add('is-collapsed');
    toggle.type = 'button';
    toggle.className = 'project-description-toggle';
    toggle.setAttribute('aria-controls', description.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.hidden = true;
    label.textContent = 'Show more';
    toggle.append(label);
    description.after(toggle);

    toggle.addEventListener('click', () => {
        const expanding = toggle.getAttribute('aria-expanded') !== 'true';
        description.classList.toggle('is-collapsed', !expanding);
        toggle.setAttribute('aria-expanded', String(expanding));
        label.textContent = expanding ? 'Show less' : 'Show more';

        if (window.AOS) {
            requestAnimationFrame(() => window.AOS.refreshHard());
        }
    });

    return { description, toggle, label };
});

function syncDescriptionToggles() {
    descriptionEntries.forEach(({ description, toggle, label }) => {
        if (description.closest('.project-cotaniner').hidden) return;

        const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
        description.classList.add('is-collapsed');
        const overflows = description.scrollHeight > description.clientHeight + 1;

        if (wasExpanded && overflows) description.classList.remove('is-collapsed');
        toggle.hidden = !overflows;

        if (!overflows) {
            toggle.setAttribute('aria-expanded', 'false');
            label.textContent = 'Show more';
        }
    });
}

requestAnimationFrame(syncDescriptionToggles);
window.addEventListener('load', syncDescriptionToggles);

let descriptionResizeFrame;
window.addEventListener('resize', () => {
    cancelAnimationFrame(descriptionResizeFrame);
    descriptionResizeFrame = requestAnimationFrame(syncDescriptionToggles);
});
