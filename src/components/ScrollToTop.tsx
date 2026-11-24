import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global ScrollToTop component:
 * Listens to route path changes, query parameter updates, and anchor hashes.
 * Ensures the target section or top of the page is smoothly scrolled into view.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If a hash exists (e.g. #target-section), scroll smoothly to that element
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    // Otherwise, scroll window smoothly to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname, search, hash]);

  return null;
};
