import { useEffect, useCallback, useRef } from 'react';

type KeyCombo = string | string[];
type KeyHandler = (event: KeyboardEvent) => void;

interface KeyBinding {
  combo: KeyCombo;
  handler: KeyHandler;
  preventDefault?: boolean;
  enabled?: boolean;
  description?: string;
}

interface UseKeyboardOptions {
  global?: boolean;
  preventDefault?: boolean;
  enabled?: boolean;
  target?: HTMLElement | null;
}

function normalizeKeyCombo(combo: KeyCombo): string[] {
  if (Array.isArray(combo)) {
    return combo.map((key) => key.toLowerCase());
  }
  return combo.toLowerCase().split('+').map((key) => key.trim());
}

function matchesKeyCombo(event: KeyboardEvent, combo: string[]): boolean {
  const pressedKeys = new Set<string>();

  if (event.ctrlKey) pressedKeys.add('ctrl');
  if (event.shiftKey) pressedKeys.add('shift');
  if (event.altKey) pressedKeys.add('alt');
  if (event.metaKey) pressedKeys.add('meta');

  pressedKeys.add(event.key.toLowerCase());

  return (
    combo.length === pressedKeys.size &&
    combo.every((key) => pressedKeys.has(key))
  );
}

export function useKeyboard(
  bindings: KeyBinding[],
  options: UseKeyboardOptions = {}
) {
  const {
    global = false,
    preventDefault = true,
    enabled = true,
    target = null,
  } = options;

  const normalizedBindings = useRef(
    bindings.map((binding) => ({
      ...binding,
      combo: normalizeKeyCombo(binding.combo),
    }))
  );

  const handleKeyDown = useCallback(
    (event: Event) => {
      if (!enabled) return;

      const keyboardEvent = event as KeyboardEvent;
      for (const binding of normalizedBindings.current) {
        if (!binding.enabled && binding.enabled !== undefined) continue;

        if (matchesKeyCombo(keyboardEvent, binding.combo)) {
          if (binding.preventDefault ?? preventDefault) {
            event.preventDefault();
          }
          binding.handler(keyboardEvent);
          break;
        }
      }
    },
    [enabled, preventDefault]
  );

  useEffect(() => {
    const element = global ? window : target || document;

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [global, target, handleKeyDown]);

  const getActiveBindings = useCallback(() => {
    return normalizedBindings.current
      .filter((binding) => binding.enabled !== false)
      .map((binding) => ({
        combo: Array.isArray(binding.combo)
          ? binding.combo.join('+')
          : binding.combo,
        description: binding.description,
      }));
  }, []);

  return {
    getActiveBindings,
  };
}

// Usage example:
// const { getActiveBindings } = useKeyboard(
//   [
//     {
//       combo: 'ctrl+s',
//       handler: (e) => {
//         console.log('Save shortcut triggered');
//         saveDocument();
//       },
//       description: 'Save document',
//     },
//     {
//       combo: ['ctrl+shift+z', 'meta+shift+z'],
//       handler: (e) => {
//         console.log('Redo shortcut triggered');
//         redo();
//       },
//       description: 'Redo last action',
//       enabled: canRedo,
//     },
//     {
//       combo: 'escape',
//       handler: (e) => {
//         console.log('Close modal');
//         closeModal();
//       },
//       description: 'Close modal',
//       enabled: isModalOpen,
//       preventDefault: false,
//     },
//   ],
//   {
//     global: true,
//     preventDefault: true,
//     enabled: !isInputFocused,
//   }
// ); 