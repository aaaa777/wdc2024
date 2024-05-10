"use client"

import SampleNode1 from "@/components/slide-parts/sample-node1";
import TimelinePlayer from "@/lib/timeline-player";
import SlidePlayer from "@/lib/slide-player";
import Image from "next/image";
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useId, useState } from "react";

export default function Home() {

  let tlp = new TimelinePlayer();
  let sp = new SlidePlayer();
  let inited = false;

  let [slideNumber, setSlideNumber] = useState(0);
  let [pressButtonCount, setPressButtonCount] = useState(0);

  const pressNext = () => {
    tlp.next();
    setPressButtonCount(pressButtonCount + 1);
  }

  // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test3', 1000, 0, 0, 0, 0);
  // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test3', 1000, 0, 0, 0, 0);
  
  useEffect(() => {
    // strict modeだとuseEffectが2回呼ばれる
    if (inited) return;

    console.log('useEffect');
    tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test2', 1000, 0, 0, 0, 0);
    tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test3', 1000, 0, 0, 0, 0);
    tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test4', 1000, 0, 0, 0, 0);
    
    document.querySelector('.next').onclick = pressNext;
    document.querySelector('.replay').onclick = tlp.play;
    document.querySelector('.prev').onclick = tlp.prev;
    document.querySelector('.test').onclick = () => {
      // sp.swapElementWithAnimation('.sample-node .test1', '.sample-node .test2');
    }
    inited = true;
  }, []);

  useEffect(() => {
    setSlideNumber(tlp.timelineCursor);
  }, [pressButtonCount]);

  return (
    <main className="p-4 w-full">
      <div className="slide-area">
        <div className="slide-video p-4 w-full border">
          <div className="flex sample-node">
            <SampleNode1 className={`test1`} description={`one`}/>
            <SampleNode1 className={`test2`} description={`two`}/>
            <SampleNode1 className={`test3`} description={`three`}/>
            <SampleNode1 className={`test4`} description={`four`}/>
          </div>
        </div>
        <div className="slide-text p-4 w-full border">
          <h1>{slideNumber}</h1>
        </div>
        <div className="slide-control">
          <button className="prev   p-1 m-1 border">Prev</button>
          <button className="replay p-1 m-1 border">Replay</button>
          <button className="next   p-1 m-1 border">Next</button>
          <button className="test   p-1 m-1 border">Test</button>
        </div>
      </div>
    </main>
  );
}
