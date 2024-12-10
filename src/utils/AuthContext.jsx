import React, { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../appwriteConfig';
import { ID } from 'appwrite';
// import { useNavigator } from './useNavigator';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate =useNavigator()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const accountDetails = await account.get();
        console.log("Details",accountDetails)
        setUser(accountDetails);
      } catch (error) {
        console.log("No active session:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);


  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      console.log("Attempting to log in with credentials:", credentials);
      const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
      console.log("Login successful:", response);
      const accountDetails = await account.get();
      setUser(accountDetails);
      // navigate("/")
  
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleUserLogout = async ()=>{
    await account.deleteSession("current")
    setUser(null)
  }

  const handleUserRegister = async(e,credentials)=>{
    e.preventDefault()
    
    if(credentials.password1!=credentials.password2){
      alert("password don't match")
      return
    }
    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      )

      

      await account.createEmailPasswordSession(credentials.email,credentials.password1)
      const accountDetails = await account.get();
      setUser(accountDetails);
      // navigate("/")
    
      
    } catch (error) {
      console.log(error)
    }

  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
