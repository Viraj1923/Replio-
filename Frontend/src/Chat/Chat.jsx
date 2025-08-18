import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply, setPrompt } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  const examplePrompts = [
    {
      title: "Explain concepts",
      description: "Explain quantum computing in simple terms"
    },
    {
      title: "Write code",
      description: "Create a Python function to sort a list"
    },
    {
      title: "Creative writing",
      description: "Write a short story about time travel"
    },
    {
      title: "Problem solving",
      description: "Help me plan a weekly meal prep"
    }
  ];

  const handleExampleClick = (description) => {
    setPrompt(description);
  };

  return (
    <>
      {newChat && prevChats.length === 0 ? (
        <div className="welcome-container">
          <h1 className="welcome-title">How can I help you today?</h1>
          <div className="welcome-examples">
            {examplePrompts.map((example, index) => (
              <div
                key={index}
                className="example-card"
                onClick={() => handleExampleClick(example.description)}
              >
                <h3>{example.title}</h3>
                <p>{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chats">
          {prevChats?.map((chat, idx) => (
            <div key={idx} className={chat.role === "user" ? "userDiv" : "gptDiv"}>
              <div className={chat.role === "user" ? "userMessage" : "gptMessage"}>
                {chat.role === "assistant" ? (
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {chat.content}
                  </ReactMarkdown>
                ) : (
                  chat.content
                )}
              </div>
            </div>
          ))}
          {latestReply &&
            // check if last chat is NOT the assistant reply
            (prevChats.length === 0 || prevChats[prevChats.length - 1].role !== "assistant") && (
              <div className="gptDiv">
                <div className="gptMessage">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
                  </ReactMarkdown>
                </div>
              </div>
            )}

        </div>
      )}
    </>
  );
}

export default Chat;
