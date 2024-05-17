import Link from "next/link";

export const SlideHeader = (props) => {
  return (
  <div className="flex m-3">
    <div className="ml-4 text-3xl"><Link href={"./"}>←</Link></div>
    <div className="m-auto  text-4xl">{props.title}</div>
  </div>
  );
}