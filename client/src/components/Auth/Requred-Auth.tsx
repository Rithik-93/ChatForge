import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthstore";
import axios from "axios";

export const RequireAuth = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { user, updateUser } = useAuthStore((state) => state);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user) {
          setIsLoading(false);
          return;
        }
        
        const response = await axios.get('http://localhost:3000/api/check-auth', { 
          withCredentials: true 
        });
        
        if (response.status === 200 && response.data.authenticated) {
          updateUser(response.data.user);
        } else {
          updateUser(null);
          localStorage.setItem("redirect", location.pathname);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        updateUser(null);
        if (location.pathname) {
          localStorage.setItem("redirect", location.pathname);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [location.pathname, updateUser, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};