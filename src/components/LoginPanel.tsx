import { signIn } from 'next-auth/client'

import { AiFillGithub } from 'react-icons/ai'
import styles from '../styles/components/LoginPanel.module.css'


export function LoginPanel() {


  return (
    <div className={styles.container}>
      <img src="logo-full.svg" alt="move.it logo"/>

      <div>
        <div className={styles.messageBox}>
          <h1>Bem-vindo</h1>
          <div>
            <AiFillGithub />
            Faça login com seu Github para começar
          </div>
        </div>
        <div className={styles.loginForm}>
          <form action="">
            <button onClick={() => signIn()}>Entrar</button>
            {/* <Link href="https://github.com/login/oauth/authorize?client_id=9fd76e1d41cd792477bb"> teste</Link> */}
          </form>
        </div>
      </div>
      
    </div>
  )
}