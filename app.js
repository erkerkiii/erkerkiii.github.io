const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project-card')];
const earlierProjects = [...document.querySelectorAll('.archive-grid > [data-category]')];
const archive = document.querySelector('.project-archive');
filters.hidden = false;
function filterProjects(category) {
  filters.querySelectorAll('button').forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  projects.forEach(project => {
    project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category);
    if (!project.hidden) count++;
  });
  let earlierCount = 0;
  earlierProjects.forEach(project => {
    project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category);
    if (!project.hidden) earlierCount++;
  });
  archive.hidden = earlierCount === 0;
  document.querySelector('#filter-status').textContent = `${count} featured ${count === 1 ? 'project' : 'projects'} and ${earlierCount} earlier ${earlierCount === 1 ? 'entry' : 'entries'} shown`;
}
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (button) filterProjects(button.dataset.filter);
});
document.querySelector('.hero-feature').addEventListener('click', () => filterProjects('all'));
document.querySelector('#year').textContent = new Date().getFullYear();
