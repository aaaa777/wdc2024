import Image from "next/image";
import SampleNode1 from "@/components/slide-parts/sample-node1";

export default function Home() {
  return (
    <main className="p-20">
      <div className="slide-area">
        <SampleNode1 />
      </div>
    </main>
  );
}
