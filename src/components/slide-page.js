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

import Button from '@mui/material/Button';
import SortDescription from "./slide-parts/sort-description";
import { Box, ThemeProvider } from "@mui/material";

const Styles = {
  "SlideTextDiv": styled.div`
    white-space: pre-wrap;
  `,
  "SlideAreaDiv": styled.div`
    max-width: 1000px
  `,
}

// props required
// animeSequence: array of objects
// children: element of blocks

export default function SlidePage(props) {

  const animeSequence = props.animeSequence;

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
  const pressAuto = () => { am.auto(); }

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
    <div className="w-full">
      <div className="slide-area h-screen p-6">
        {/* 画面上半分 スライド部分 */}
        <div className="slide-video h-3/5 flex flex-col">
          <h1>{props.slideTitle}</h1>
          <div className="w-full grow px-4 pt-8">
            {props.children}
          </div>
        </div>
        {/* 画面下半分　説明とコントロールなど */}
        <div className="flex-col slide-control h-2/5">
          <div className="h-full pb-10 flex">
            <div className="flex grow">
              <SortDescription 
                pressNextCallback={pressNext}
                pressPrevCallback={pressPrev}
                pressAutoCallback={pressAuto}
              >
                {slideDescription}
              </SortDescription>
              
            </div>
          </div>
          {/* <div className="h-1/4">
            あ<button onClick={pressTest}>test</button>
          </div> */}
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
    </div>
  );
}
