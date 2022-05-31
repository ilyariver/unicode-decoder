import './App.css';
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import copyIcon from './assets/images/copy-svgrepo-com.svg'
import closeIcon from './assets/images/close.svg'
import logoIcon from './assets/images/logo.svg'
import { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './App.module.css'
import Alert from 'react-bootstrap/Alert'
import { encoder } from './common/hexEncode'

function App() {
  const [enterText, setEnterText] = useState('')
  const [encodeText, setEncodeText] = useState('')
  const [copied, setCopied] = useState({copied: false})

  const onChangeValue = e => {
    const value = e.target.value
    setEnterText(value)
    setEncodeText(encoder.hexEncode(value))
  }

  const removeText = () => {
    setEnterText('')
    setEncodeText('')
  }

  const copiedText = () => {
    setCopied({copied: true})
    setTimeout(() => setCopied({copied: false}), 2000)
  }

  document.title = 'Кодировщик UNICODE'

  return (
    <div className="App">
      <div className={style.header}>
        <div className="container">
          <div className={style.logo__wrap}>
            <div className={style.logo} style={{backgroundImage: `url(${logoIcon})`}}></div>
            <h1 className={style.title}>UNICODE декодер</h1>
          </div>
        </div>
      </div>
      <main className={style.main}>
        <div className="container">
          <div className={style.form}>
            <div className={style.form__group}>
              <h2 className={style.name__textarea}>Текст</h2>
              <div className={style.left__area}>
                <textarea className={style.textarea_answer} placeholder="Введи текст" value={enterText} onChange={onChangeValue} />
                <button onClick={removeText} className={`${style.close} ${style.copied__button}`}>
                  <img src={closeIcon} alt="удалить текст"/>
                </button>
              </div>
            </div>
            <div className={style.form__group}>
              <h2 className={style.name__textarea}>UNICODE</h2>
              <div className={style.right__area}>
                <CopyToClipboard text={encodeText} onCopy={copiedText}>
                  <textarea className={style.textarea_answer} value={encodeText} />
                </CopyToClipboard>
                <CopyToClipboard text={encodeText} onCopy={copiedText}>
                  <button className={style.copied__button}>
                    <img src={copyIcon} alt="копировать"/>
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          {enterText !== '' && <Alert className={style.success} style={{ opacity: copied.copied ? 1 : 0 }} key="dark" variant="dark">
            Скопировано!
          </Alert>}
        </div>
      </main>
    </div>
  );
}

export default App;
