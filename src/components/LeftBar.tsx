import Switch from 'react-switch'

import Link from 'next/link';

import { FiHome, FiAward, FiSun, FiMoon, FiLogOut} from 'react-icons/fi'

import styles from '../styles/components/LeftBar.module.css'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import NoSSR from './NoSsr'

import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'



export function LeftBar() {

  const [ session, loading ] =  useSession()
  const router = useRouter()


  useEffect(() => {
    if(!loading && !session) {
      router.push('/')
    }
  },[session, loading])

  

  const { isDark, handleThemeButton } = useContext(ThemeContext)
  
  return (
    <div className={styles.container}>
      <img src="logo.svg" alt="Move.it"/>
      <ul>
        
        <Link href="/home"><li className={String(router.pathname ==='/' || router.pathname ==='/home' && styles.selected)}><FiHome /></li></Link>
        <Link href="/ranking"><li className={String(router.pathname ==='/ranking' && styles.selected)}><FiAward /></li></Link>
        <li><button onClick={() => signOut()}><FiLogOut /></button></li>
      </ul>
        <NoSSR>
          <Switch
            checked={isDark}
            onChange={handleThemeButton}
            onClick={handleThemeButton}
            uncheckedIcon={(<FiSun />)}
            checkedIcon={(<FiMoon />)}
            height={26}
            width={54}
            handleDiameter={20}
            offColor="#5C65E8"
            onColor="#5C65E8"
          />

        </NoSSR>
        
        
    </div>
  )
}