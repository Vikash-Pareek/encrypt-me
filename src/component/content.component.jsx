import React from "react";
import "./content.component.css";

const ContentRender = ({
  inputPlaceholder,
  btnTitle,
  encryptBtnClass,
  onBtnClick,
  inputRef,
}) => {
  return (
    <div className="content-wrapper">
      <input ref={inputRef} type="text" placeholder={inputPlaceholder} />
      <button className={encryptBtnClass} onClick={onBtnClick}>
        {btnTitle}
      </button>
    </div>
  );
};

export default ContentRender;
