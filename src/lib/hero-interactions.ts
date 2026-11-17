function initializeRole(hero: HTMLElement) {
  const text = hero.querySelector<HTMLElement>('[data-role-text]');
  const animated = hero.querySelector<HTMLElement>('[data-role-animated]');
  const toggle = hero.querySelector<HTMLButtonElement>('[data-role-toggle]');
  const fallback = hero.querySelector<HTMLElement>('[data-role-fallback]');
  if (!text || !animated || !toggle || !fallback) return;

  let raw: unknown;
  try {
    raw = JSON.parse(text.dataset.roles ?? '[]');
  } catch {
    return;
  }
  if (!Array.isArray(raw) || raw.length !== 2 || !raw.every((item) => typeof item === 'string' && item.length > 0)) return;
  const phrases: string[] = raw;
  const staticTitle = fallback.textContent?.trim() || phrases.join(' & ');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer: number | undefined;
  let phraseIndex = 0;
  let character = 0;
  let phase: 'typing' | 'holding' | 'deleting' | 'gap' = 'typing';
  let delay = 650;
  let manuallyPaused = false;

  const stop = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };

  const schedule = () => {
    if (timer !== undefined || motion.matches || manuallyPaused || document.hidden) return;
    timer = window.setTimeout(() => {
      timer = undefined;
      advance();
    }, delay);
  };

  const advance = () => {
    if (motion.matches || manuallyPaused || document.hidden) return;
    const phrase = phrases[phraseIndex];
    if (phase === 'holding') {
      phase = 'deleting';
      delay = 35;
    } else if (phase === 'gap') {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      phase = 'typing';
      delay = 65;
    } else {
      character += phase === 'typing' ? 1 : -1;
      text.textContent = phrase.slice(0, character);
      if (character === phrase.length) {
        phase = 'holding';
        delay = 2000;
      } else if (character === 0) {
        phase = 'gap';
        delay = 350;
      } else {
        delay = phase === 'typing' ? 65 : 35;
      }
    }
    schedule();
  };

  const updatePlayback = () => {
    const paused = motion.matches || manuallyPaused || document.hidden;
    hero.dataset.rolePaused = String(paused);
    hero.dataset.documentHidden = String(document.hidden);
    const label = manuallyPaused ? 'Resume role animation' : 'Pause role animation';
    toggle.setAttribute('aria-label', `${staticTitle}. ${label}`);
    toggle.title = label;
    if (paused) stop();
    else schedule();
  };

  const applyMotion = () => {
    stop();
    hero.dataset.roleActive = String(!motion.matches);
    animated.hidden = motion.matches;
    toggle.hidden = motion.matches;
    fallback.hidden = !motion.matches;
    phraseIndex = 0;
    character = 0;
    phase = 'typing';
    delay = 650;
    manuallyPaused = false;
    text.textContent = '';
    updatePlayback();
  };

  toggle.addEventListener('click', () => {
    if (motion.matches) return;
    manuallyPaused = !manuallyPaused;
    updatePlayback();
  });
  document.addEventListener('visibilitychange', updatePlayback);
  motion.addEventListener('change', applyMotion);
  applyMotion();
}

function initializeSpotlight(hero: HTMLElement) {
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = false;
  let inside = false;
  let frame: number | undefined;
  let clientX = 0;
  let clientY = 0;

  const clearLight = () => {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    frame = undefined;
    inside = false;
    hero.dataset.spotlightActive = 'false';
  };

  const moveLight = (event: PointerEvent) => {
    // Cross-origin iframe movement cannot be tracked from the parent page.
    // Clear at the iframe boundary rather than adding an input-blocking layer.
    const target = event.target as Element | null;
    if (!enabled || event.pointerType === 'touch' || target?.tagName === 'IFRAME') {
      clearLight();
      return;
    }
    inside = true;
    clientX = event.clientX;
    clientY = event.clientY;
    if (frame !== undefined) return;
    frame = window.requestAnimationFrame(() => {
      frame = undefined;
      if (!enabled || !inside) return;
      const bounds = hero.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
      hero.style.setProperty('--hero-spotlight-x', `${x * 100}%`);
      hero.style.setProperty('--hero-spotlight-y', `${y * 100}%`);
      hero.dataset.spotlightActive = 'true';

    });
  };

  const configure = () => {
    const eligible = pointer.matches && !motion.matches && !document.hidden;
    if (eligible === enabled) return;
    enabled = eligible;
    if (enabled) {
      hero.addEventListener('pointerenter', moveLight);
      hero.addEventListener('pointermove', moveLight);
      hero.addEventListener('pointerover', moveLight);
      hero.addEventListener('pointerleave', clearLight);
    } else {
      hero.removeEventListener('pointerenter', moveLight);
      hero.removeEventListener('pointermove', moveLight);
      hero.removeEventListener('pointerover', moveLight);
      hero.removeEventListener('pointerleave', clearLight);
      clearLight();
    }
  };

  pointer.addEventListener('change', configure);
  motion.addEventListener('change', configure);
  document.addEventListener('visibilitychange', configure);
  configure();
}

export function initializeHeroInteractions() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || hero.dataset.interactionsInitialized === 'true') return;
  hero.dataset.interactionsInitialized = 'true';
  initializeRole(hero);
  initializeSpotlight(hero);
}
