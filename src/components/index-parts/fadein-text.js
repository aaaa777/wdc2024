export const FadeInText = (props) => {
  return (
    <p ref={props.ref} className={props.inView ? "animate-fade-in-bottom" : "opacity-0"}>{props.children}</p>
  );
}