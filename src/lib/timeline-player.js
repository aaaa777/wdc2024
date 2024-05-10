"use client"

import SlidePlayer from "./slide-player";

class TimelinePlayer {
  constructor() {
    this.timelineCursor = 0;
    this.timelineAnimations = [];
    this.isReverse = false;
    this.sp = new SlidePlayer();
    
    this.addSwapAnimation = this.addSwapAnimation.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  resetAnimation() {
    this.timelineCursor = 0;
    this.timelineAnimations = [];
  }

  addSwapAnimation(selectorA, selectorB, duration = 500) {
    console.debug('addSwapAnimation')
    this.timelineAnimations.push(() => this.sp.swapElementWithAnimation(selectorA, selectorB, duration));
  }

  pause() {
    // this.timelineAnimations[this.timelineCursor].pause();
  }

  play() {
    console.log(this.timelineCursor);
    this.timelineAnimations[this.timelineCursor]();
  }

  next() {
    if (this.hasNext()) {
      this.timelineCursor++;
      // this.isReverse = false;
      this.play();
    }
  }

  prev() {
    if (this.hasPrev()) {
      this.timelineCursor--;
      // this.isReverse = true;
      this.play();
    }
  }

  hasNext() {
    return this.timelineCursor < this.timelineAnimations.length - 1;
  }

  hasPrev() {
    return this.timelineCursor > 0;
  }
}

export default TimelinePlayer;