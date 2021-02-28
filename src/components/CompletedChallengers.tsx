import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallengers.module.css'

export function CompletedChallengers() {

  const { challengesCompleted } = useContext(ChallengesContext)

  return (
    <div className={styles.completedChallengersContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}