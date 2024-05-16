import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between">
      <div className="w-full mb-10 p-32 text-center bg-red-500">
        <div className="text-6xl m-5">
          WDC2024 title title title title title
        </div>
        
        <div className="text-3xl "> 
          caption caption caption caption caption caption caption caption caption caption caption caption
        </div>
      </div>

      <div className="w-full px-20">
        <p className="text-4xl py-5">ソートアルゴリズム</p>
        <div className="text-center grid grid-cols-3 *:text-3xl *:bg-blue-300 *:mx-10 *:my-5 *:p-5 *:rounded-xl">
          <div><Link href={"/bubble-sort"}>バブルソート</Link></div>
          <div><Link href={"/"}>algo2</Link></div>
          <div><Link href={"/"}>algo3</Link></div>
          <div><Link href={"/"}>algo4</Link></div>
          <div><Link href={"/"}>algo5</Link></div>
          <div><Link href={"/"}>algo6</Link></div>
        </div>
      </div>

      <div className="w-full px-20">
        <p className="text-4xl py-5">ソートアルゴリズム</p>
        <div className="text-center grid grid-cols-3 *:text-3xl *:bg-blue-300 *:m-5 *:p-5">
          <div><a href="">algo1</a></div>
          <div><a href="">algo2</a></div>
          <div><a href="">algo3</a></div>
          <div><a href="">algo4</a></div>
          <div><a href="">algo5</a></div>
          <div><a href="">algo6</a></div>
        </div>
      </div>
      <div className="w-full px-20">
        <p className="text-4xl py-5">ソートアルゴリズム</p>
        <div className="text-center grid grid-cols-3 *:text-3xl *:bg-blue-300 *:m-5 *:p-5">
          <div><a href="">algo1</a></div>
          <div><a href="">algo2</a></div>
          <div><a href="">algo3</a></div>
          <div><a href="">algo4</a></div>
          <div><a href="">algo5</a></div>
          <div><a href="">algo6</a></div>
        </div>
      </div>
      <div className="w-full px-20">
        <p className="text-4xl py-5">ソートアルゴリズム</p>
        <div className="text-center grid grid-cols-3 *:text-3xl *:bg-blue-300 *:m-5 *:p-5">
          <div><a href="">algo1</a></div>
          <div><a href="">algo2</a></div>
          <div><a href="">algo3</a></div>
          <div><a href="">algo4</a></div>
          <div><a href="">algo5</a></div>
          <div><a href="">algo6</a></div>
        </div>
      </div>

      <div className="w-full w-full mt-10 p-10 text-center bg-red-500">
        hutter
      </div>

    </main>
  );
}
