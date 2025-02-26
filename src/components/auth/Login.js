import React, { useState } from "react";
import { loginUser } from "../../api/fakestoreAPI";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "", 
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username: credentials.username, 
        password: credentials.password,
      };
      
      console.log("Attempting login with:", loginData);
      
      const result = await loginUser(loginData);
      console.log("Login response:", result);
      
      if (result && result.token) {
        sessionStorage.setItem("token", result.token);
        const user = {
          username: credentials.username,
        };
        
        sessionStorage.setItem("user", JSON.stringify(user));
        
        setMessage(t("loginSuccess"));
        setIsError(false);
        
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(t("loginFailed"));
      setIsError(true);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{t("login")}</h2>
      
      {message && (
        <div className={`form-message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">{t("username")}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            placeholder={t("enterUsername")}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder={t("enterPassword")}
          />
        </div>
        
        <button type="submit" className="submit-button">
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default Login;