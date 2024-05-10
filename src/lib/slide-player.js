'use client'
import anime from 'animejs/lib/anime.es.js';

// Note: Reactの仮想DOMで再レンダリングされると、アニメーションがリセットされるかも？

class SlidePlayer {
  constructor() {
    this.fixElements = {};

    this.swapElement = this.swapElement.bind(this);
    this.swapElementWithAnimation = this.swapElementWithAnimation.bind(this);
    this.moveToElement = this.moveToElement.bind(this);
  }

  // TODO: ずれた状態の座標を保持する修正値を追加する

  swapElement(selectorA, selectorB) {
    let a = document.querySelector(selectorA);
    let b = document.querySelector(selectorB);
    let temp = a.cloneNode(true);
    b.parentNode.replaceChild(temp, b);
    a.parentNode.replaceChild(b, a);
    temp.parentNode.replaceChild(a, temp);
  }

  fixElement(selector, x, y) {
    this.fixElements[selector] = {x: x, y: y};
  }

  getFixElement(selector) {
    return this.fixElements[selector] ? this.fixElements[selector] : {x: 0, y: 0};
  }

  swapElementWithAnimation(
      selectorA, selectorB,
      // アニメーションの時間
      duration = 500,
      // 要素をずらしたまま移動する場合の修正値
      // fixAX = 0, fixAY = 0, fixBX = 0, fixBY = 0,
    ) {
    let fixAX = this.getFixElement(selectorA).x;
    let fixAY = this.getFixElement(selectorA).y;
    let fixBX = this.getFixElement(selectorB).x;
    let fixBY = this.getFixElement(selectorB).y;

    let offsetAX = document.querySelector(selectorA).offsetLeft;
    let offsetAY = document.querySelector(selectorA).offsetTop;
    let offsetBX = document.querySelector(selectorB).offsetLeft;
    let offsetBY = document.querySelector(selectorB).offsetTop;
    let translateAX = offsetBX - offsetAX + fixBX;
    let translateAY = offsetBY - offsetAY + fixBY;
    let translateBX = offsetAX - offsetBX + fixAX;
    let translateBY = offsetAY - offsetBY + fixAY;
    
    // リセット
    anime({
      targets: selectorA,
      translateX: fixAX,
      translateY: fixAY,
      duration: 0,
    });
    anime({
      targets: selectorB,
      translateX: fixBX,
      translateY: fixBY,
      duration: 0,
    });

    // 移動
    let a = anime({
      targets: selectorA,
      translateX: translateAX,
      translateY: translateAY,
      duration: duration,
      easing: 'easeInOutSine',
    });
    anime({
      targets: selectorB,
      translateX: translateBX,
      translateY: translateBY,
      duration: duration,
      easing: 'easeInOutSine',
    });

    a.complete = () => {
      this.fixElement(selectorA, translateAX, translateAY);
      this.fixElement(selectorB, translateBX, translateBY);
    }
    
    setTimeout(() => {
      // this.swapElement(selectorA, selectorB);
      // anime({
      //   targets: selectorA,
      //   translateX: 0,
      //   translateY: 0,
      //   duration: 0,
      // });
      // anime({
      //   targets: selectorB,
      //   translateX: 0,
      //   translateY: 0,
      //   duration: 0,
      // });
    }, duration);
  }

  moveToElement(selectorSrc, selectorDest) {
    let src = document.querySelector(selectorSrc);
    let dest = document.querySelector(selectorDest);
    dest.appendChild(src);
  }

  hideElement(selector) {
    let el = document.querySelector(selector);
    el.style.display = 'none';
  }

  showElement(selector) {
    let el = document.querySelector(selector);
    el.style.display = 'block';
  }
}

export default SlidePlayer;