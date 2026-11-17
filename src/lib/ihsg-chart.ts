export function initializeIhsgChart() {
  const chart = document.querySelector<HTMLElement>('[data-ihsg-chart]');
  const mount = chart?.querySelector<HTMLElement>('[data-widget-mount]');
  const fallback = chart?.querySelector<HTMLElement>('[data-chart-fallback]');
  const status = chart?.querySelector<HTMLElement>('[data-chart-status]');
  if (!chart || !mount || !fallback || !status) return;

  const { symbol, scriptUrl, sourceUrl } = mount.dataset;
  if (!symbol || !scriptUrl || !sourceUrl) return;
  if (chart.dataset.chartInitialized === 'true') return;
  chart.dataset.chartInitialized = 'true';

  const root = document.documentElement;
  let visible = false;
  let currentTheme = '';
  let generation = 0;
  let disposeInstance: (() => void) | undefined;

  const render = () => {
    const theme = root.dataset.theme === 'light' ? 'light' : 'dark';
    if (!visible || theme === currentTheme) return;
    currentTheme = theme;
    const request = ++generation;
    disposeInstance?.();
    mount.hidden = false;
    mount.inert = true;
    mount.setAttribute('aria-busy', 'true');
    fallback.hidden = true;

    // Keep each asynchronous provider script attached to its own container.
    // A late script can only populate its detached instance after cleanup.
    const instance = document.createElement('div');
    instance.className = 'tradingview-widget-container';
    instance.style.width = '100%';
    instance.style.height = '100%';
    instance.style.colorScheme = theme;
    const events = new AbortController();
    let timeout: number | undefined;
    let frameObserver: MutationObserver | undefined;

    const dispose = () => {
      window.clearTimeout(timeout);
      frameObserver?.disconnect();
      events.abort();
      instance.remove();
    };
    disposeInstance = dispose;

    const fail = () => {
      if (request !== generation) return;
      generation++;
      dispose();
      mount.hidden = true;
      mount.setAttribute('aria-busy', 'false');
      fallback.hidden = false;
      status.textContent = 'Chart unavailable';
    };

    const target = document.createElement('div');
    target.className = 'tradingview-widget-container__widget';
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.textContent = JSON.stringify({
      symbol,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '12M',
      colorTheme: theme,
      // These are the supported legacy iframe Mini Symbol Overview options.
      // An opaque provider background keeps its own labels and canvas paired.
      isTransparent: false,
      autosize: true,
      largeChartUrl: sourceUrl,
    });
    script.addEventListener('error', fail, { once: true, signal: events.signal });

    frameObserver = new MutationObserver(() => {
      const frame = instance.querySelector('iframe');
      if (!frame || request !== generation) return;
      frameObserver?.disconnect();
      frame.title = 'IDX Composite (IHSG) chart provided by TradingView';
      // Style only the iframe element, never its cross-origin document.
      frame.style.colorScheme = theme;
      frame.addEventListener('error', fail, { once: true, signal: events.signal });
      frame.addEventListener('load', () => {
        if (request !== generation) return;
        window.clearTimeout(timeout);
        // Frame load is not a guarantee of quote availability or internal paint.
        mount.inert = false;
        mount.setAttribute('aria-busy', 'false');
      }, { once: true, signal: events.signal });
    });
    frameObserver.observe(instance, { childList: true, subtree: true });
    timeout = window.setTimeout(fail, 15000);
    instance.append(target, script);
    mount.replaceChildren(instance);
  };

  const themeObserver = new MutationObserver(render);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        visible = true;
        render();
        observer.disconnect();
      }
    }, { rootMargin: '100px' });
    visibilityObserver.observe(chart);
  } else {
    visible = true;
    render();
  }
}
