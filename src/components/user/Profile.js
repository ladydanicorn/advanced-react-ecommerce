import React, { useState, useEffect } from "react";
import { getUserById, updateUser, deleteUser } from "../../api/fakestoreAPI";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const [userData, setUserData] = useState({
        username: storedUser?.username || "",
        email: storedUser?.email || "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (storedUser) {
            setUserData({
                username: storedUser.username || "",
                email: storedUser.email || "",
                password: "",
            });
        } else {
            // Redirect to login if no user is stored
            navigate("/login");
        }
    }, [storedUser, navigate]);
    
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatedUser = {
                ...storedUser,
                ...userData
            };
            
            sessionStorage.setItem("user", JSON.stringify(updatedUser));
            setMessage(t("profileUpdated"));
            setMessageType("success");
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage(t("profileUpdateFailed"));
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        // Ask for confirmation before deleting
        const confirmed = window.confirm(t("deleteAccountConfirmation"));
        
        if (confirmed) {
            try {
                setIsLoading(true);
                
                try {
                    if (storedUser && storedUser.id) {
                        await deleteUser(storedUser.id);
                    } else {
                        throw new Error("No user ID available");
                    }
                } catch (apiError) {
                    console.warn("API deletion failed, using local fallback:", apiError);
                }
                
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                
                setMessage(t("accountDeleted"));
                setMessageType("success");
                
                // Redirect to home after 2 seconds
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } catch (error) {
                console.error("Error deleting account:", error);
                setMessage(t("accountDeletionFailed"));
                setMessageType("error");
                setIsLoading(false);
            }
        }
    };

    if (!storedUser) {
        return <div>{t("pleaseLogin")}</div>;
    }

    return (
        <div className="auth-form-container">
            <h2>{t("profile")}</h2>
            
            {message && (
                <div className={`form-message ${messageType}`}>
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
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">{t("email")}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">{t("password")}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder={t("leaveEmptyPassword")}
                    />
                </div>
                
                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="update-button"
                    >
                        {isLoading ? t("updating") : t("updateProfile")}
                    </button>
                </div>
            </form>
            
            <div className="delete-account">
                <h3>{t("deleteAccount")}</h3>
                <p>{t("deleteAccountWarning")}</p>
                <button 
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="delete-button"
                >
                    {isLoading ? t("deleting") : t("deleteAccount")}
                </button>
            </div>
        </div>
    );
};

export default Profile;