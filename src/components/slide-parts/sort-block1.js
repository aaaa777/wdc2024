'use client';

const SortBlock1 = (props) => {
  const calcStyle = (percent) => {
    return {
      height: `${percent}%`
    };
  }
  return (
    <div className={`content-end sample-node1 h-72 w-20 m-2 ${props.className}`}>
      <div className="h-60 content-end">
        <div className={`bg-black`} style={calcStyle(props.percent)}/>
      </div>
      <div className="flex justify-center">
        <div>{props.percent}</div>
      </div>
    </div>
  );
}

export default SortBlock1;