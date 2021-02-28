import Head from 'next/head';
import GlobalStyle from  '../styles/global'

import { GetServerSideProps } from 'next'


import styles from '../styles/pages/Ranking.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { LeftBar } from '../components/LeftBar';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext, useEffect } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

interface HomeProps {
  theme: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [ session, loading ] =  useSession()
  const { isDark } = useContext(ThemeContext)
  const router = useRouter();

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
        

        <Head>
          <title>Ranking | move.it</title>
        </Head>

        {!loading && session ? (
            <div className={styles.pageContent}>

        

            <div className={styles.leftBox}>
              <LeftBar />
            </div>
      
            <div className={styles.hightBox}>
      
                <div className={styles.container}>
                
                  <h1>Leaderboard</h1>
      
                  <div className={styles.rankingHead}>
                    <div>Posição</div>
                    <div>
                      <div>usuário</div>
                      <div>Desafios</div>
                      <div>Experiência</div>
                    </div>
                  </div>
      
                  <div className={styles.rankingBody}>
                    <div >
                      <div>1</div>
                      <div>
                        <div className={styles.perfil}>
                          <img src="https://github.com/carlpassos.png" alt="Carlos Passos"/>
                          <div>
                            <strong>Carlos Passos</strong>
                            <span> <GoArrowUp /> Level 43</span>
                          </div>
                        </div>
                        <div className={styles.challenges}><span>127</span> completados</div>
                        <div className={styles.exp}><span>154000</span> xp</div>
                      </div>
                    </div>
                  </div>
      
                  <div className={styles.rankingBody}>
                    <div >
                      <div>1</div>
                      <div>
                        <div className={styles.perfil}>
                          <img src="https://github.com/carlpassos.png" alt="Carlos Passos"/>
                          <div>
                            <strong>Carlos Passos</strong>
                            <span> <GoArrowUp /> Level 43</span>
                          </div>
                        </div>
                        <div className={styles.challenges}><span>127</span> completados</div>
                        <div className={styles.exp}><span>154000</span> xp</div>
                      </div>
                    </div>
                  </div>
      
                </div>
      
              </div>
      
            </div>
          ) : (
            <div className={styles.pageContent}>Carregando...</div>
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