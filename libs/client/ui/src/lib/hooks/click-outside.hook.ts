import { useEffect } from 'react';

export const useClickOutside = (
  element: HTMLElement | undefined | null,
  callback: () => void
) => {
  useEffect(() => {
    if (!element) return;

    const handleClickEvent = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!element.contains(target)) callback();
    };

    document.addEventListener('click', handleClickEvent);

    return () => {
      document.removeEventListener('click', handleClickEvent);
    };
  }, [element, callback]);
};
