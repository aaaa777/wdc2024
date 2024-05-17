"use client"
import { ThemeProvider } from "@mui/system";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-page";

import Link from "next/link";

export default function Home() {

  const animeSequence = [
    //テキストがないと最初の移動が適用されない
    // {"action": "break", "desc": "text"},
    {"action": "break", "desc": "コムソートの説明をします"},
    {"action": "break", "desc": "コムソートはバブルソートを改良したソートアルゴリズムです\nバブルソートのように隣あう要素を比較するのではなく、離れた要素からどんどん比較をしていくのが特徴です"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e6"},
    {"action": "break", "desc": "要素が7個ある場合は4つ挟んだ位置から比較していきます\n30と50は30の方が小さいので交換します"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e7"},
    {"action": "break", "desc": "20と15は20の方が大きいので交換しません"},
    {"action": "swap", "sel1": ".e6", "sel2": ".e4"},
    {"action": "break", "desc": "右端まで到達したためもう一度左端から、今度は2つ挟んで比較実行していきます"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "break", "desc": "20と10は20の方が小さいので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e1"},
    {"action": "break", "desc": "20と10は20の方が小さいので交換します"},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e7"},
    {"action": "break", "desc": "20と10は20の方が小さいので交換します"},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e1"},
    {"action": "break", "desc": "右端まで到達したためもう一度左端から、今度は1つ挟んで比較実行していきます"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e6"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e3"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e7"},
    {"action": "break", "desc": "左端まで到達したためもう1度左端から、今度は隣り合った要素を比較実行していきます"},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e6"},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e5"},
    {"action": "swap", "sel1": ".e5", "sel2": ".e2"},
    {"action": "swap-fail", "sel1": ".e5", "sel2": ".e1"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e7"},
    {"action": "break", "desc": "ここで右端に到達してソートが完了しました"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
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
