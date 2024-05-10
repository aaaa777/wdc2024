"use client"

import SampleNode1 from "@/components/slide-parts/sample-node1";
import TimelinePlayer from "@/lib/timeline-player";
import SlidePlayer from "@/lib/slide-player";
import AnimeManager from "@/lib/anime-manager";
import Image from "next/image";
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useId, useState } from "react";

// TODO: 連打した時の対策

export default function Home() {

  const animeSequence = [
    { "action": "breakpoint" },
    { "action": "swap", "selectorA": ".sample-node .test1", "selectorB": ".sample-node .test3" },
    { "action": "breakpoint" },
    { "action": "swap", "selectorA": ".sample-node .test1", "selectorB": ".sample-node .test2" },
    { "action": "breakpoint" },
    { "action": "swap", "selectorA": ".sample-node .test1", "selectorB": ".sample-node .test4" },
    { "action": "breakpoint" },
    { "action": "swap", "selectorA": ".sample-node .test1", "selectorB": ".sample-node .test4" },
    { "action": "swap", "selectorA": ".sample-node .test1", "selectorB": ".sample-node .test4" },
    { "action": "breakpoint" },
  ];
  let inited = false;
  
  let [slideNumber, setSlideNumber] = useState(0);
  let [pressButtonCount, setPressButtonCount] = useState(0);
  
  // https://stackoverflow.com/questions/73149606/why-is-my-usestate-variable-initialized-every-time-my-react-components-is-render
  const createAM = () => new AnimeManager(animeSequence);
  let [am, setAM] = useState(() => createAM());

  const pressNext = () => {
    if(am.hasNext()) {
      setSlideNumber(slideNumber + 1);
    }
    am.next();
    // setPressButtonCount(pressButtonCount + 1);
  }
  
  const pressPrev = () => {
    if(am.hasPrev()) {
      setSlideNumber(slideNumber - 1);
    }
    am.prev();
    // setPressButtonCount(pressButtonCount + 1);
  }

  const pressReplay = () => { am.replay(); }
  
  // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test3', 1000, 0, 0, 0, 0);
  // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test3', 1000, 0, 0, 0, 0);
  
  useEffect(() => {
    // strict modeだとuseEffectが2回呼ばれる
    if (inited) return;
    // setAM(() => createAM());
    
    console.log('useEffect');
    // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test2', 1000, 0, 0, 0, 0);
    // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test3', 1000, 0, 0, 0, 0);
    // tlp.addSwapAnimation('.sample-node .test1', '.sample-node .test4', 1000, 0, 0, 0, 0);
    
    document.querySelector('.test').onclick = () => {
      setPressButtonCount(pressButtonCount + 1);
      // sp.swapElementWithAnimation('.sample-node .test1', '.sample-node .test2');
    }
    inited = true;
  }, []);

  useEffect(() => {
    // setSlideNumber(tlp.timelineCursor);
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
          <button className="prev p-1 m-1 border"
            onClick={pressPrev}>Prev</button>
          <button className="replay p-1 m-1 border"
            onClick={pressReplay}>Replay</button>
          <button className="next p-1 m-1 border"
            onClick={pressNext}>Next</button>
          <button className="test p-1 m-1 border">Test</button>
        </div>
      </div>
    </main>
  );
}
