import '../styles/Global.css'

import { Provider, useSession  } from 'next-auth/client'

import { ThemeProvider } from '../contexts/ThemeContext'
import { ProfileProvider } from '../contexts/ProfileContext';


function MyApp({ Component, pageProps }) {

  const [ session, loading ] = useSession()


  return (
        <Provider session={pageProps.session} >
          <ProfileProvider>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </ProfileProvider>
        </Provider>
    )
}

export default MyApp

