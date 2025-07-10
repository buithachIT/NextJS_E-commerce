export function parseColorAndSize(name: string) {
  const match = name.match(/- (.+),\s*(\w+)$/);
  if (!match) return { color: '', size: '' };
  return { color: match[1], size: match[2] };
}
