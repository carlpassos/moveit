import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserProfile {
  name: string;
  image: string;
}

interface ProfileContextData {
  user: UserProfile;
  handleUserLogout: () => void;
}

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileContext = createContext({} as ProfileContextData);

export function ProfileProvider({ children, ...rest }: ProfileProviderProps) {

  const userName = Cookies.get('user_name');
  const userImage = Cookies.get('user_image');
  const userToken = Cookies.get('user_token');

  const [user, setUser] = useState({name:userName, image: userImage, token: userToken});

  useEffect(() => {
    if(userName) {
      setUser({name: userName, image: userImage, token:userToken})
    }
  },[userName, userImage, userToken])

  console.log(user)

    async function handleUserLogout(){

  }
  

  return (
    <ProfileContext.Provider value={{
      user,
      handleUserLogout,
    }}>
      { children }
    </ProfileContext.Provider>
  )
}