export function handleKeyDownToNext(
  nextRef: React.RefObject<HTMLInputElement | null>,
  e: React.KeyboardEvent<HTMLInputElement>,
): void {
  if (e.key === "Enter") {
    nextRef.current?.focus();
    e.preventDefault();
  }
}
