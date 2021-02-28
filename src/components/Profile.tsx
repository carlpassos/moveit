import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
import { useSession } from 'next-auth/client'
import NoSSR from './NoSsr';
import { ProfileContext } from '../contexts/ProfileContext';

export function Profile() {
  const { level } = useContext(ChallengesContext)
  const [userInfo, setUserInfo] = useState({image: '', name: ''})
   const [ session, loading ] =  useSession()
   const { user } = useContext(ProfileContext)
  return(
    <div className={styles.profileContainer}>

        <NoSSR>
          {user && (
            <img src={user?.image} alt="Carlos Passos"/>
          )}
          <div>
            <strong>{user && user?.name}</strong>
            <p>
              <img src="icons/level.svg" alt="Level SVG"/>
              Level {level}
            </p>
          </div>
        </NoSSR>
      
    </div>
  );
}