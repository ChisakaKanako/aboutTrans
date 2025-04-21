import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'
import 'virtual:uno.css'
import { h } from 'vue'
import Share from './components/share.vue'

const svg = document.createElement('svg')
const filter = document.createElement('filter')
filter.id = 'round-corner-filter'
filter.setAttribute('x', '0%')
filter.setAttribute('y', '0%')
filter.setAttribute('width', '100%')
filter.setAttribute('height', '100%')

const feImage = document.createElement('feImage')
feImage.id = 'dispMap'
feImage.setAttribute('x', '0')
feImage.setAttribute('y', '0')
feImage.setAttribute('width', '100%')
feImage.setAttribute('height', '100%')
feImage.setAttribute('preserveAspectRatio', 'none')

const feDisplacementMap = document.createElement('feDisplacementMap')
feDisplacementMap.setAttribute('in', 'SourceGraphic')
feDisplacementMap.setAttribute('in2', 'dispMap')
feDisplacementMap.setAttribute('scale', '0')
feDisplacementMap.setAttribute('xChannelSelector', 'R')
feDisplacementMap.setAttribute('yChannelSelector', 'G')

filter.appendChild(feImage)
filter.appendChild(feDisplacementMap)

svg.appendChild(filter)

const r = 50;  // 设定圆角半径
const size = 2 * r;
// 1. 创建 Canvas 并计算位移图
const cvs = document.createElement('canvas');
cvs.width = cvs.height = size;
const ctx = cvs.getContext('2d');
const img = ctx!.createImageData(size, size);

for (let j = 0; j < size; j++) {
  for (let i = 0; i < size; i++) {
    const idx = (j * size + i) * 4;
    // 归一化到 [-1,1]
    const u = (i / r) - 1;
    const v = (j / r) - 1;
    let R = 128, G = 128;  // 默认不偏移

    const d2 = u * u + v * v;
    if (d2 > 0 && d2 <= 1) {
      const len = Math.sqrt(d2);
      const up = u / len, vp = v / len;
      const du = (up - u) / 2;
      const dv = (vp - v) / 2;
      R = Math.round((0.5 + du) * 255);
      G = Math.round((0.5 + dv) * 255);
    }
    img.data[idx] = R;     // red
    img.data[idx + 1] = G;     // green
    img.data[idx + 2] = 128;   // blue (unused)
    img.data[idx + 3] = 255;   // alpha
  }
}
ctx!.putImageData(img, 0, 0);

// 2. 将位移图嵌入到 feImage
const dataURL = cvs.toDataURL();
feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);

// 3. 设置 feDisplacementMap 的 scale = 2r
const feDisp = feImage.nextElementSibling;
feDisp!.setAttribute('scale', (2 * r).toString());

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(Share),
    })
  },
  enhanceApp(ctx) {
    const { app } = ctx
    app.component('Share', Share)
  },
}
document.body.append(svg)

export default ExtendedTheme