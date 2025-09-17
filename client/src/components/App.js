import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const testUser = { username: "Fredrick" };

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/messages")
      .then((r) => r.json())
      .then((messages) => setMessages(messages));
  }, []);

  function handleAddMessage(newMessage) {
    setMessages([...messages, newMessage]);
  }

  function handleDeleteMessage(id) {
    fetch(`http://127.0.0.1:5555/messages/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedMessages = messages.filter((msg) => msg.id !== id);
        setMessages(updatedMessages);
      });
  }

  function handleUpdateMessage(updatedMessageObj) {
    fetch(`http://127.0.0.1:5555/messages/${updatedMessageObj.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMessageObj),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedMessages = messages.map((msg) =>
          msg.id === data.id ? data : msg
        );
        setMessages(updatedMessages);
      });
  }

  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={isDarkMode ? "dark-mode" : ""}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
      <Search search={search} onSearchChange={setSearch} />
      <MessageList
        messages={displayedMessages}
        currentUser={testUser}
        onMessageDelete={handleDeleteMessage}
        onUpdateMessage={handleUpdateMessage}
      />
      <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
    </main>
  );
}

export default App;
