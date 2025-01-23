import React from "react";
import Login from "@/components/login";
import { AuthProvider } from "@/components/context/AuthContext";
import '../globals.css';
const LoginPage = () => {
  return (
    <html>
      <body>
    <AuthProvider>
      <Login />
      </AuthProvider>
      </body>
      </html>
  );
};

export default LoginPage;
