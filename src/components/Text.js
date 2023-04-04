import React, { useState } from "react";

export default function Text() {
  const [plaintext, setPlaintext] = useState("");
  const [shift, setShift] = useState("");
  const [error, setError] = useState('');
  const [text, settext] = useState("");
  const [ciphertext, setCiphertext] = useState('');
  
  const handleInputChange = (event) => {
    setPlaintext(event.target.value);
  };

  const handleShiftChange = (event) => {
    const shiftValue = parseInt(event.target.value);
    if (isNaN(shiftValue)) {
      setError('Your key should be 0 - 25');
    } else if (shiftValue < 0) {
      setError('Your key should be 0 - 25');
    } else {
      setError('');
      setShift(shiftValue);
    }    
  };

  const encrypt = (plaintext,shift) => {
    let result = "";
      for (let i = 0; i < plaintext.length; i++) {
        let c = plaintext.charCodeAt(i);
        if (c >= 65 && c <= 90) {
          result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
        } else if (c >= 97 && c <= 122) {
          result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
        } else {
          result += plaintext.charAt(i);
        }
      }
      setCiphertext(result);
  };
  


const decryptText = (text, shift) => {
    if (shift < 0) {
      shift = 26 - Math.abs(shift) % 26;
    }
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }
     settext(result);
  };


  const CryptoJS = require('crypto-js');

  // Define the key and IV
  const key = CryptoJS.enc.Hex.parse('2b7e151628aed2a6abf7158809cf4f3c');
  const iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
  
  // Define the plaintext message
  const plaintext1 = 'Hello, world!';
  
  // Encrypt the plaintext using AES-256-CBC
  const ciphertext1 = CryptoJS.AES.encrypt(plaintext1, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  
  // Print the ciphertext
  console.log(ciphertext1.toString());
  
  // Decrypt the ciphertext using AES-256-CBC
  const decrypted1 = CryptoJS.AES.decrypt(ciphertext1, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  
  // Convert the decrypted plaintext to a string and print it
  console.log(decrypted1.toString(CryptoJS.enc.Utf8));











  return (
    <div className="container  bg-light">
      <>
        <div className="container-fluid text-center">
          <h1>Welcome to EncriptX</h1>
        </div>
        <div>
          <label>
            Plain text:
            <input type="text" class="form-control" value={plaintext} onChange={handleInputChange} />
          </label>
          <br/>
          <label>
            Shift:
            <input type="text" class="form-control" value={shift} onChange={handleShiftChange} />
            <div style={{ color: 'red' }}>{error}</div>
          </label>
          <br/>
      
          <button className="btn btn-primary my-2 mx-2" onClick={() => encrypt(plaintext, shift)}>Encrypt</button>
          <button className="btn btn-danger my-2 mx-2" onClick={() => decryptText(plaintext, shift)}>Decrypt</button>
          <div>The cipher text of message '{plaintext}' is : <strong>{ciphertext}</strong></div>
          <div>The recoverd plainText is : {text.toUpperCase()}</div>
        </div>
      </>
    </div>
  );
}

//QVIREFVGL-->DIVERSITY,shift key is 13
//ZJ-->IS,shift key is 17
//DJG-->OUR,shift key is 15
//LMKXGZMA-->STRENGTH,shift key is 19

//DIVERSITY IS OUR STRENGTH is a sentence