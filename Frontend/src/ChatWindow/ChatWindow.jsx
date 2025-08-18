import "./ChatWindow.css";
import Chat from "../Chat/Chat.jsx";
import { MyContext } from "../MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";
import { toast } from "react-toastify";


function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("https://replio-backend.onrender.com/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest(".userIconDiv") &&   // not clicking profile icon
                !e.target.closest(".dropDown")         // not clicking dropdown
            ) {
                setIsOpen(false); // close menu
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    const handleSettings = () => {
        alert("⚙️ Settings will be available soon!");
    };

    const handleUpgrade = () => {
        alert("🚀 Upgrade plan is not available currently.");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase logout
            localStorage.removeItem("user"); // clear user data
            toast.success("Logged out successfully!");
            navigate("/login"); // go back to login page
        } catch (err) {
            console.error("Logout error:", err.message);
            toast.error("Failed to log out");
        }
    };


    return (
        <div className="chatWindow">
            <div className="navbar">
                {/* 🔹 Add hamburger icon for mobile */}
                <div
                    className="menuIcon"
                    onClick={() => {
                        document.querySelector(".sidebar").classList.toggle("show");
                    }}
                >
                    <i className="fa-solid fa-bars"></i>
                </div>

                <span>
                    Replio... <i className="fa-solid fa-chevron-down"></i>
                </span>

                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="dropDown">
                    <div className="dropDownItem" onClick={handleSettings}>
                        <i className="fa-solid fa-gear"></i> Settings
                    </div>
                    <div className="dropDownItem" onClick={handleUpgrade}>
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
                    </div>
                    <div className="dropDownItem" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}

            <Chat />

            <ScaleLoader color="#fff" loading={loading} />

            <div className="chatInput">
                <div className="inputBox">
                    <input
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
                    />
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    Replio can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    );
}

export default ChatWindow;