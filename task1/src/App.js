import styles from './App.module.css';
import {useEffect, useRef, useState} from "react";

function App() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const formatTime = (seconds) => {
    return `${Math.trunc(seconds / 60 / 60 % 60)}:`.padStart(3, '0') +
        `${Math.trunc(seconds / 60 % 60)}:`.padStart(3, '0') +
        `${Math.trunc(seconds % 60)}`.padStart(2, '0')
  }

  const start = () => {
    setTime(time || Number(inputRef.current.value))
    setRunning(true)
  }

  const onChangeInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '')
  }

  const stop = () => {
    setRunning(false)
  }

  const reset = () => {
    stop()
    setTime(0)
  }

  useEffect(() => {
    if (running) {
      let startTime = Date.now()
      timerRef.current = setInterval(() => {
        const currentTime = Date.now()
        if (currentTime < time * 1000 + startTime) {
          setTime(time - Math.trunc((currentTime - startTime) / 1000))
        } else {
          setRunning(false)
          setTime(0)
        }
      }, 1000)
    }
    return () => {
      clearInterval(timerRef.current)
    }
  }, [running])

  return (
      <div className={styles.container}>
        <input ref={inputRef} onChange={onChangeInput}></input>
        <span>{formatTime(time)}</span>
        <div className={styles.button_box}>
          <button className={styles.start} onClick={start} disabled={running}>START</button>
          <button onClick={reset}>RESET</button>
          <button className={styles.stop} onClick={stop} disabled={!running}>STOP</button>
        </div>
      </div>
  );
}

export default App;
