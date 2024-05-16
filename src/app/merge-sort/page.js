"use client"
import { ThemeProvider } from "@mui/system";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-page";

export default function Home() {

  const animeSequence = [
    {"action": "break", "desc": "バブルソートの説明をします"},
    {"action": "break", "desc": "バブルソートは隣り合う要素を比較して、順番が逆なら交換します\nこれを繰り返して、全ての要素が順番通りになるまで続けます"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e2"},
    // {"action": "flash", "sel": ".expl1", "color": "#F33", "loop": true},
    {"action": "break", "desc": "まずは左端から比較していきます\n30と20は30の方が大きいので交換します"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "break", "desc": "30<100なので交換しません"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e4"},
    {"action": "break", "desc": "100>10なので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e5"},
    {"action": "break", "desc": "100>25なので交換します"},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "break", "desc": "左から右へ比較を繰り返すことで1番大きい値が一番右に移動しました\nこれを繰り返して全ての要素を大きい順に並べます"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e2"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e4"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "break", "desc": "もう一度繰り返します"},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "break", "desc": "これで2番目に大きい値が決まりました"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e4"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e4"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "break", "desc": "全ての順番が決まるまで繰り返します"},
    {"action": "break", "desc": "これでソートが完了しました"},
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <SlidePage slideTitle={"バブルソート"} animeSequence={animeSequence}>
        <div className="flex h-full w-full sort-elements content-center">
          <SortBlock1 percent={30} className="e1"/>
          <SortBlock1 percent={20} className="e2"/>
          <SortBlock1 percent={90} className="e3"/>
          <SortBlock1 percent={10} className="e4"/>
          <SortBlock1 percent={25} className="e5"/>
        </div>
      </SlidePage>
    </ThemeProvider>
  );
}
