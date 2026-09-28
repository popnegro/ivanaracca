/** SPA navigation helpers */

export function navigate(path: string): void {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === path && !path.includes('#')) {
    window.scrollTo(0, 0);
    return;
  }
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

const HEADER_OFFSET = 80;

export function scrollToHash(hash: string): void {
  if (typeof window === 'undefined') return;
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

/** Hash section or route from any page */
export function goNav(href: string, kind: 'hash' | 'route'): void {
  if (kind === 'route') {
    navigate(href);
    return;
  }
  if (window.location.pathname !== '/') {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    setTimeout(() => scrollToHash(href), 100);
    return;
  }
  scrollToHash(href);
}
