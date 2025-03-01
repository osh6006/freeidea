export function useControllState<T>({
  internalState,
  setInternalState,
  externalState,
  onStateChange,
}: {
  internalState: T;
  setInternalState: (value: T) => void;
  externalState?: T;
  onStateChange?: (value: T) => void;
}) {
  const isControlled = externalState !== undefined;

  const state = isControlled ? externalState : internalState;

  const setState = (value: T) => {
    setInternalState(value);
    onStateChange?.(value);
  };

  return [state, setState] as const;
}
