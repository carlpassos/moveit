import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';
import { AiFillCheckCircle } from 'react-icons/ai'

export function Countdown() {

  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext)
  
  

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const [barPercent, setBarPercent] = useState(0);

  useEffect(() => {
    const maxTime = (0.05 * 60);
    const percent = 100 - ((100 * ((minutes * 60) + seconds)) / maxTime);

    setBarPercent(percent === 100 ? 0 : percent)

  }, [seconds])

  

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button type="button" disabled className={styles.countdownButton}>
        Ciclo encerrado <span className={styles.buttonGreenSpan}><AiFillCheckCircle /></span>
        <div className={styles.timeBar}>
          <div style={{ width: `100%` }}></div>
        </div>
      </button>
      ) : (
        <>
          { isActive  ? (
              <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                Abandonar Ciclo
                <div className={styles.timeBar}>
                  <div style={{ width: `${barPercent}%` }}></div>
                </div>
              </button>
            
          ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar ciclo
            </button>
          )}
        </>
      )}

      
      
    </div>
  );
}