'use client';

import anime from 'animejs/lib/anime.es.js';
import { sleep } from '@/lib/utils';

class AnimeManager {
  constructor(animeSequence = []) {
    this.animeSequence = animeSequence;
    // this.animeSequence.unshift({"action": "break"});
    this.currentAnimeIndex = 0;
    this.descCallback = null;
    
    // 絶対値によるアニメ開始位置修正値
    this.fixNodeOffsets = {};
    // 相対値によるアニメ開始位置修正値
    this.fixNodeTranslates = {};

    // 途中でアニメーションをキャンセルするための変数
    // ボタンが押されたときに増分する変数
    this.runningAnimeId = 0;

    this.next = this.next.bind(this);
    this.animeSwap = this.animeSwap.bind(this);
  }

  setDescCallback(callback) {
    this.descCallback = callback;
  }

  async replay() {
    await this.prev();
    await this.next();
  }

  async init() {
    this.descCallback(this.animeSequence[0].desc);
  }

  // 既に実行中のアニメーションをキャンセル
  async cancelLastAnime() {
    // translateがかかっているノードを元に戻す
    for(let selector in this.fixNodeTranslates) {
      anime.remove(selector);
      anime({
        targets: selector,
        translateX: this.fixNodeTranslates[selector].x,
        translateY: this.fixNodeTranslates[selector].y,
        duration: 0,
      });
    }
  }

  async next(reverse = false, updateDesc = true) {
    let description = null;
    let animeSequencePartial = [];
    let step = reverse ? -1 : 1;

    const currentAnimeId = this.runningAnimeId + 1;
    this.runningAnimeId++;
    await this.cancelLastAnime();

    while((!reverse && this.hasNext()) || (reverse && this.hasPrev())) {
      this.currentAnimeIndex += step;
      let animeDict = this.animeSequence[this.currentAnimeIndex];
      
      if(animeDict.action === "break") {
        if(updateDesc) description = animeDict.desc;
        
        break;
      }
      
      if(!reverse) {
        animeSequencePartial.push(animeDict);

        // 逆方向の場合の演出フィルタ
      } else {
        if(animeDict.action === "swap-fail") continue;
        if(animeDict.action === "spot") continue;
        animeSequencePartial.push(animeDict);
      }
      
    }

    // 説明の更新
    if(description) {
      this.descCallback(description);
    }

    // 最終的な修正値を決定しアニメーションを分離
    let translateResults = [];
    for(let animeDict of animeSequencePartial) {
      if(animeDict.action === "swap") {
        // swap
        const duration = reverse ? 0 : animeDict.duration || 500;
        const translateResult = this.calcSwapTranslate(animeDict.sel1, animeDict.sel2);

        translateResults.push({
          "action": "swap",
          "sel1": animeDict.sel1,
          "sel2": animeDict.sel2,
          "duration": duration,
          "translateResult": translateResult,
        });

        const {
          offsetAX,
          offsetAY,
          offsetBX,
          offsetBY,
          translateAX,
          translateAY,
          translateBX,
          translateBY,
        } = translateResult;

        // 移動後位置を記録
        this.setNodeOffset(animeDict.sel1, offsetBX, offsetBY);
        this.setNodeOffset(animeDict.sel2, offsetAX, offsetAY);
        this.setNodeTranslate(animeDict.sel1, translateAX, translateAY);
        this.setNodeTranslate(animeDict.sel2, translateBX, translateBY);
      }

      if(animeDict.action === "swap-fail") {
        // swap fail
        let duration = reverse ? 0 : animeDict.duration || 500;
        let translateResult = this.calcSwapFailTranslate(animeDict.sel1, animeDict.sel2);
        translateResults.push({
          "action": "swap-fail",
          "sel1": animeDict.sel1,
          "sel2": animeDict.sel2,
          "duration": duration,
          "translateResult": translateResult
        });
      }
    }

    // アニメーションの実行
    for(let translateResult of translateResults) {
      // 途中でアニメーションをキャンセルされた場合
      console.log(this.runningAnimeId, currentAnimeId)
      if(this.runningAnimeId !== currentAnimeId) break;

      // swap
      if(translateResult.action === "swap") {
        this.animeSwap(translateResult.sel1, translateResult.sel2,
          translateResult.duration, translateResult.translateResult
        );
        
        await sleep(translateResult.duration);
      }

      // swap fail
      if(translateResult.action === "swap-fail") {
        this.animeSwapFail(translateResult.sel1, translateResult.sel2,
          translateResult.duration, translateResult.translateResult
        );

        await sleep(translateResult.duration);
      }

      // spot
      if(translateResult.action === "spot") {
        // this.animeSpot(translateResult.sel);
      }

      // color
      if(translateResult.action === "color") {
        // this.animeColor(translateResult.sel, translateResult.color);
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
    return this.currentAnimeIndex > 0;
  }

  calcSwapFailTranslate(selectorA, selectorB) {
    let offsetAX = this.getNodeOffset(selectorA).x;
    let offsetAY = this.getNodeOffset(selectorA).y;
    let offsetBX = this.getNodeOffset(selectorB).x;
    let offsetBY = this.getNodeOffset(selectorB).y;
    let currentTranslateAX = this.getNodeTranslate(selectorA).x;
    let currentTranslateAY = this.getNodeTranslate(selectorA).y;
    let currentTranslateBX = this.getNodeTranslate(selectorB).x;
    let currentTranslateBY = this.getNodeTranslate(selectorB).y;
    let translateAX = currentTranslateAX + (offsetBX - offsetAX) / 4;
    let translateAY = currentTranslateAY + (offsetBY - offsetAY) / 4;
    let translateBX = currentTranslateBX + (offsetAX - offsetBX) / 4;
    let translateBY = currentTranslateBY + (offsetAY - offsetBY) / 4;

    return {
      currentTranslateAX: currentTranslateAX,
      currentTranslateAY: currentTranslateAY,
      currentTranslateBX: currentTranslateBX,
      currentTranslateBY: currentTranslateBY,
      translateAX: translateAX,
      translateAY: translateAY,
      translateBX: translateBX,
      translateBY: translateBY,
    };
  }

  animeSwapFail(selectorA, selectorB, duration, translateResult) {
    let { 
      currentTranslateAX,
      currentTranslateAY,
      currentTranslateBX,
      currentTranslateBY,
      translateAX,
      translateAY,
      translateBX,
      translateBY
    } = translateResult;

    anime.timeline({
      easing: 'easeInOutSine',
    }).add({
      targets: selectorA,
      translateX: currentTranslateAX,
      translateY: currentTranslateAY,
      duration: 0,
    }).add({
      targets: selectorA,
      translateX: translateAX,
      translateY: translateAY,
      duration: duration / 2,
      easing: 'easeInOutSine',
    }).add({
      targets: selectorA,
      translateX: currentTranslateAX,
      translateY: currentTranslateAY,
      duration: duration / 2,
      easing: 'easeInOutSine',
    });

    anime.timeline({
      easing: 'easeInOutSine',
    }).add({
      targets: selectorB,
      translateX: currentTranslateBX,
      translateY: currentTranslateBY,
      duration: 0,
    }).add({
      targets: selectorB,
      translateX: translateBX,
      translateY: translateBY,
      duration: duration / 2,
      easing: 'easeInOutSine',
    }).add({
      targets: selectorB,
      translateX: currentTranslateBX,
      translateY: currentTranslateBY,
      duration: duration / 2,
    });
  }
  

  calcSwapTranslate(selectorA, selectorB) {
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

    return {
      currentTranslateAX: currentTranslateAX,
      currentTranslateAY: currentTranslateAY,
      currentTranslateBX: currentTranslateBX,
      currentTranslateBY: currentTranslateBY,
      translateAX: translateAX,
      translateAY: translateAY,
      translateBX: translateBX,
      translateBY: translateBY,
      offsetAX: offsetAX,
      offsetAY: offsetAY,
      offsetBX: offsetBX,
      offsetBY: offsetBY,
    };
  }

  animeSwap(selectorA, selectorB, duration, translateResult) {
    const {
      currentTranslateAX,
      currentTranslateAY,
      currentTranslateBX,
      currentTranslateBY,
      translateAX,
      translateAY,
      translateBX,
      translateBY,
    } = translateResult;

    anime.timeline({
      easing: 'easeInOutSine',
    }).add({
      targets: selectorA,
      translateX: currentTranslateAX,
      translateY: currentTranslateAY,
      duration: 0,
    }).add({
      targets: selectorA,
      translateX: translateAX,
      translateY: translateAY,
      duration: duration,
    });
    
    anime.timeline({
      easing: 'easeInOutSine',
    }).add({
      targets: selectorB,
      translateX: currentTranslateBX,
      translateY: currentTranslateBY,
      duration: 0,
    }).add({
      targets: selectorB,
      translateX: translateBX,
      translateY: translateBY,
      duration: duration,
      easing: 'easeInOutSine',
    });

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