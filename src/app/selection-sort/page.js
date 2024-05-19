"use client"
// import { ThemeProvider } from "@mui/system";
import { ThemeProvider } from "@material-tailwind/react";
import theme from "@/lib/default-theme";

import SortBlock1 from "@/components/slide-parts/sort-block1";

import SlidePage from "@/components/slide-page";

import Link from "next/link";

export default function Home() {

  const animeSequence = [
    //テキストがないと最初の移動が適用されない
    // {"action": "break", "desc": "text"},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e4 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e4 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "swap", "sel1": ".e1", "sel2": ".e4"},
    {"action": "colors", "sel": ".e4 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "swap", "sel1": ".e2", "sel2": ".e6"},
    {"action": "colors", "sel": ".e6 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e2"},
    {"action": "colors", "sel": ".e2 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "swap", "sel1": ".e1", "sel2": ".e5"},
    {"action": "colors", "sel": ".e5 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e1 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.main, theme.palette.primary.check]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.main]},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.check, theme.palette.primary.select]},
    {"action": "swap", "sel1": ".e3", "sel2": ".e7"},
    {"action": "colors", "sel": ".e7 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
    {"action": "colors", "sel": ".e3 .graph", "colors": [theme.palette.primary.select, theme.palette.primary.disabled]},
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
