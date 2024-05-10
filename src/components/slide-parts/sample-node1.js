const SampleNode1 = (props) => {
  return (
    <div className={`border sample-node1 w-20 m-2 ${props.className}`}>
      <h1>Sample Node 1</h1>
      <div>{props.description}</div>
    </div>
  );
}

export default SampleNode1;