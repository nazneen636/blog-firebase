import React, { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  return (
    <AuthContext.Provider value={{ user, setUser, error, setError, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;