'use client';

import anime from 'animejs/lib/anime.es.js';
import { sleep } from '@/lib/utils';
import { duration } from '@mui/material';

class AnimeManager {
  constructor(animeSequence = []) {
    this.animeSequence = animeSequence;
    // this.animeSequence.unshift({"action": "break"});
    this.currentAnimeIndex = 0;
    this.currentAnimeTotalDuration = 0;
    this.descCallback = null;
    
    // 絶対値によるアニメ開始位置修正値
    this.fixNodeOffsets = {};
    // 相対値によるアニメ開始位置修正値
    this.fixNodeTranslates = {};

    // アニメ終了後の色を保持する変数
    this.nodeBgColors = {};

    // 途中でアニメーションをキャンセルするための変数
    // ボタンが押されたときに増分する変数
    this.runningAnimeId = 0;

    // スライダーのセレクタ
    this.sliderSelector = ".slide-range";

    this.next = this.next.bind(this);
    this.animeSwap = this.animeSwap.bind(this);
    this.getSliderEle = this.getSliderEle.bind(this);
  }

  setDescCallback(callback) {
    this.descCallback = callback;
  }

  async replay() {
    // アニメーション連想配列の要素一つ目の場合リプレイできないが、基本的に最初は説明文のbreakpointになると思うので問題ないと考える
    if(this.hasPrev()) {
      await this.prev();
      await this.next();
    }
  }

  async init() {
    this.descCallback(this.animeSequence[0].desc);
  }

  // 既に実行中のアニメーションをキャンセル
  // 新規アニメーション開始前に呼び出す
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

    // 色が変更されているノードを反映
    const tmpNodeBgColors = {};
    for(let selector in this.nodeBgColors) {
      anime.remove(selector);
      tmpNodeBgColors[selector] = this.nodeBgColors[selector].at(-1);
      anime({
        targets: selector,
        backgroundColor: this.nodeBgColors[selector].at(-1),
        duration: 0,
      });
    }
    this.nodeBgColors = tmpNodeBgColors;
  }

  getSliderEle() { return document.querySelector('.slide-range'); }

  async next(reverse = false, updateDesc = true) {
    let description = null;
    const animeSequencePartial = [];
    const reverseAnimeSequencePartial = [];
    const step = reverse ? -1 : 1;

    const currentAnimeId = this.runningAnimeId + 1;
    this.runningAnimeId++;
    await this.cancelLastAnime();

    let stillCurrentSlide = true;
    // 増分して順次呼び出しを行う
    while((!reverse && this.hasNext()) || (reverse && stillCurrentSlide && this.hasPrev())) {
      this.currentAnimeIndex += step;
      let animeDict = this.animeSequence[this.currentAnimeIndex];
      
      if(animeDict.action === "break") {
        if(updateDesc) description = animeDict.desc;
        if(reverse && stillCurrentSlide) {
          stillCurrentSlide = false;
          continue;
        }
        break;
      }
      
      // 逆方向の場合、stepが-1なので要素が逆になることに注意
      if(stillCurrentSlide && !reverse) {
        animeSequencePartial.push(animeDict);  
      }
      
      if(!stillCurrentSlide && reverse) {
        animeSequencePartial.unshift(animeDict);
      }

      // 戻る時と進む時でアニメーションを変える
      // prev()の場合、アニメーションをしないリストを作成
      if(reverse) {
        // 逆方向の場合の演出をスキップするためのフィルタ
        if(animeDict.action === "swap-fail") continue;
        if(animeDict.action === "spot") continue;
        // if(animeDict.action === "flash") continue;
        if(animeDict.action === "colors") {
          let tmpAnimeDict = JSON.parse(JSON.stringify(animeDict));
          tmpAnimeDict.colors = [animeDict.colors[0]];
          reverseAnimeSequencePartial.push(tmpAnimeDict);
          continue;
        }
        reverseAnimeSequencePartial.push(animeDict);
      }
    }


    // 説明の更新
    if(description) {
      this.descCallback(description);
    }

    // 最終的な修正値を決定しアニメーションを分離
    // このタイミングでアニメーション後の状態も保存する
    const translateResults = [];
    // reverseAnimeSequencePartialとanimeSequencePartialの両方を処理して実行
    for(let rev of reverse ? [true, false] : [false]) {
      let tmpTranslateResults = [];
      const revN = rev ? 0 : 1;
      let totalDuration = 0;
      for(let animeDict of rev ? reverseAnimeSequencePartial : animeSequencePartial) {
        // for(let animeDict of animeSequencePartial) {
        if(animeDict.action === "swap") {
          // swap
          const duration = rev ? 0 : animeDict.duration || 500;
          const translateResult = this.calcSwapTranslate(animeDict.sel1, animeDict.sel2);
          
          translateResults.push({
            "action": "swap",
            "sel1": animeDict.sel1,
            "sel2": animeDict.sel2,
            "duration": duration,
            "startTime": totalDuration,
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

          totalDuration += duration;
        }
        
        if(animeDict.action === "swap-fail") {
          // swap fail
          let duration = rev ? 0 : animeDict.duration || 500;
          let translateResult = this.calcSwapFailTranslate(animeDict.sel1, animeDict.sel2);
          translateResults.push({
            "action": "swap-fail",
            "sel1": animeDict.sel1,
            "sel2": animeDict.sel2,
            "duration": duration,
            "startTime": totalDuration,
            "translateResult": translateResult
          });

          totalDuration += duration;
        }
        
        if(animeDict.action === "colors") {
          // colors
          // console.log(animeDict.colors);
          let duration = rev ? 0 : animeDict.duration || 5000;
          translateResults.push({
            "action": "colors",
            "sel": animeDict.sel,
            "colors": animeDict.colors,
            "duration": duration,
            "startTime": totalDuration,
          });
          
          this.setBgColors(animeDict.sel, animeDict.colors);

          totalDuration += duration;
        }
        
        if(animeDict.action === "flash") {
          // flash
          let duration = rev ? 0 : animeDict.duration || 2000;
          translateResults.push({
            "action": "flash",
            "sel": animeDict.sel,
            "colors": [animeDict.color, undefined],
            "duration": duration,
            "startTime": totalDuration,
            "loop": animeDict.loop || true,
          });
        }
        totalDuration += duration;
      }
      this.currentAnimeTotalDuration = totalDuration;
      console.log(totalDuration)
      console.log(this.currentAnimeTotalDuration);
      translateResults.push(tmpTranslateResults);
    }

    // console.log(translateResults);

    // アニメーションの実行
    for(let translateResult of translateResults) {
      // 途中でアニメーションをキャンセルされた場合
      if(this.runningAnimeId !== currentAnimeId) break;
      
      // swap
      if(translateResult.action === "swap") {
        this.animeSwap(
          translateResult.sel1,
          translateResult.sel2,
          translateResult.duration,
          translateResult.translateResult,
          translateResult.startTime,
        );
        
        await sleep(translateResult.duration);
      }
      
      // swap fail
      if(translateResult.action === "swap-fail") {
        this.animeSwapFail(
          translateResult.sel1,
          translateResult.sel2,
          translateResult.duration,
          translateResult.translateResult,
          translateResult.startTime,
        );
        
        await sleep(translateResult.duration);
      }
      
      // spot
      if(translateResult.action === "spot") {
        // this.animeSpot(translateResult.sel);
      }
      
      // colors
      if(translateResult.action === "colors") {
        // this.animeColor(translateResult.sel, translateResult.color);
        // console.log(translateResult.colors);
        this.animeChangeBgColor( //translateResult.sel, translateResult.colors, translateResult.startTime);
          translateResult.sel,
          translateResult.colors,
          translateResult.duration,
          translateResult.startTime,
        );
      }
      
      // flash
      if(translateResult.action === "flash") {
        this.animeFlashBgColor(translateResult.sel, translateResult.colors, translateResult.duration, translateResult.loop, translateResult.startTime,);
      }
    }
  }

  async auto() {
    while(this.hasNext()) {
      await this.next();
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

  // プログレスバー位置を計算
  calcProgressBarPosition(startTime, duration, progress, totalDuration) {
    console.log(startTime, duration, progress, totalDuration);
    return progress * duration / totalDuration + startTime / totalDuration;
    return (startTime / totalDuration + progress * duration / 100) * (duration / totalDuration);
  }

  // スワップ失敗アニメーションの座標を計算
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

  // スワップ失敗アニメーションを実行
  animeSwapFail(selectorA, selectorB, duration, translateResult, startTime) {
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
    const ele = this.getSliderEle();
    const calc = this.calcProgressBarPosition;
    const totalDuration = this.currentAnimeTotalDuration
    let tl1 = anime.timeline({
      easing: 'easeInOutSine',
      update: function(anim) {
        ele.value = calc(startTime, duration, tl1.progress, totalDuration);
      }
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
  
  // 座標をもとにスワップアニメーションの座標を計算
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

  // スワップアニメーションを実行
  animeSwap(selectorA, selectorB, duration, translateResult, startTime = 0) {
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

    const ele = this.getSliderEle();
    const calc = this.calcProgressBarPosition;
    const totalDuration = this.currentAnimeTotalDuration;
    anime.timeline({
      easing: 'easeInOutSine',
      update: function(anim) {
        ele.value = calc(startTime, duration, anim.progress, totalDuration);
      }
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

  // ノードの移動修正値の絶対座標を取得
  // 常にアニメーション後の座標を指す
  getNodeOffset(selector) {
    if(this.fixNodeOffsets[selector]) {
      return this.fixNodeOffsets[selector];
    }
    const node = document.querySelector(selector);
    return { x: node.offsetLeft, y: node.offsetTop };
  }

  // ノードの移動修正値の絶対座標をセット
  // 常にアニメーション後の座標を指す
  setNodeOffset(selector, x, y) {
    this.fixNodeOffsets[selector] = { x: x, y: y };
  }

  // ノードのTranslate値を取得
  // アニメーション後の値を指す
  getNodeTranslate(selector) {
    if(this.fixNodeTranslates[selector]) {
      return this.fixNodeTranslates[selector];
    }
    return {x: 0, y: 0};
  }

  // ノードのTranslate値を設定
  // アニメーション後の値を指す
  setNodeTranslate(selector, x, y) {
    this.fixNodeTranslates[selector] = {x: x, y: y};
  }

  setBgColors(selector, colors) {
    this.nodeBgColors[selector] = colors;
  }

  // 背景色のアニメーションを実行
  animeChangeBgColor(selector, colors, duration = 5000) {
    const ele = this.getSliderEle();
    const calc = this.calcProgressBarPosition;
    const totalDuration = this.currentAnimeTotalDuration;
    anime({
      targets: selector,
      backgroundColor: colors,
      duration: duration,
      update: function(anim) {
        ele.value = calc(0, duration, anim.progress, totalDuration);
      }
    });
  }

  // 背景色を点滅させるアニメーションを実行
  animeFlashBgColor(selector, colors, duration, loop) {
    anime({
      targets: selector,
      backgroundColor: colors,
      duration: duration,
      loop: loop,
    });
  }
}

export default AnimeManager;