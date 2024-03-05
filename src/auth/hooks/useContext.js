import React from 'react'


export const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: () => {},
    setUser: () => {},
  });

  
export const useContext= ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
  
    // Load user data from storage (if applicable) on component mount
    useEffect(() => {
      const storedUser = localStorage.getItem('correo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }, []);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
