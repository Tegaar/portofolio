export const themeStorageKey = 'tegar-theme';

type Theme = 'dark' | 'light';

export function initializeThemeToggle() {
  const root = document.documentElement;
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');

  function updateLabels() {
    const label = root.dataset.theme === 'light'
      ? 'Switch to dark theme'
      : 'Switch to light theme';

    buttons.forEach((button) => {
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });
  }

  function applyTheme(theme: Theme) {
    root.dataset.theme = theme;
    updateLabels();
  }

  updateLabels();

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme: Theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);

      try {
        localStorage.setItem(themeStorageKey, nextTheme);
      } catch {
        // The control still works for this page when storage is unavailable.
      }
    });

    // Keep an inoperative control out of the page if JavaScript is disabled.
    button.hidden = false;
  });

  window.addEventListener('storage', (event) => {
    if (event.key === themeStorageKey || event.key === null) {
      applyTheme(event.newValue === 'light' ? 'light' : 'dark');
    }
  });

  window.addEventListener('pageshow', () => {
    // A page restored from the back/forward cache can hold an older theme.
    try {
      applyTheme(localStorage.getItem(themeStorageKey) === 'light' ? 'light' : 'dark');
    } catch {
      // Preserve the current in-memory choice when storage cannot be read.
    }
  });
}
