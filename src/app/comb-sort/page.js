"use client"
import { ThemeProvider } from "@mui/system";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-page";

import Link from "next/link";

export default function Home() {

  const animeSequence = [
    //テキストがないと最初の移動が適用されない
    {"action": "break", "desc": "text"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e6"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e7"},
    {"action": "swap", "sel1": ".e6", "sel2": ".e4"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e5"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e1"},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e7"},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e1"},
    {"action": "swap", "sel1": ".e2", "sel2": ".e6"},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "swap-fail", "sel1": ".e2", "sel2": ".e3"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e7"},
    {"action": "swap-fail", "sel1": ".e4", "sel2": ".e6"},
    {"action": "swap-fail", "sel1": ".e6", "sel2": ".e5"},
    {"action": "swap", "sel1": ".e5", "sel2": ".e2"},
    {"action": "swap-fail", "sel1": ".e5", "sel2": ".e1"},
    {"action": "swap-fail", "sel1": ".e1", "sel2": ".e3"},
    {"action": "swap", "sel1": ".e3", "sel2": ".e7"},
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
      <div className="flex m-3">
        <div className="ml-4 text-3xl"><Link href={"/"}>←</Link></div>
        <div className="m-auto  text-4xl">コムソート</div>
      </div>
      <div className="w-5/6 justify-center m-auto">
      <SlidePage animeSequence={animeSequence}>
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
      </div>
    </ThemeProvider>
  );
}
