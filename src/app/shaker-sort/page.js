"use client"
import { ThemeProvider } from "@mui/system";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-parts/slide-page";

import Link from "next/link";

export default function Home() {

  const animeSequence = [
    {"action": "break", "desc": "シェーカーソートの説明をします\nシェーカーソートはバブルソートを改良したもので効率が少し良くなっています"},
    {"action": "break", "desc": "シェーカーソートではバブルソートと同じように隣り合う要素を比較して、順番が逆なら交換していきます\nバブルソートでは毎回左からソートをしましたが、シェーカーソートでは往復するようにソートを行っていきます"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e2"},
    {"action": "break", "desc": "まずは左端から比較していきます\n30と20は30の方が大きいので交換します"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "break", "desc": "30<90なので交換しません"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e4"},
    {"action": "break", "desc": "90>10なので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e5"},
    {"action": "break", "desc": "90>25なので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e6"},
    {"action": "break", "desc": "90>15なので交換します"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e7"},
    {"action": "break", "desc": "90>50なので交換します"},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "break", "desc": "左から右へ比較を繰り返すことで一番大きい値が一番右に移動しました\n次は右から左へ比較をしていきます"},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e7"},
    {"action": "break", "desc": "15<50なので交換しません"},
    {"action": "swap", "sel1": ".e5", "sel2": ".e6"},
    {"action": "break", "desc": "25>15なので交換します"},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e6"},
    {"action": "break", "desc": "10<15なので交換しません"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e4"},
    {"action": "break", "desc": "30>10なので交換します"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e4"},
    {"action": "break", "desc": "20>10なので交換します"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "break", "desc": "右から左へ比較を繰り返すことで一番小さい値が一番左に移動しました"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e2"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e6"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e7"},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e5"},
    {"action": "swap-fail", "sel1": ".e5", "sel2": ".e6"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e6"},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "swap-fail", "sel1": ".e5", "sel2": ".e1"},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.disabled]},
    {"action": "break", "desc": "全ての順番が決まるまで繰り返します"},
    {"action": "break", "desc": "これでソートが完了しました"},
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <SlidePage title="シェイカーソート" animeSequence={animeSequence}>
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
