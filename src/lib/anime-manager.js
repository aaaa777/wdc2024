'use client';

import anime from 'animejs/lib/anime.es.js';
import { sleep } from '@/lib/utils';

class AnimeManager {
  constructor(animeSequence = []) {
    this.animeSequence = animeSequence;
    this.currentAnimeIndex = -1;
    this.descCallback = null;
    
    // 絶対値によるアニメ開始位置修正値
    this.fixNodeOffsets = {};
    // 相対値によるアニメ開始位置修正値
    this.fixNodeTranslates = {};

    this.next = this.next.bind(this);
    this.animeSwap = this.animeSwap.bind(this);
  }

  // addSwapAnimation(selectorA, selectorB) {
  //   this.animeSequence.push({ "action": "swap", "sel1": selectorA, "sel2": selectorB });
  // }

  // addBreakpoint() {
  //   this.animeSequence.push({ "action": "breakpoint" });
  // }

  setDescCallback(callback) {
    this.descCallback = callback;
  }

  replay() {
    this.prev();
    this.next();
  }

  async next(reverse = false) {
    let animeQueue = [];
    let step = reverse ? -1 : 1;
    while((!reverse && this.hasNext()) || (reverse && this.hasPrev())) {
      this.currentAnimeIndex += step;
      let animeDict = this.animeSequence[this.currentAnimeIndex];

      if(animeDict.action === "break") {
        break;
      }

      animeQueue.push(animeDict);
    }

    // TODO:連続クリックによるスキップ実装のためループを分離
    for(let animeDict of animeQueue) {
      if(animeDict.action === "swap") {
        // swap
        let duration = reverse ? 0 : animeDict.duration || 500;
        this.animeSwap(animeDict.sel1, animeDict.sel2, duration);
        
        await sleep(duration);
      }
      
      if(animeDict.action === "desc") {
        // desc
        this.descCallback(animeDict.body);
      }
    }
  }

  async prev() {
    await this.next(true);
  }

  hasNext() {
    return this.currentAnimeIndex < this.animeSequence.length - 1;
  }

  hasPrev() {
    return this.currentAnimeIndex > -1;
  }

  // completeTranslateResult(animeDicts = []) {
  //   animeDicts.forEach((animeDict) => {
  //     if(animeDict.action === "swap") {
  //       let selectorA = animeDict.sel1;
  //       let selectorB = animeDict.sel2;
  //       let offsetAX = this.getNodeOffset(selectorA).x;
  //       let offsetAY = this.getNodeOffset(selectorA).y;
  //       let offsetBX = this.getNodeOffset(selectorB).x;
  //       let offsetBY = this.getNodeOffset(selectorB).y;
  //       // this.setNodeOffset(selectorA, offsetBX, offsetBY);
  //       // this.setNodeOffset(selectorB, offsetAX, offsetAY);
  //     }
  //   });
  // }

  animeSwap(selectorA, selectorB, duration, reverse = false) {
    let offsetAX = this.getNodeOffset(selectorA).x;
    let offsetAY = this.getNodeOffset(selectorA).y;
    let offsetBX = this.getNodeOffset(selectorB).x;
    let offsetBY = this.getNodeOffset(selectorB).y;
    let currentTranslateAX = this.getNodeTranslate(selectorA).x;
    let currentTranslateAY = this.getNodeTranslate(selectorA).y;
    let currentTranslateBX = this.getNodeTranslate(selectorB).x;
    let currentTranslateBY = this.getNodeTranslate(selectorB).y;
    let translateAX = currentTranslateAX + offsetBX - offsetAX;
    let translateAY = currentTranslateAY + offsetBY - offsetAY;
    let translateBX = currentTranslateBX + offsetAX - offsetBX;
    let translateBY = currentTranslateBY + offsetAY - offsetBY;

    console.log('animeSwap', selectorA, offsetAX, offsetAY);
    console.log('- translate', selectorA, translateAX, translateAY);
    console.log('animeSwap', selectorB, offsetBX, offsetBY);
    console.log('- translate', selectorB, translateBX, translateBY);

    // 移動後位置を記録
    this.setNodeOffset(selectorA, offsetBX, offsetBY);
    this.setNodeOffset(selectorB, offsetAX, offsetAY);
    this.setNodeTranslate(selectorA, translateAX, translateAY);
    this.setNodeTranslate(selectorB, translateBX, translateBY);

    // if(!reverse) {
      // リセット
      anime({
        targets: selectorA,
        translateX: currentTranslateAX,
        translateY: currentTranslateAY,
        duration: 0,
      }).complete = () => {
        anime({
          targets: selectorA,
          translateX: translateAX,
          translateY: translateAY,
          duration: duration,
          easing: 'easeInOutSine',
        });
      };
      anime({
        targets: selectorB,
        translateX: currentTranslateBX,
        translateY: currentTranslateBY,
        duration: 0,
      }).complete = () => {
        anime({
          targets: selectorB,
          translateX: translateBX,
          translateY: translateBY,
          duration: duration,
          easing: 'easeInOutSine',
        });
      };

  }

  getNodeOffset(selector) {
    if(this.fixNodeOffsets[selector]) {
      return this.fixNodeOffsets[selector];
    }
    const node = document.querySelector(selector);
    return { x: node.offsetLeft, y: node.offsetTop };
  }

  setNodeOffset(selector, x, y) {
    this.fixNodeOffsets[selector] = { x: x, y: y };
  }

  getNodeTranslate(selector) {
    if(this.fixNodeTranslates[selector]) {
      return this.fixNodeTranslates[selector];
    }
    return {x: 0, y: 0};
  }

  setNodeTranslate(selector, x, y) {
    this.fixNodeTranslates[selector] = {x: x, y: y};
  }
}

export default AnimeManager;