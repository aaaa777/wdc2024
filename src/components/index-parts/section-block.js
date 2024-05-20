import SectionCard from '@/components/index-parts/section-card';

const SectionBlock = (props) => {
  return(
    <div className="w-full flex flex-col justify-center md:mt-20 md:p-28 mt-10 pt-6 px-4 text-center bg-white bg-opacity-60 shadow-lg">
      <div className="section-caption text-left pb-4">
        <h1 className="text-4xl _underline">{props.title}</h1> 
      </div>
      <div className="section-description">
        {props.children}
      </div>
    </div>
  );
}

export default SectionBlock;