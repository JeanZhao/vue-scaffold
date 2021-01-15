/* eslint-disable */

function bezier(points, percent) {
    const len = points.length;
  
    if (len < 2) return; // 至少两个点
  
  
    // 计算公式的多项式常数（杨辉三角规律）
  
    const c_n_k = calcYHTriangle(len);
    let x = 0; let
      y = 0;
    let temp;
  
    // 遍历控制点
    for (let j = 0; j < len; j++) {
      temp = (c_n_k[j] * Math.pow((1 - percent), (len - 1) - j) * Math.pow(percent, j));
      x += temp * points[j].x;
      y += temp * points[j].y;
    }
  
    return { x, y };
  }
  
  
  // 贝塞尔曲线公式多项式系数常数符合杨辉三角规律
  // 杨辉三角: https://baike.baidu.com/item/%E6%9D%A8%E8%BE%89%E4%B8%89%E8%A7%92
  
  // 通过第i行，j列的数字等于 第i-1行 第j-1列 + 第j列数字的和
  // 的特性，计算杨辉三角n层的数据（贝塞尔公式的每一项的常数项系数）
  function calcYHTriangle(n) {
    if (n == 1) return [1];
  
    let prev;
    const arr = [1, 1]; // 第二层的数据
  
    // 第三层开始遍历
    for (let i = 3; i <= n; i++) {
      // 拷贝上一层的数据
      prev = arr.slice(0);
  
      // 第一个值永远是1
      arr[0] = 1;
      // 当前层的第j个位置的值等于上一层的j-1位置 + j位置的值
      // arr[j] = prev[j - 1] + prev[j]
      for (let j = 1; j < i - 1; j++) {
        arr[j] = prev[j - 1] + prev[j];
      }
  
      // 最后一个值永远是1
      arr.push(1);
    }
  
    return arr;
  }
  
  // 使用二分法，根据X的值，求出对应的t
  function getTForX(points, x, epsilon) {
    let t0 = 0.0;
    let t1 = 1.0;
    let t2 = 0.5;
    let x1;
    let i = 0;
  
    // var maxRound = 20
  
    if (x == t0 || x == t1) {
      return x;
    }
  
    while (t0 < t1/* && i < maxRound */) {
      x1 = bezier(points, t2).x;
  
      if (Math.abs(x1 - x) < epsilon) {
        // return t2
        break;
      }
  
      if (x1 > x) {
        t1 = t2;
      } else {
        t0 = t2;
      }
  
      t2 = t0 + (t1 - t0) / 2;
  
      i++;
    }
  
    return t2;
  }
  
  function cubicBezier(x1, y1, x2, y2) {
    const points = [{ x: 0, y: 0 }, { x: x1, y: y1 }, { x: x2, y: y2 }, { x: 1, y: 1 }];
  
    return function (x) {
      const t = getTForX(points, x, 0.001);
      return bezier(points, t).y;
    };
  }
  
  const Tween = {
    /**
     * 匀速运动
     * t：已经执行时间，b：初始位置，c：总距离，d: 总时间
    */
    linear(t, b, c, d) {
      return t * (c / d) + b; // v = c / d 是速度，t * v 是 t时间内经过的距离，加上初始距离b，等于t时间后到达的总距离
    },
  
    /**
     * 二次缓动（二次方曲线 p(t) = t ^ 2）
    */
    quad(t, b, c, d) {
      return c * (t / d) * (t / d) + b;
    },
  
    quadOut(t, b, c, d) {
      return c * (-Math.pow(t / d - 1, 2) + 1) + b;
    },
  
    quadInOut(t, b, c, d) {
      let p = t / d;
  
      if (p < 0.5) {
        // 时间乘以2，位移再除以二，是为了确保一半的时间可以经过一半的距离
        p *= 2;
        return c * p * p / 2 + b;
      }
  
      // 时间乘以2，位移再除以二，是为了确保一半的时间可以经过一半的距离
      p = (p - 0.5) * 2;
      return c / 2 + c * (-Math.pow(p - 1, 2) + 1) / 2 + b;
  
      // 简化后就是下面的公式 ↓
  
      // t = t / d * 2
  
      // // 时间一半之前使用quad的公式，加速
      // if (t < 1) {
      //     // 位移只能取一半
      //     return (c * t * t) / 2 + b;
      // }
  
      // // 时间一半之后用quadOut公式，减速
      // // return -c / 2 * ((--t) * (t-2) - 1) + b;
  
  
      // // 通俗易懂版本
      // if (t / d < 0.5) {
      //     return this.quad(t, b, c / 2, d / 2)
      // }
  
      // return this.quadOut(t - d / 2, c / 2 + b, c / 2, d / 2)
    },
  
    bezierLinear(t, b, c, d) {
      const point = bezier([{ x: 0, y: 0 }, { x: 1, y: 1 }], t / d);
  
      return point.x * c + b;
    },
  
    bezierEase(t, b, c, d) {
      const point = bezier([{ x: 0, y: 0 }, { x: 0.25, y: 0.1 }, { x: 0.25, y: 1 }, { x: 1, y: 1 }], t / d);
  
      return point.y * c + b;
    },
  
    bezierEaseIn(t, b, c, d) {
      const point = bezier([
        { x: 0, y: 0 },
        { x: 0.42, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
      ], t / d);
  
      return point.y * c + b;
    },
  
    bezierEaseOut(t, b, c, d) {
      const point = bezier([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0.58, y: 1 }, { x: 1, y: 1 }], t / d);
  
      return point.y * c + b;
    },
  
    bezierEaseInOut(t, b, c, d) {
      const point = bezier([{ x: 0, y: 0 }, { x: 0.42, y: 0 }, { x: 0.58, y: 1 }, { x: 1, y: 1 }], t / d);
  
      return point.y * c + b;
    },
  
    bezierCustom: (function () {
      const bezierFn = cubicBezier(0.5, 1.56, 0.99, 0);
      return function (t, b, c, d) {
        return bezierFn(t / d) * c + b;
      };
    }()),
  };
  
  function animate(opt) {
    const startTime = Date.now();
    const { duration } = opt;
    const subs = opt.subs || [];
    let timer;
  
    (function go() {
      const past = Math.min(Date.now() - startTime, duration);
      const percent = duration === 0 ? 1 : past / duration;
  
      subs.forEach((sub) => {
        const distance = Tween[sub.easing || opt.easing || 'linear'](past, sub.from, sub.to - sub.from, duration);
        sub.step && sub.step(distance, percent);
      });
  
      if (percent === 1) {
        cancelAnimationFrame(timer);
        subs.forEach((sub) => {
          sub.done && sub.done();
        });
        return;
      }
      timer = requestAnimationFrame(go);
    }());
  
    return {
      stop(jumpToEnd) {
        cancelAnimationFrame(timer);
        if (jumpToEnd) {
          subs.forEach((sub) => {
            sub.done && sub.done();
          });
        }
      }
    };
  }
  
  
  export default animate;
  