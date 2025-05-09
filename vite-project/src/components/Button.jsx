function Button({ id, className, onClickFunction, btntext }) {
    return (
      <button id={id} className={className} onClick={onClickFunction}>
        {btntext}
      </button>
    );
  }
  
  export default Button;