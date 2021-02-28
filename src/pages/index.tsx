import GlobalStyle from  '../styles/indexGlobal'
import { useSession } from 'next-auth/client'

import { useRouter } from 'next/router'

import Cookies from 'js-cookie';

import { GetServerSideProps } from 'next'


import { ChallengesProvider } from '../contexts/ChallengesContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import { LoginPanel } from '../components/LoginPanel';

interface HomeProps {
  theme: boolean;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()
  const router = useRouter()
  const { isDark } = useContext(ThemeContext)

  console.log(session);

  if(session) {
    console.log(session.id)
    Cookies.set('user_name', session.user.name)
    Cookies.set('user_image', session.user.image)
    Cookies.set('user_token', session.accessToken)
    router.push('/home')
  }

  return (

    <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >

        <GlobalStyle isDark={isDark}/>

        <LoginPanel />

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