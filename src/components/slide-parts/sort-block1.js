'use client';

const SortBlock1 = (props) => {
  return (
    <div className={`border content-end sample-node1 w-20 m-2 ${props.className}`}>
      <div className={`bg-black h-${props.percent}`} />
      <div>{props.percent}</div>
    </div>
  );
}

export default SortBlock1;