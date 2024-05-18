const SectionBlock = (props) => {
  return(
    <div className="w-full h-screen flex flex-col justify-center md:mt-20 md:p-28 pt-6 text-center bg-white bg-opacity-60 shadow-lg">
      <div className="section-caption">
        <h1>バブルソート</h1>
      </div>
      <div className="section-description">
        {props.children}
      </div>
    </div>
  );
}

export default SectionBlock;