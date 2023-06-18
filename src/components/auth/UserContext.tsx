import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextProps {
  userInfo: string;
  setUserInfo: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<string>('Mokke');

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
