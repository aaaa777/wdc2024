"use client"
import { ThemeProvider } from "@mui/system";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-page";

import Link from "next/link";
import { duration } from "@mui/material";

export default function Home() {

  const colors = theme.palette.element;

  const animeSequence = [
    //テキストがないと最初の移動が適用されない
    // {"action": "break", "desc": "text"},
    {action: "break", "desc": "コムソートの説明をします"},
    {action: "break", "desc": "コムソートはバブルソートを改良したソートアルゴリズムです\nバブルソートのように隣あう要素を比較するのではなく、離れた要素からどんどん比較をしていくのが特徴です"},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.normal, colors.altSelected]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph,.e4 .graph,.e5 .graph", "colors": [colors.normal, colors.altNormal]},
    {"action": "break", "desc": "比較する要素の間隔は、要素数を1.3で割った数の小数点を切り捨てた数です\n今回は要素が7個あるので、7 // 1.3 = 5となり、5つ隣(4つ挟んだ位置)から比較していきます"},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.altSelected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph,.e4 .graph,.e5 .graph", "colors": [colors.altNormal, colors.normal]},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e1", "sel2": ".e6"},
    {"action": "break", "desc": "比較は小さいものが左に来るように交換します\nまずは30 > 15なので交換します"},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e7 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e7"},
    {"action": "break", "desc": "20 < 50なので交換しません\n比較要素が右端まで到達したためもう一度左端から繰り返します\nコムソートはこれを繰り返します"},
    {"action": "colors", "sel": ".e2 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e4 .graph,.e6 .graph", "colors": [colors.normal, colors.altSelected]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph", "colors": [colors.normal, colors.altNormal]},
    {"action": "break", "desc": "今度は先ほどの間隔5を1.3で割ると約3.8になるため、切り捨てて3つ隣の位置(2つ挟んだ位置)比較実行していきます"},
    {"action": "colors", "sel": ".e4 .graph,.e6 .graph", "colors": [colors.altSelected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph", "colors": [colors.altNormal, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e6 .graph,.e4 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e6", "sel2": ".e4"},
    {"action": "break", "desc": "15 > 10 なので交換します"},
    {"action": "colors", "sel": ".e6 .graph,.e4 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e5 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "break", "desc": "20 < 25 なので交換しません"},
    {"action": "colors", "sel": ".e2 .graph,.e5 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e3 .graph,.e1 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e1"},
    {"action": "break", "desc": "90 > 30なので交換します"},
    {"action": "colors", "sel": ".e3 .graph,.e1 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e6 .graph,.e7 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e7"},
    {"action": "break", "desc": "15 < 50なので交換しません"},
    // {"action": "break", "desc": "右端まで到達したためもう一度左端から、今度は1つ挟んで比較実行していきます"},
    {"action": "colors", "sel": ".e6 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e4 .graph,.e1 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e1"},
    {"action": "colors", "sel": ".e4 .graph,.e1 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e6 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e2", "sel2": ".e6"},
    {"action": "colors", "sel": ".e2 .graph,.e6 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e1 .graph,.e5 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "colors", "sel": ".e1 .graph,.e5 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e3"},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e1 .graph,.e7 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e7"},
    {"action": "break", "desc": "右端まで到達したため要素の比較幅を再計算します\n3 // 1.3 = 2より、今度は2つ隣(間に一つ挟んだ要素)を比較していきます"},
    {"action": "colors", "sel": ".e1 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e4 .graph,.e6 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e6"},
    {"action": "colors", "sel": ".e4 .graph,.e6 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e6 .graph,.e5 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e5"},
    {"action": "colors", "sel": ".e6 .graph,.e5 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e5 .graph,.e2 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e5", "sel2": ".e2"},
    {"action": "colors", "sel": ".e5 .graph,.e2 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e5 .graph,.e1 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e5", "sel2": ".e1"},
    {"action": "colors", "sel": ".e5 .graph,.e1 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e1 .graph,.e3 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "colors", "sel": ".e1 .graph,.e3 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e3 .graph,.e7 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e7"},
    {"action": "break", "desc": "再度、右端まで到達したため要素の比較幅を再計算します\nここからは入れ替えがなくなるまで隣り合う要素を比較していきます"},
    {"action": "colors", "sel": ".e3 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e4 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [colors.normal, colors.locked]},
    {"action": "break", "desc": "これでソートが完了しました\n以上がコムソートの流れになります"},
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <SlidePage title="コムソート" animeSequence={animeSequence}>
        <div className="flex h-full w-full sort-elements content-center">
          <SortBlock1 percent={30} className="e1"/>
          <SortBlock1 percent={20} className="e2"/>
          <SortBlock1 percent={90} className="e3"/>
          <SortBlock1 percent={10} className="e4"/>
          <SortBlock1 percent={25} className="e5"/>
          <SortBlock1 percent={15} className="e6"/>
          <SortBlock1 percent={50} className="e7"/>
        </div>
      </SlidePage>
    </ThemeProvider>
  );
}
