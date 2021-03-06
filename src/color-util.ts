import { HEXA_COLOR } from './color-regex';

const ColorUtil = {
  getRGB(color: string): number[] {
    let rgb: any[] = [];
    if (color.match(HEXA_COLOR)) {
      rgb = /#(.+)/gi.exec(color);
      if (rgb[1].length === 3) {
        return rgb[1].split('').map(_ => parseInt(_ + _, 16));
      }
      rgb = rgb[1].split('').map(_ => parseInt(_, 16));
      return [16 * rgb[0] + rgb[1], 16 * rgb[2] + rgb[3], 16 * rgb[4] + rgb[5]];
    }
    return [];
  },

  luminance(color: string): number {
    let rgb = this.getRGB(color);
    if (!rgb) {
      return null;
    }
    rgb = rgb.map(_ => {
      _ = _ / 255;
      if (_ < 0.03928) {
        _ = _ / 12.92;
      } else {
        _ = (_ + .055) / 1.055;
        _ = Math.pow(_, 2.4);
      }
      return _;
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
};
export default ColorUtil;
