import { useRef, useState } from "react";
import "./App.css";
import ContentRender from "./component/content.component";
import CryptoJS from "crypto-js";

function App() {
  const [isEncryptTabActive, setIsEncryptTabActive] = useState(true);
  const [isDecryptTabActive, setIsDecryptTabActive] = useState(false);
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const encryptInputRef = useRef();
  const decryptInputRef = useRef();

  const secretKey = "someSecretKey";

  const handleTabClick = (tabValue) => {
    if (tabValue === "encryptTab") {
      setIsEncryptTabActive(true);
      setIsDecryptTabActive(false);
    } else {
      setIsDecryptTabActive(true);
      setIsEncryptTabActive(false);
    }
  };

  const onEncryptClicked = () => {
    const encryptedText = CryptoJS.AES.encrypt(
      encryptInputRef.current.value,
      secretKey
    ).toString();
    setEncryptedText(encryptedText);
  };

  const onDecryptClicked = () => {
    const bytes = CryptoJS.AES.decrypt(
      decryptInputRef.current.value,
      secretKey
    );
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedText(decryptedText);
  };

  return (
    <div className="main-container">
      <div className="tab-group">
        <button
          className={isEncryptTabActive ? "encrypt-tab" : "disabled-tab"}
          onClick={() => handleTabClick("encryptTab")}
        >
          Encrypt
        </button>
        <button
          className={isDecryptTabActive ? "decrypt-tab" : "disabled-tab"}
          onClick={() => handleTabClick("decryptTab")}
        >
          Decrypt
        </button>
      </div>
      {isEncryptTabActive && (
        <ContentRender
          inputRef={encryptInputRef}
          inputPlaceholder="Enter text to encrypt"
          btnTitle="Encrypt!"
          encryptBtnClass="encrypt-btn"
          onBtnClick={onEncryptClicked}
        />
      )}
      {isDecryptTabActive && (
        <ContentRender
          inputRef={decryptInputRef}
          inputPlaceholder="Enter encrypted text"
          btnTitle="Decrypt!"
          encryptBtnClass="decrypt-btn"
          onBtnClick={onDecryptClicked}
        />
      )}
      {encryptedText && (
        <div className="result-text-container">
          <h4>Encrypted Text:</h4>
          <p>{encryptedText}</p>
        </div>
      )}
      {decryptedText && (
        <div className="result-text-container">
          <h4>Decrypted Text:</h4>
          <p>{decryptedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
