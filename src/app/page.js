"use client";

// import { M_PLUS_Rounded_1c } from "next/font/google";

import SectionBlock from "@/components/index-parts/section-block";
import SectionCard from "@/components/index-parts/section-card";
import { height, sizeHeight } from "@mui/system";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import React, {useEffect} from 'react'
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import anime from 'animejs/lib/anime.es.js';
import AnimeManager from "@/lib/anime-manager";
// import { mpr1c } from "./layout";

export default function Home() {
  const aboutThisSite = "このサイトは、ソートアルゴリズムをアニメーションで可視化することで、アルゴリズムの理解を深めることを目的としています。"
  const aboutAlgorithm = "アルゴリズムとは、ある問題を解決するための手順や方法のことです。ソートアルゴリズムは、データを昇順や降順に並べ替えるためのアルゴリズムです。"

  const bubbleSortDesc = "バブルソートとは、隣り合う要素を比較して、順番が逆であれば交換する操作を繰り返すアルゴリズムです。"
  const shakerSortDesc = "シェーカーソートとは、バブルソートの改良版で、片方向だけでなく、両方向からの交換を行うアルゴリズムです。"
  const combSortDesc = "コムソートとは、バブルソートの改良版で、隣り合う要素を比較するのではなく、離れた要素を比較するアルゴリズムです。"
  const gnomeSortDesc = "ノームソートとは、要素を前から順に見ていき、順番が逆であれば交換する操作を繰り返すアルゴリズムです。"
  const selectionSortDesc = "選択ソートとは、最小値を見つけ、それを先頭に移動させる操作を繰り返すアルゴリズムです。"
  const bozoSortDesc = "ボゾソートとは、ランダムに2つの要素を選び、順番が逆であれば交換する操作を繰り返すアルゴリズムです。"

  const am = new AnimeManager()

  const [ref, inView] = useInView({
    rootMargin: '-40%',
    triggerOnce: true,
  });

  const [ref2, inView2] = useInView({
    rootMargin: '-200px',
    triggerOnce: true,
  });

  useEffect(() => {
    const mTranslate = am.calcSwapTranslate(".title-large-m", ".title-small-m");
    const slideDuration = 700;
    const smDelay = 500;
    anime.timeline({
      easing: 'easeInOutSine',
      direction: 'alternate',
      targets: ".title-large-m",
      loop: true,
    }).add({
      translateX: mTranslate.translateAX,
      duration: slideDuration,
      delay: 500,
    }).add({
      duration: smDelay + slideDuration,
    });

    anime.timeline({
      easing: 'easeInOutSine',
      direction: 'alternate',
      targets: ".title-small-m",
      loop: true,
    }).add({
      translateX: mTranslate.translateBX,
      duration: slideDuration,
      delay: 500,
    }).add({
      duration: smDelay + slideDuration,
    });

    const sTranslate = am.calcSwapTranslate(".title-large-s", ".title-small-s");
    anime.timeline({
      easing: 'easeInOutSine',
      direction: 'alternate',
      targets: ".title-large-s",
      loop: true,
    }).add({
      duration: smDelay + slideDuration,
    }).add({
      translateX: sTranslate.translateAX,
      duration: slideDuration,
      delay: 500,
    });

    anime.timeline({
      easing: 'easeInOutSine',
      direction: 'alternate',
      targets: ".title-small-s",
      loop: true,
    }).add({
      duration: smDelay + slideDuration,
    }).add({
      translateX: sTranslate.translateBX,
      duration: slideDuration,
      delay: 500,
    }); 

    // anime({
    //   targets: ".scroll-down",
    //   translateY: -10,
    //   duration: 1000,
    //   direction: 'alternate',
    //   loop: true
    // });
    

    var livePatern = {
      canvas: null,
      contents: null,
      context: null,
      cols: 0,
      rows: 0,
      colors: [[142,158,64], [254,241,2], [227,26,34], [1,192,246], [255,181,46], [145,38,142]],
      triangleColors: [],
      destColors: [],
      
      init: function(){
        this.canvas = document.getElementById('canvas');
        this.contents = document.getElementById('contents');
        this.canvas.style.height=`${contents.offsetHeight}px`;
        this.context = this.canvas.getContext('2d');
        this.cols = Math.floor(document.body.clientWidth / 24);
        this.rows = Math.floor(document.body.clientHeight / 24) + 1;
        
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        
        this.drawBackground();
        this.animate();
      },
      
      drawTriangle: function(x, y, color, inverted){
        inverted = inverted == undefined ? false : inverted;

        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(inverted ? x - 22 : x + 22, y + 11);
        this.context.lineTo(x, y + 22);
        this.context.fillStyle = "rgb(255,255,255)";
        this.context.fill();
        this.context.closePath();
    
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(inverted ? x - 22 : x + 22, y + 11);
        this.context.lineTo(x, y + 22);
        this.context.fillStyle = "rgba("+color[0]+","+color[1]+","+color[2]+",0.1)";
        this.context.fill();
        this.context.closePath();
      },
      
      getColor: function(){    
        return this.colors[(Math.floor(Math.random() * 6))];
      },
      
      drawBackground: function(){
        var eq = null;
        var x = this.cols;
        var destY = 0;
        var color, y;
        
        while(x--){
          eq = x % 2;
          y = this.rows;
    
          while(y--){
            destY = Math.round((y-0.5) * 24);
    
            this.drawTriangle(x * 24 + 2, eq == 1 ? destY : y * 24, this.getColor());
            this.drawTriangle(x * 24, eq == 1 ? destY  : y * 24, this.getColor(), true);
          }
        }
      },
      
      animate: function(){
        var me = this;
    
        var x = Math.floor(Math.random() * this.cols);
        var y = Math.floor(Math.random() * this.rows);
        var eq = x % 2;
    
        if (eq == 1) {
          me.drawTriangle(x * 24, Math.round((y-0.5) * 24) , this.getColor(), true);
        } else {
          me.drawTriangle(x * 24 + 2, y * 24, this.getColor());
        }
    
        setTimeout(function(){    
          me.animate.call(me);
        }, 1);
      },
    };
    
    !function(){livePatern.init();}()
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      {/* <SlideIn /> */}
      <canvas id="canvas" className="relative h-full w-full">
      </canvas>
      
      <div id="contents" className="absolute top-0 left-0 min-h-screen w-full flex flex-col">    
        
        <div className="w-full h-screen flex flex-col md:p-28 pt-6 text-center  bg-white bg-opacity-60 shadow-lg">
          <div className="flex flex-col grow justify-center">

            <div className={`flex justify-center text-6xl m-1 md:m-5 pt-10`}>
            {/*Algorithm Library*/}
            <div className="title-large-s">S</div><div>ort</div><div>_</div><div className="title-large-m">M</div><div>u</div><div className="title-small-s">s</div><div>eu</div><div className="title-small-m">m</div>
            </div>
            {/* <div className="flex flex-col md:w-full"> */}
              <div className="text-3xl pt-4"> 
              {/*様々なアルゴリズムをアニメーションで可視化しています*/}
              様々なソートアルゴリズムを
              </div>
              <div className="text-3xl pb-4"> 
              アニメーションで可視化
              </div>
            {/* </div> */}
          </div>
          <div className="scroll-down flex-end pb-4">
            <div className="text-3xl">
              Scroll down
            </div>
            <div className="text-3xl">
              ↓
            </div>
          </div>
        </div>

        <SectionBlock title="このサイトについて">
          <div className="section-description text-left md:px-6 pb-8 whitespace-pre-line">
            <p ref={ref} className={inView ? "animate-fade-in-bottom" : "opacity-0"}>
            アルゴリズムの理解は、プログラミングにおいて非常に重要です。<br />
            しかし初学者が学ぶ途中でアルゴリズムをよく理解できず挫折してしまうこともあります。<br />
            せっかく興味を持って学び始めたのに、難しいアルゴリズムによって挫折してしまうのはもったいないと思いませんか？<br />
            もっと楽しく分かりやすく理解できたら、アルゴリズムの学習も楽しくなるのではないでしょうか。<br />
            このサイトは、ソートアルゴリズムをアニメーションで可視化することで、楽しくアルゴリズムの理解できるようにすることを目的としています。<br />
            </p>
          </div>
        </SectionBlock>

        <SectionBlock title="このサイトについて">
          <div className="section-description text-left md:px-6 pb-8 whitespace-pre-line">
            <p ref={ref2} className={inView2 ? "animate-fade-in-bottom" : "opacity-0"}>
            アルゴリズムの理解は、プログラミングにおいて非常に重要です。<br />
            しかし初学者が学ぶ途中でアルゴリズムをよく理解できず挫折してしまうこともあります。<br />
            せっかく興味を持って学び始めたのに、難しいアルゴリズムによって挫折してしまうのはもったいないと思いませんか？<br />
            もっと楽しく分かりやすく理解できたら、アルゴリズムの学習も楽しくなるのではないでしょうか。<br />
            このサイトは、ソートアルゴリズムをアニメーションで可視化することで、楽しくアルゴリズムの理解できるようにすることを目的としています。<br />
            </p>
          </div>
        </SectionBlock>

        <SectionBlock title="アルゴリズム一覧">
          <SectionCard title="バブルソート" description={bubbleSortDesc} link={"./bubble-sort"} img1Link={'./thumb-bubble.png'} />
          <SectionCard title="シェーカーソート" description={shakerSortDesc} link={"./shaker-sort"} />
          <SectionCard title="コムソート" description={combSortDesc} link={"./comb-sort"} />
          <SectionCard title="ノームソート" description={gnomeSortDesc} link={"./gnome-sort"} />
          <SectionCard title="選択ソート" description={selectionSortDesc} link={"./selection-sort"} />
          <SectionCard title="ボゾソート" description={bozoSortDesc} link={"./bozo-sort"} />
        </SectionBlock>
        
        {/* <div className="w-full md:px-20 md:py-24"> */}
          {/*<p className="text-4xl py-5">ソートアルゴリズム</p>*/}
          {/* <div className="">
            
          </div> */}
          {/* <div className="text-center grid md:grid-cols-3  *:text-3xl *:bg-blue-300 *:border-2 *:border-blue-500 *:mx-10 *:my-5 *:p-5 *:rounded-xl">
            <div><Link href={"./bubble-sort"}>バブルソート</Link></div>
            <div><Link href={"./shaker-sort"}>シェーカーソート</Link></div>
            <div><Link href={"./comb-sort"}>コムソート</Link></div>
            <div><Link href={"./gnome-sort"}>ノームソート</Link></div>
            <div><Link href={"./selection-sort"}>選択ソート</Link></div>
            <div><Link href={"./bozo-sort"}>ボゾソート</Link></div>
          </div> */}
        {/* </div> */}
{/*
        <div className="w-full px-20">
          <p className="text-4xl py-5">グラフアルゴリズム</p>
          <div className="text-center grid grid-cols-3 *:text-3xl *:bg-red-300 *:border-2 *:border-red-500 *:mx-10 *:my-5 *:p-5 *:rounded-xl">
            <div><Link href={"/"}>グラフとは</Link></div>
            <div><Link href={"/"}>深さ優先探索</Link></div>
            <div><Link href={"/"}>幅優先探索</Link></div>
            <div><Link href={"/"}>ダイクストラ法</Link></div>
            <div><Link href={"/"}>プリム法</Link></div>
          </div>
        </div>
        <div className="w-full px-20">
          <p className="text-4xl py-5">暗号化</p>
          <div className="text-center grid grid-cols-3 *:text-3xl *:bg-yellow-300 *:border-2 *:border-yellow-500 *:mx-10 *:my-5 *:p-5 *:rounded-xl">
            <div><Link href={"/"}>公開鍵暗号</Link></div>
            <div><Link href={"/"}>暗号鍵暗号</Link></div>
            <div><Link href={"/"}>DES</Link></div>
            <div><Link href={"/"}>RSA</Link></div>
            <div><Link href={"/"}>楕円曲線暗号</Link></div>
          </div>
        </div>
  */}
        <div className="spacer grow"></div>
        <div className="flex-end w-full mt-10 p-8 text-center bg-white bg-opacity-50">
        © 2024 Yuma SAWAI, Sora KAMIMURA
        </div>

      </div>
    </main>
  );
}
