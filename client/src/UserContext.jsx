import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/profile');
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setReady(true);
      }
    };

    // Check if user session exists (e.g., in local storage or cookies)
    const existingUser = localStorage.getItem('user'); // Example using local storage
    if (existingUser) {
      setUser(JSON.parse(existingUser)); // Set user from local storage
      setReady(true);
    } else {
      fetchUserData(); // Fetch user data if no session exists
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}