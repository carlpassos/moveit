import Head from 'next/head';
import GlobalStyle from  '../styles/global'

import { useRouter } from 'next/router';

import { GetServerSideProps } from 'next'

import { CompletedChallengers } from "../components/CompletedChallengers";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { useSession } from 'next-auth/client'

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { LeftBar } from '../components/LeftBar';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext, useEffect } from 'react';


interface HomeProps {
  theme: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const { isDark } = useContext(ThemeContext)
  const [ session, loading ] =  useSession()
  const router = useRouter()

  useEffect(() => {
    if(!loading && !session) {
      router.push('/')
    }
  },[session, loading])

  return (

    <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <GlobalStyle isDark={isDark}/>

        {!loading && session ? (
          <div className={styles.pageContent}>

        

          <div className={styles.leftBox}>
            <LeftBar />
          </div>
    
          <div className={styles.hightBox}>
    
            <div className={styles.container}>
              <Head>
                  <title>Início | move.it</title>
                </Head>
    
                
                
                <ExperienceBar />
    
                
                  <CountdownProvider>
                    <section>
                      <div>
                        <Profile />
                        <CompletedChallengers />
                        <Countdown />
                      </div>
                      <div>
                        <ChallengeBox />
                      </div>
                    </section>
                  </CountdownProvider>
    
              </div>
    
            </div>
    
          </div>  
        ) : (
          <div className={styles.pageContent}>
            carregando
          </div>
        )}

        

    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted, theme } =  ctx.req.cookies

  return {
    props: {
      theme: Boolean(theme),
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    }
  }
}