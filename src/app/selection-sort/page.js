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
    {"action": "break", "desc": "このページでは選択ソートについて説明します"},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e4 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e4 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.normal]},
    {"action": "break", "desc": "まずは全ての要素を比較します\n最小値を見つけるために左から順に比較していきます"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e4"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "break", "desc": "最小値10が見つかったので、10と30を交換します"},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.normal]},
    {"action": "swap", "sel1": ".e2", "sel2": ".e6"},
    {"action": "colors", "sel": ".e6 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.normal]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e2"},
    {"action": "colors", "sel": ".e2 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.normal]},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "colors", "sel": ".e5 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.normal]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.normal, color.selected]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.altNormal, color.normal]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.selected, color.altNormal]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e7"},
    {"action": "colors", "sel": ".e7 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [color.altNormal, color.locked]},
    {"action": "break", "desc": "同様にして全ての要素を小さい順に並べ替えます"},
    {"action": "break", "desc": "これでソートが完了しました\n以上が選択ソートの流れになります"},
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <SlidePage title="選択ソート" animeSequence={animeSequence}>
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
