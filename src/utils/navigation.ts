/** SPA navigation helpers */

export function navigate(path: string): void {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === path && !window.location.hash) {
    window.scrollTo(0, 0);
    return;
  }
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

const HEADER_OFFSET = 80;

/** Smooth-scroll to a hash target on the current document (home sections). */
export function scrollToHash(hash: string): void {
  if (typeof window === 'undefined') return;
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * From any route: go home then scroll to section, or navigate to a path.
 */
export function goNav(href: string, kind: 'hash' | 'route'): void {
  if (kind === 'route') {
    navigate(href);
    return;
  }
  if (window.location.pathname !== '/') {
    window.history.pushState({}, '', `/${href}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    // After home mounts, scroll
    setTimeout(() => scrollToHash(href), 80);
    return;
  }
  scrollToHash(href);
}
