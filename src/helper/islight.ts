export const COLOR_HEX_MAP: Record<string, string> = {
  Red: '#ff0000',
  DarkRed: '#8b0000',
  Pink: '#ffc0cb',
  Black: '#000000',
  White: '#ffffff',
  Blue: '#0000ff',
  LightBlue: '#add8e6',
  Navy: '#000080',
  SkyBlue: '#87ceeb',
  Green: '#00ff00',
  DarkGreen: '#006400',
  Lime: '#32cd32',
  Olive: '#808000',
  Yellow: '#ffff00',
  Gold: '#ffd700',
  Orange: '#ffa500',
  DarkOrange: '#ff8c00',
  Brown: '#a52a2a',
  Tan: '#d2b48c',
  Purple: '#800080',
  Violet: '#ee82ee',
  Lavender: '#e6e6fa',
  Gray: '#808080',
  LightGray: '#d3d3d3',
  Silver: '#c0c0c0',
  Beige: '#f5f5dc',
  Maroon: '#800000',
  Teal: '#008080',
  Cyan: '#00ffff',
  Magenta: '#ff00ff',
};

export function isLightColor(color: string): boolean {
  const normalizedColor = color.trim().toLowerCase();

  const matchedKey = Object.keys(COLOR_HEX_MAP).find(
    (key) => key.toLowerCase() === normalizedColor
  );

  const hex = matchedKey ? COLOR_HEX_MAP[matchedKey] : '#ffffff';

  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180;
}
