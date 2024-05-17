"use client"

import SampleNode1 from "@/components/slide-parts/sample-node1";
import SortBlock1 from "@/components/slide-parts/sort-block1";

import AnimeManager from "@/lib/anime-manager";
import DescriptionManager from "@/lib/description-manager";
import Image from "next/image";
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useId, useState } from "react";
import { set } from "animejs";
import styled, { css } from 'styled-components';


const Styles = {
  "SlideTextDiv": styled.div`
    white-space: pre-wrap;
  `,
  "SlideAreaDiv": styled.div`
    max-width: 1000px
  `,
}


export default function Home() {

  const animeSequence = [
    {"action": "break", "desc": "バブルソートの説明をします"},
    {"action": "break", "desc": "バブルソートは隣り合う要素を比較して、順番が逆なら交換します\nこれを繰り返して、全ての要素が順番通りになるまで続けます"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e2"},
    {"action": "opacities", "sel": ".e1", "opacities": [0.5, 1]},
    // {"action": "flash", "sel": ".expl1", "color": "#F33", "loop": true},
    {"action": "break", "desc": "まずは左端から比較していきます\n30と20は30の方が大きいので交換します"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "break", "desc": "30<100なので交換しません"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e4"},
    {"action": "break", "desc": "100>10なので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e5"},
    {"action": "break", "desc": "100>25なので交換します"},
    {"action": "colors", "sel": ".e3 .graph", "colors": ["#000", "#F33"]},
    {"action": "break", "desc": "左から右へ比較を繰り返すことで1番大きい値が一番右に移動しました\nこれを繰り返して全ての要素を大きい順に並べます"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e2"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e4"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "break", "desc": "もう一度繰り返します"},
    {"action": "colors", "sel": ".e1 .graph", "colors": ["#000", "#F33"]},
    {"action": "break", "desc": "これで2番目に大きい値が決まりました"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e4"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "colors", "sel": ".e5 .graph", "colors": ["#000", "#F33"]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e4"},
    {"action": "colors", "sel": ".e2 .graph", "colors": ["#000", "#F33"]},
    {"action": "colors", "sel": ".e4 .graph", "colors": ["#000", "#F33"]},
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
  const pressTest = () => { am.animeChangeBgColor('.e1 graph-body', [undefined]);}
  const pressReplay = () => { am.replay(); }
  

  useEffect(() => {
    // strict modeだとuseEffectが2回呼ばれる
    if (inited) return;
    am.setDescCallback(setSlideDescription);
    am.init();
    // document.querySelector('.test').onclick = () => {
    //   am.animeChangeBgColor('.e1 graph-body', '#F33');
    // }
    
    inited = true;
  }, []);

  const SlideTextDiv = Styles.SlideTextDiv;
  const SlideAreaDiv = Styles.SlideAreaDiv;

  return (
    <main className="w-full">
      {/* 親要素にpaddingやmarginが掛かっていないのは、下画面の矢印が画面端に行くようにするため */}
      <div className="slide-area h-screen">
        {/* 画面上半分 スライド部分 */}
        <div className="slide-video h-3/5 flex">

          <div className="grow mx-4 mt-8">
            <div className="flex h-full w-full sort-elements content-center">
              <SortBlock1 className={`e1 expl1`} percent={30}/>
              <SortBlock1 className={`e2 expl1`} percent={20}/>
              <SortBlock1 className={`e3`} percent={90}/>
              <SortBlock1 className={`e4`} percent={10}/>
              <SortBlock1 className={`e5`} percent={25}/>
            </div>
          </div>
        </div>
        {/* 画面下半分　説明とコントロールなど */}
        <div className="flex-col slide-control h-2/5">
          <div className="h-3/4 mb-4 flex">
            <div className="flex grow">

              <div className="w-24">
                <button onClick={pressPrev} className="prev w-full h-full">←</button>
              </div>
              <SlideTextDiv
                className="slide-text min-h-31 grow p-4 w-full border text-2xl">
                <p>{slideDescription}</p>
              </SlideTextDiv>
              <div className="w-24">
                <button onClick={pressNext} className="next w-full h-full">→</button>
              </div>
            </div>
          </div>
          <div className="h-1/4">
            あ<button onClick={pressTest}>test</button>
          </div>
        </div>
        {/* <div className="slide-control">
          <button className="prev p-1 m-1 border"
            onClick={pressPrev}>Prev</button>
          <button className="replay p-1 m-1 border"
            onClick={pressReplay}>Replay</button>
          <button className="next p-1 m-1 border"
            onClick={pressNext}>Next</button>
          <button className="test p-1 m-1 border">Test</button>
        </div> */}
      </div>
    </main>
  );
}
