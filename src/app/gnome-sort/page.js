"use client"
import { ThemeProvider } from "@mui/system";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-parts/slide-page";

import Link from "next/link";

export default function Home() {

  const color = theme.palette.element;

  const animeSequence = [
    //テキストがないと最初の移動が適用されない
    {"action": "break", "desc": "このページではノームソートについて説明します"},
    {"action": "colors", "sel": ".e1 .graph, .e2 .graph", "colors": [color.normal, color.selected]},
    {"action": "swap", "sel1": ".e2", "sel2": ".e1"},
    {"action": "break", "desc": "まずは左端から2つ目までを小さい順に入れ替えます"},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "swap-fail", "sel1": ".e3", "sel2": ".e1"},
    {"action": "break", "desc": "左端から3つ目までを小さい順に入れ替えます\nこの時既に小さい順に並んでいるので、入れ替えが発生しなかった時は次のステップに移ります"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [color.normal, color.selected]},
    {"action": "swap", "sel1": ".e4", "sel2": ".e3"},
    {"action": "swap", "sel1": ".e4", "sel2": ".e1"},
    {"action": "swap", "sel1": ".e4", "sel2": ".e2"},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.normal, color.selected]},
    {"action": "swap", "sel1": ".e5", "sel2": ".e3"},
    {"action": "swap", "sel1": ".e5", "sel2": ".e1"},
    {"action": "swap-fail", "sel1": ".e5", "sel2": ".e2"},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.normal, color.selected]},
    {"action": "swap", "sel1": ".e6", "sel2": ".e3"},
    {"action": "swap", "sel1": ".e6", "sel2": ".e1"},
    {"action": "swap", "sel1": ".e6", "sel2": ".e5"},
    {"action": "swap", "sel1": ".e6", "sel2": ".e2"},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e4"},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "swap", "sel1": ".e7", "sel2": ".e3"},
    {"action": "swap-fail", "sel1": ".e7", "sel2": ".e1"},
    {"action": "break", "desc": "これを繰り返して全ての要素を小さい順に並べます"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [color.selected, color.locked]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.selected, color.locked]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.selected, color.locked]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.selected, color.locked]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.selected, color.locked]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.locked]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.locked]},
    {"action": "break", "desc": "これでソートが完了しました\n以上がノームソートの流れになります"},
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <SlidePage title="ノームソート" animeSequence={animeSequence}>
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
