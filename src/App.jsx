import { RadioSelect } from "./components/RadioSelect/RadioSelect";
import { DataDisplay } from "./components/DataDisplay/DataDisplay";
import { KeyGenerator } from "./components/KeyGenerator/KeyGenerator";
import { StringInput } from "./components/StringInput/StringInput";
import { useState } from "react";
import CryptoJS from "crypto-js";
import "./App.css";


const algorithms = [
  {
    label: "DES",
    value: "DES",
  },
  {
    label: "Triple DES",
    value: "TripleDES",
  },
  {
    label: "AES",
    value: "AES",
  },
  {
    label: "RC4",
    value: "RC4",
  },
];

const modes = [
  {
    label: "ECB",
    value: "ECB",
  },
  {
    label: "CBC",
    value: "CBC",
  },
  {
    label: "CFB",
    value: "CFB",
  },
  {
    label: "OFB",
    value: "OFB",
  },
  {
    label: "CTR",
    value: "CTR",
  },
];

const paddings = [
  {
    label: "PKCS7",
    value: "Pkcs7",
  },
  {
    label: "Zeros",
    value: "ZeroPadding",
  },
  {
    label: "None",
    value: "NoPadding",
  },
];

function getPadding(name) {
  switch (name) {
    case "PKCS7":
      return CryptoJS.pad.Pkcs7;
    case "ZeroPadding":
      return CryptoJS.pad.ZeroPadding;
    case "NoPadding":
      return CryptoJS.pad.NoPadding;
    default:
      return CryptoJS.pad.Pkcs7;
  }
}

function App() {
  // const [input, setInput] = useState("");
  // const [encrypted, setEncrypted] = useState("");
  // const [decrypted, setDecrypted] = useState("");

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const encrypted = CryptoJS.TripleDES.encrypt(input, "Secret Passphrase");
  //   const decrypted = CryptoJS.TripleDES.decrypt(
  //     encrypted,
  //     "Secret Passphrase"
  //   ).toString(CryptoJS.enc.Utf8);
  //   setEncrypted(encrypted);
  //   setDecrypted(decrypted);
  // };

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("DES");
  const [selectedMode, setSelectedMode] = useState("ECB");
  const [selectedPadding, setSelectedPadding] = useState("Pkcs7");

  const [randomKey, setRandomKey] = useState("48656C6C6F4A6179");
  const [randomIV, setRandomIV] = useState("476F6F6462794A6F");

  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [ciphertextHex, setCiphertextHex] = useState("");
  const [recovered, setRecovered] = useState("");


  const handleEncrypt = () => {

    setRecovered("");

    if (plaintext === "") {
      return;
    }
    
    const key = CryptoJS.enc.Hex.parse(randomKey);
    const iv = CryptoJS.enc.Hex.parse(randomIV);
    
    const encrypted = CryptoJS[selectedAlgorithm].encrypt(plaintext, key, {
      mode: CryptoJS.mode[selectedMode],
      padding: getPadding(selectedPadding),
      iv,
    });
    
    setCiphertext(encrypted.ciphertext.toString(CryptoJS.enc.Base64));
    setCiphertextHex(encrypted.ciphertext.toString(CryptoJS.enc.Hex));
  };


  const handleDecrypt = () => {

    const key = CryptoJS.enc.Hex.parse(randomKey);
    const iv = CryptoJS.enc.Hex.parse(randomIV);

    const decrypted = CryptoJS[selectedAlgorithm].decrypt(ciphertext, key, {
      mode: CryptoJS.mode[selectedMode],
      padding: getPadding(selectedPadding),
      iv,
    });
    
    setRecovered(decrypted.toString(CryptoJS.enc.Utf8));
  }


  return (
    <>
      <div className="vertical-container">
        <div className="horizontal-container">
          <RadioSelect
            items={algorithms}
            legend="Symmetric Algorithms"
            selectedItem={selectedAlgorithm}
            onChange={setSelectedAlgorithm}
          />
          <div className="vertical-container">
            <KeyGenerator buttonText="New Random Key" data={randomKey} onChange={setRandomKey} />
            <KeyGenerator buttonText="New Random IV" data={randomIV} onChange={setRandomIV} />
            <div className="horizontal-container">
              <RadioSelect
                items={modes}
                legend="Mode"
                isHorizontal
                selectedItem={selectedMode}
                onChange={setSelectedMode}
              />
              <RadioSelect
                items={paddings}
                legend="Padding"
                isHorizontal
                selectedItem={selectedPadding}
                onChange={setSelectedPadding}
              />
            </div>
          </div>
        </div>
        <div className="vertical-container">
          <div className="horizontal-container">
            <div className="button-box"></div>
            <StringInput legend="Plaintext" data={plaintext} onChange={setPlaintext} />
          </div>
          <div className="horizontal-container">
            <div className="button-box">
              <button onClick={handleEncrypt}>Encrypt</button>
            </div>
            <DataDisplay
              data={ciphertext}
              legend="Cyphertext Displayed as Text String"
            />
          </div>
          <div className="horizontal-container">
            <div className="button-box"></div>
            <DataDisplay
              data={ciphertextHex}
              legend="Cyphertext Displayed as Byte Array"
              isHex
            />
          </div>
          <div className="horizontal-container">
            <div className="button-box">
              <button disabled={ciphertext === ""} onClick={handleDecrypt}>Decrypt</button>
            </div>
            <DataDisplay data={recovered} legend="Recovered Plaintext" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
