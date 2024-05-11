"use client"

import SampleNode1 from "@/components/slide-parts/sample-node1";
import SortBlock1 from "@/components/slide-parts/sort-block1";

import AnimeManager from "@/lib/anime-manager";
import DescriptionManager from "@/lib/description-manager";
import Image from "next/image";
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useId, useState } from "react";
import { set } from "animejs";

// TODO: 連打した時の対策

export default function Home() {

  const animeSequence = [
    {"action": "break", "desc": "バブルソートの説明をします"},
    {"action": "break", "desc": "バブルソートは隣り合う要素を比較して、順番が逆なら交換します"},
    {"action": "break", "desc": "これを繰り返して、全ての要素が順番通りになるまで続けます"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e2"},
    {"action": "break", "desc": "30>20なので交換します"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "break", "desc": "30<100なので交換しません"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e4"},
    {"action": "break", "desc": "100>10なので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e5"},
    {"action": "break", "desc": "100>25なので交換します"},
    {"action": "break", "desc": "これで1番大きい値が一番右に移動しました"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e2"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e4"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "break", "desc": "もう一度繰り返します"},
    {"action": "break", "desc": "これで2番目に大きい値が決まりました"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e4"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e4"},
    {"action": "break", "desc": "全ての順番が決まるまで繰り返します"},
    {"action": "break", "desc": "これでソートが完了しました"},
  ];

  let inited = false;
  
  let [slideNumber, setSlideNumber] = useState(0);
  const [slideDescription, setSlideDescription] = useState('読み込み中');
  
  // https://stackoverflow.com/questions/73149606/why-is-my-usestate-variable-initialized-every-time-my-react-components-is-render
  let [am, setAM] = useState(() => new AnimeManager(animeSequence));

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
    am.setDescCallback(setSlideDescription);
    am.init();
    document.querySelector('.test').onclick = () => {
      console.log('test');
    }
    
    inited = true;
  }, []);

  return (
    <main className="p-4 w-full">
      <div className="slide-area">
        <div className="slide-video p-4 border"> {/*TODO:高さ指定を追加する*/}
          <div className="flex sort-elements">
            <SortBlock1 className={`e1`} percent={30}/>
            <SortBlock1 className={`e2`} percent={20}/>
            <SortBlock1 className={`e3`} percent={100}/>
            <SortBlock1 className={`e4`} percent={10}/>
            <SortBlock1 className={`e5`} percent={25}/>
          </div>
        </div>
        <div className="slide-text p-4 w-full border">
          <h1>{slideDescription}</h1>
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
