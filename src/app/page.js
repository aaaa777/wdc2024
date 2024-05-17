"use client";

import { height, sizeHeight } from "@mui/system";
import Link from "next/link";
import React, {useEffect} from 'react'

export default function Home() {
  useEffect(() => {
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
    <main className="min-h-screen flex-col items-center justify-between">
      <canvas id="canvas" className="relative h-full w-full">
      </canvas>
      
      <div id="contents" className="absolute top-0 left-0 min-h-screen w-full flex flex-col">    
        
        <div className="w-full md:mb-10 md:p-28 pt-6 text-center  bg-white bg-opacity-50">
          <div className="text-6xl m-1 md:m-5">
          {/*Algorithm Library*/}
          Sort Museum
          </div>
          
          <div className="text-3xl py-4"> 
          {/*様々なアルゴリズムをアニメーションで可視化しています*/}
          様々なソートアルゴリズムをアニメーションで可視化しています
          </div>
        </div>

        
        <div className="w-full md:px-20 md:py-24">
          {/*<p className="text-4xl py-5">ソートアルゴリズム</p>*/}
          {/* <div className="">
            
          </div> */}
          <div className="text-center grid md:grid-cols-3  *:text-3xl *:bg-blue-300 *:border-2 *:border-blue-500 *:mx-10 *:my-5 *:p-5 *:rounded-xl">
            <div><Link href={"./bubble-sort"}>バブルソート</Link></div>
            <div><Link href={"./shaker-sort"}>シェーカーソート</Link></div>
            <div><Link href={"./comb-sort"}>コムソート</Link></div>
            <div><Link href={"./gnome-sort"}>ノームソート</Link></div>
            <div><Link href={"./selection-sort"}>選択ソート</Link></div>
            <div><Link href={"./bozo-sort"}>ボゾソート</Link></div>
          </div>
        </div>
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
        <div className="w-full mt-10 p-8 text-center bg-white bg-opacity-50">
        © 2024 Yuma SAWAI, Sora KAMIMURA
        </div>

      </div>
    </main>
  );
}
