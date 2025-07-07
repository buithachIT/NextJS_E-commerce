export function isLightColor(hexColor: string): boolean {
  const c = hexColor.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // công thức tính độ sáng
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180;
}
