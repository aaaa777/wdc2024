"use client"

import SampleNode1 from "@/components/slide-parts/sample-node1";

import AnimeManager from "@/lib/anime-manager";
import DescriptionManager from "@/lib/description-manager";
import Image from "next/image";
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useId, useState } from "react";

// TODO: 連打した時の対策

export default function Home() {

  const animeSequence = [
    {"action": "break"},
    {"action": "swap", "sel1": ".test1", "sel2": ".test3"},
    {"action": "swap-fail", "sel1": ".test1", "sel2": ".test3"},
    {"action": "spot", "sel": ".test1"},
    {"action": "color", "sel": ".test1", "color": "red"},
  ];

  const descriptionSequence = [
    '最初の説明です',
    '次の説明です',
    'その次の説明です',
    '次で説明は終わりです',
    '最後の説明です',
  ];
  let inited = false;
  
  let [slideNumber, setSlideNumber] = useState(0);
  
  // https://stackoverflow.com/questions/73149606/why-is-my-usestate-variable-initialized-every-time-my-react-components-is-render
  let [am, setAM] = useState(() => new AnimeManager(animeSequence));
  let [dm, setDM] = useState(() => new DescriptionManager(descriptionSequence));

  const pressNext = () => {
    if(am.hasNext()) {
      setSlideNumber(slideNumber + 1);
    }
    am.next();
  }
  
  const pressPrev = () => {
    if(am.hasPrev()) {
      setSlideNumber(slideNumber - 1);
    }
    am.prev();
  }

  const pressReplay = () => { am.replay(); }
  

  useEffect(() => {
    // strict modeだとuseEffectが2回呼ばれる
    if (inited) return;
    document.querySelector('.test').onclick = () => {
      console.log('test');
    }
    inited = true;
  }, []);

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
          <h1>{dm.readByIndex(slideNumber)}</h1>
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
