import { OS } from './kits/tools.js';
export function setRemInit() {
  // postcss-px2rem的内容
  // 基准大小
  const baseSize = 100, os = OS(), isPc = os.isPc, isTablet = os.isTablet;
  // 设置 rem 函数
  function setRem() {
    try {
      // 当前页面宽度相对于 375 px(设计稿尺寸)的缩放比例，可根据自己需要修改。
      const scale = isTablet ? 1.5 : (isPc ? 0.84 : document.documentElement.clientWidth / 375);

      // 设置页面根节点字体大小
      document.documentElement.style.fontSize = `${baseSize * scale}px`;
    } catch (e) {
      if (document && document.documentElement && document.documentElement.style && document.documentElement.style.fontSize) {
        document.documentElement.style.fontSize = '100px';
      }
    }

  }
  // 初始化
  setRem();
  // 改变窗口大小时重新设置 rem
  window.addEventListener('resize', setRem);
}
