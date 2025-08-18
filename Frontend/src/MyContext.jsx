import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/Firebase/FirebaseConfig";
import { v1 as uuidv1 } from "uuid";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("👤 Firebase Auth User:", user);
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(() => {
    return localStorage.getItem("currThreadId") || uuidv1();
  });
  const [prevChats, setPrevChats] = useState(() => {
    const stored = localStorage.getItem("prevChats");
    return stored ? JSON.parse(stored) : [];
  });
  const [newChat, setNewChat] = useState(() => {
    const stored = localStorage.getItem("newChat");
    return stored ? JSON.parse(stored) : true;
  });
  const [allThreads, setAllThreads] = useState([]);

  useEffect(() => {
    localStorage.setItem("currThreadId", currThreadId);
  }, [currThreadId]);

  useEffect(() => {
    localStorage.setItem("prevChats", JSON.stringify(prevChats));
  }, [prevChats]);

  useEffect(() => {
    localStorage.setItem("newChat", JSON.stringify(newChat));
  }, [newChat]);

  return (
    <MyContext.Provider
      value={{
        currentUser,
        loading,
        prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        newChat, setNewChat,
        prevChats, setPrevChats,
        allThreads, setAllThreads,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
