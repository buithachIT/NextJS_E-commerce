export function parseColorAndSize(name: string) {
  const lastDash = name.lastIndexOf('-');
  if (lastDash === -1) return { color: '', size: '' };
  const attrs = name.slice(lastDash + 1).trim();
  const [size, color] = attrs.split(',').map((s) => s.trim());
  return { color, size };
}
