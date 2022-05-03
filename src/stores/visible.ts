import { computed } from 'nanostores'

import { formatRgb, format, inRGB, toRgb, inP3, rgb } from '../../lib/colors.js'
import { current, valueToColor } from './current.js'
import { support } from './support.js'

interface VisibleValue {
  type: 'rgb' | 'p3' | 'out'
  rgb: string
  p3: string
}

export let visible = computed<VisibleValue, [typeof current, typeof support]>(
  [current, support],
  (value, hasP3) => {
    let color = valueToColor(value)
    if (inRGB(color)) {
      let rgbCss = formatRgb(rgb(color))
      return {
        type: 'rgb',
        rgb: rgbCss,
        p3: rgbCss
      }
    } else if (inP3(color)) {
      return {
        type: 'p3',
        rgb: formatRgb(toRgb(color)),
        p3: hasP3 ? format(color) : 'none'
      }
    } else {
      return {
        type: 'out',
        rgb: formatRgb(toRgb(color)),
        p3: 'none'
      }
    }
  }
)
