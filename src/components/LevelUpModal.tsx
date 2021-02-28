import { useContext } from 'react'
import { GrTwitter } from 'react-icons/gr'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const { level, closeModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <span>{level - 1}</span>
        <header><div>{level}</div></header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        

        <button type="button" onClick={closeModal}>
          <img src="/icons/close.svg" alt="FecharModal"/>
        </button>

        <a href='https://twitter'>
          <div>Compartilhar no twitter <GrTwitter /></div>
        </a>  
      </div>

         
    </div>
  )
}