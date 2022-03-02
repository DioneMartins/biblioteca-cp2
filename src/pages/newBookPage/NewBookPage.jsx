import React, { useState } from 'react';
import { Navbar } from '../../components';
import { addBook } from '../../api/api';
import styles from './NewBookPage.module.css';

const {
  newCardOuter,
  newCardFullPage,
  newCardWrapper,
  newCardTitle,
  newCardAuthor,
  newCardWarning,
  newCardInfoOuter,
  newCardInfoInner,
  newCardAFN,
  newCardALN,
  newCardTitleInput,
  newCardBarcode,
  newCardICN,
  newCardNotes,
  newCardNumber,
  newCardButton,
} = styles;

export default function NewBookPage() {
  const [afn, setAfn] = useState('Primeiro nome');
  const [aln, setAln] = useState('Sobrenome');
  const [barcode, setBarcode] = useState('Barcode');
  const [icn, setICN] = useState('ICN');
  const [notes, setNotes] = useState('Notas');
  const [quant, setQuant] = useState(1);
  const [title, setTitle] = useState('Título');
  const [hasError, setHasError] = useState(false);
  const [barcodeArray, setBarcodeArray] = useState([]);
  const [icnArray, setIcnArray] = useState([]);
  const [notesArray, setNotesArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function splitArrays() {
    if (quant > 1) {
      setBarcodeArray(barcode.split(';;'));
      setIcnArray(icn.split(';;'));
      setNotesArray(barcode.split(';;'));
    } else if (quant === 1) {
      barcodeArray.push(barcode);
      icnArray.push(icn);
      notesArray.push(notes);
    } else {
      setHasError(true);
      setErrorMessage('Erro na quantidade');
    }
  }

  async function sendBook() {
    splitArrays();
    if (!hasError) {
      setBarcodeArray([]);
      setIcnArray([]);
      setNotesArray([]);
      const add = await addBook(afn, aln, barcodeArray, icnArray, notesArray, quant, title);
      if (add === 'Error') {
        setHasError(true);
        setErrorMessage('Erro para adicionar');
      } else {
        setHasError(true);
        setErrorMessage(add);
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className={newCardFullPage}>
        <div className={newCardOuter}>
          <div className={newCardWrapper}>
            <p className={newCardTitle}>{title}</p>
            <p className={newCardAuthor}>
              {afn} {aln}
            </p>
          </div>
        </div>
        <p className={newCardWarning}>
          Caso haja mais de um livro, salve os diferentes "barcode", "ICN" e "notes" separados com
          ;;
        </p>
        {hasError ? <p className={newCardWarning}>{errorMessage}</p> : <p></p>}
        <div>
          <div className={newCardInfoOuter}>
            <div className={newCardInfoInner}>
              <input
                id="quant"
                type="text"
                className={newCardNumber}
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
              />
              <input
                id="afn"
                type="text"
                className={newCardAFN}
                value={afn}
                onChange={(e) => setAfn(e.target.value)}
              />
              <input
                id="aln"
                type="text"
                className={newCardALN}
                value={aln}
                onChange={(e) => setAln(e.target.value)}
              />
              <input
                id="title"
                type="text"
                className={newCardTitleInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                id="barcode"
                type="text"
                className={newCardBarcode}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <input
                id="icn"
                type="text"
                className={newCardICN}
                value={icn}
                onChange={(e) => setICN(e.target.value)}
              />
              <input
                id="notes"
                type="text"
                className={newCardNotes}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                className={newCardButton}
                onClick={(e) => {
                  sendBook();
                }}
              >
                Enviar livro
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
