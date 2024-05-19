"use client"
// import { ThemeProvider } from "@mui/system";
import { ThemeProvider } from "@material-tailwind/react";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-page";

export default function Home() {

  const colors = theme.palette.element;

  const animeSequence = [
    //テキストがないと最初の移動が適用されない
    // {"action": "break", "desc": "text"},
    {action: "break", "desc": "コムソートの説明をします"},
    {action: "break", "desc": "コムソートはバブルソートを改良したソートアルゴリズムです\nバブルソートのように隣あう要素を比較するのではなく、離れた要素からどんどん比較をしていくのが特徴です"},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.normal, colors.altSelected]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph,.e4 .graph,.e5 .graph", "colors": [colors.normal, colors.altNormal]},
    {"action": "break", "desc": "比較する要素の間隔は、要素数を1.3で割った数です\n今回は要素が7個あるので、7 // 1.3 = 5なので、4つ挟んだ位置(5つ目)から比較していきます"},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.altSelected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e3 .graph,.e4 .graph,.e5 .graph", "colors": [colors.altNormal, colors.normal]},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e1", "sel2": ".e6"},
    {"action": "break", "desc": "30と50は30の方が小さいので交換します"},
    {"action": "colors", "sel": ".e1 .graph,.e6 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e7 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e7"},
    {"action": "break", "desc": "20と15は20の方が大きいので交換しません"},
    {"action": "colors", "sel": ".e2 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e6 .graph,.e4 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e6", "sel2": ".e4"},
    {"action": "break", "desc": "右端まで到達したためもう一度左端から、今度は2つ挟んで比較実行していきます"},
    {"action": "colors", "sel": ".e6 .graph,.e4 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e2 .graph,.e5 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "break", "desc": "20と10は20の方が小さいので交換します"},
    {"action": "colors", "sel": ".e2 .graph,.e5 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e3 .graph,.e1 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e1"},
    {"action": "break", "desc": "20と10は20の方が小さいので交換します"},
    {"action": "colors", "sel": ".e3 .graph,.e1 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e6 .graph,.e7 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e7"},
    {"action": "break", "desc": "20と10は20の方が小さいので交換します"},
    {"action": "colors", "sel": ".e6 .graph,.e7 .graph", "colors": [colors.selected, colors.normal]},
    {"action": "colors", "sel": ".e4 .graph,.e1 .graph", "colors": [colors.normal, colors.selected]},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e1"},
    {"action": "break", "desc": "右端まで到達したためもう一度左端から、今度は1つ挟んで比較実行していきます"},
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
    {"action": "break", "desc": "左端まで到達したためもう1度左端から、今度は隣り合った要素を比較実行していきます"},
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
    {"action": "break", "desc": "右端に到達しました\n間隔が1の時は入れ替えが発生しなくなるまでソートを繰り返します"},
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
