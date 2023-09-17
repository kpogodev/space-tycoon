import { useEffect } from 'react';

/**
 * Use a keyboard shortcut to trigger an action.
 * @param key The key that must be pressed
 * @param callback The action to be taken when the shortcut is detected
 * @param altKey Whether the Alt key must be pressed (default: false)
 * @param ctrlKey Whether the Ctrl key must be pressed (default: false)
 * @param shiftKey Whether the Shift key must be pressed (default: false)
 */
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  altKey: boolean = false,
  ctrlKey: boolean = false,
  shiftKey: boolean = false
) => {
  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (
        e.key === key &&
        e.altKey === altKey &&
        e.ctrlKey === ctrlKey &&
        e.shiftKey === shiftKey
      ) {
        callback();
      }
    };
    
    window.addEventListener('keydown', handleEvent);
    return () => {
      window.removeEventListener('keydown', handleEvent);
    };
  }, [key, callback, altKey, ctrlKey, shiftKey]);
}

