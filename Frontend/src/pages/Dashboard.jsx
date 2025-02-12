import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import SearchUser from "../components/SearchUser";
import axios from "axios";
import FileShareModal from "../components/FileShareModal";
import FileDownloadModal from "../components/FileDownloadModal";

var stompClient = null;

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState("");
  const [tab, setTab] = useState("CHATROOM");
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [username] = useState(localStorage.getItem("chat-username"));
  const navigate = useNavigate();
  const connected = useRef(false);

  if (!username.trim()) {
    navigate("/login");
  }

  useEffect(() => {
    if (!connected.current) {
      connect();
    }
    return () => {
      if (stompClient && connected.current) {
        stompClient.disconnect();
        connected.current = false;
      }
    };
  }, []);

  const handlePrivateMessage = (user) => {
    setSelectedUser(user);
    setReceiver(user.username);

    if (!privateChats.has(user.username)) {
      privateChats.set(user.username, []);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    console.log("Public message received:", payloadData);
    switch (payloadData.status) {
      case "JOIN":
        if (payloadData.senderName !== username) {
          if (!privateChats.get(payloadData.senderName)) {
            privateChats.set(payloadData.senderName, []);
            setPrivateChats(new Map(privateChats));
          }
        }
        break;
      case "LEAVE":
        if (payloadData.senderName !== username) {
          if (privateChats.get(payloadData.senderName)) {
            privateChats.delete(payloadData.senderName);
            setPrivateChats(new Map(privateChats));
          }
        }
        break;
      case "MESSAGE":
        setPublicChats((prev) => [...prev, payloadData]);
        break;
      default:
        console.warn("Unknown status received:", payloadData.status);
    }
  };

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    console.log("Private message received:", payloadData);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
    } else {
      privateChats.set(payloadData.senderName, [payloadData]);
    }
    setPrivateChats(new Map(privateChats));
  };

  const onConnect = () => {
    console.log("Connected to WebSocket");
    connected.current = true;

    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(`/user/${username}/private`, onPrivateMessage);

    userJoin();
  };

  const onError = (err) => {
    console.error("WebSocket connection error:", err);
  };

  const connect = () => {
    let sock = new SockJS("http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/ws");
    stompClient = over(sock);
    stompClient.connect({}, onConnect, onError);
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: username,
      status: "JOIN",
    };

    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const userLeft = () => {
    let chatMessage = {
      senderName: username,
      status: "LEAVE",
    };

    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const handleLogout = () => {    
    userLeft();    
    localStorage.removeItem("chat-username");
    navigate("/login");
  };

  // Handle file conversion to base64
  const base64ConversionForImages = (e) => {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setMedia(reader.result);
    reader.onerror = (error) => console.error("Error converting file:", error);
  };

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {      
      if ((message && message.trim().length > 0) || (media && media.trim().length > 0)) {
      stompClient.send(
        "/app/message",
        {},
        JSON.stringify({
          senderName: username,
          status: "MESSAGE",
          media: media || null, // Prevent empty media strings
          message: message || null, // Prevent empty messages
        })
      );
      setMessage("");
      setMedia("");
    }
  }
  };

  const sendPrivate = () => {
    if (stompClient && stompClient.connected) {
      
      if ((message && message.trim().length > 0) || (media && media.trim().length > 0)) {
      let chatMessage = {
        senderName: username,
        receiverName: receiver,
        message: message || null,
        media: media || null,
        status: "MESSAGE",
      };

      privateChats.get(receiver).push(chatMessage);
      setPrivateChats(new Map(privateChats));

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

      setMessage("");
      setMedia("");
    }
  }
  };

  const tabReceiverSet = (name) => {
    setReceiver(name);
    setTab(name);
  };

  const fetchChatHistory = async (user1, user2) => {
    try {
      const response = await axios.get(
        `http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/chat/messages/history/${user1}/${user2}`
      );

      if (response.status === 200) {
        // Assuming response.data is an array of messages
        setPrivateChats((prevChats) => {
          prevChats.set(user2, response.data);
          return new Map(prevChats);
        });
      } else {
        console.error("Failed to fetch chat history:", response.status);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  return (
    <>
  <nav className="navbar fixed-top navbar-expand-lg navbar-light"  style={{backgroundColor: "#e3f2fd"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">File Share Dashboard</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
      <button className="btn btn-link" onClick={() => setShowModal2(true)}>
        Download File
      </button>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page">Welcome {username} </Link>
        </li>
        <li className="nav-item">
        <input
              type="button"
              className="btn btn-link cursor-pointer"
              value="Logout"
              onClick={handleLogout}
            />
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
    
    <div className="container-fluid" style={{marginTop:'4rem'}}>      
    
      <div className="row">
        <div className="col-3">
        <ul className="list-none gap-2">
            <li
              key={"o"}
              className={`p-2 cursor-pointer rounded ${
                tab === "CHATROOM" ? "bg-primary text-white" : "bg-secondary"
              }`}
              onClick={() => setTab("CHATROOM")}
            >
              <span>Chat Room</span>
            </li>
            {[...privateChats.keys()].map((name, index) => (
              <li
                key={index}
                onClick={() => {
                  tabReceiverSet(name);
                  fetchChatHistory(username, name); // Fetch chat history when clicking on user tab
                }}
                className={`p-2 cursor-pointer rounded ${
                  tab === name ? "bg-primary text-white" : "bg-secondary"
                }`}
              >
                <span className="fs-5">{name}</span>
              </li>
            ))}
          </ul>

        </div>
        <div className="col-6 d-flex flex-column w-50 mt-3">
          {/* Chat Box */}
          <div
            className="chatbox d-flex flex-column flex-grow-1 overflow-hidden; bg-gray-300 border border-success p-3 gap-2 rounded-2"
            style={{ height: "500px" }}
          >
            {tab === "CHATROOM"
              ? publicChats.map((message, index) => (
                  <div
                    className={`d-flex ${
                      message.senderName !== username
                        ? "justify-content-start"
                        : "justify-content-end"
                    }`}
                    key={index}
                  >
                    <div
                      className={`p-2 d-flex flex-column w-75 ${
                        message.senderName !== username
                          ? "bg-white rounded-top rounded-end"
                          : "bg-blue-500 rounded-top rounded-start"
                      }`}
                    >
                      {message.senderName !== username && (
                        <div className="rounded bg-primary mb-2 p-2 text-white">
                          {message.senderName}
                        </div>
                      )}
                      <div
                        className={
                          message.senderName === username ? "text-white" : ""
                        }
                      >
                        {message.message}
                      </div>
                      {message.media &&
                        message.media
                          .split(";")[0]
                          .split("/")[0]
                          .split(":")[1] === "image" && (
                          <img src={message.media} alt="" width={"250px"} />
                        )}
                      {message.media &&
                        message.media
                          .split(";")[0]
                          .split("/")[0]
                          .split(":")[1] === "video" && (
                          <video width="320" height="240" controls>
                            <source src={message.media} type="video/mp4" />
                          </video>
                        )}
                    </div>
                  </div>
                ))
              : privateChats.get(tab).map((message, index) => (
                  <div
                    className={`d-flex ${
                      message.senderName !== username
                        ? "justify-content-start"
                        : "justify-content-end"
                    }`}
                    key={index}
                  >
                    <div
                      className={`d-flex flex-column p-2 max-w-lg ${
                        message.senderName !== username
                          ? "bg-white rounded-top rounded-end"
                          : "bg-primary rounded-top rounded-start"
                      }`}
                    >
                      <div
                        className={
                          message.senderName === username ? "text-white" : ""
                        }
                      >
                        {message.message}
                      </div>
                      {message.media &&
                        message.media
                          .split(";")[0]
                          .split("/")[0]
                          .split(":")[1] === "image" && (
                          <img src={message.media} alt="" width={"250px"} />
                        )}
                      {message.media &&
                        message.media
                          .split(";")[0]
                          .split("/")[0]
                          .split(":")[1] === "video" && (
                          <video width="320" height="240" controls>
                            <source src={message.media} type="video/mp4" />
                          </video>
                        )}
                    </div>
                  </div>
                ))}
          </div>

          {/* Message Box */}
          <div className="d-flex align-items-center p-2">
            <input
              className="flex-grow-1 p-2 border focus-outline-primary rounded-start"
              type="text"
              placeholder="Message"
              value={message}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === 13) {
                  tab === "CHATROOM" ? sendMessage() : sendPrivate();
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label
              htmlFor="file"
              className="p-2 bg-primary text-white rounded-end-0 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                fill="currentColor"
                className="bi bi-paperclip"
                viewBox="0 0 16 16"
              >
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
              </svg>
            </label>
            <input
              id="file"
              type="file"
              onChange={(e) => base64ConversionForImages(e)}
              className="d-none"
            />
            <input
              type="button"
              className="m-2 p-2 btn btn-primary cursor-pointer"
              value="Send"
              onClick={tab === "CHATROOM" ? sendMessage : sendPrivate}
            />
            <input
              type="button"
              className="btn btn-success cursor-pointer"
              value="Share"
              onClick={() => setShowModal(true)}
            />
            {/* File Share Modal */}
          <FileShareModal showModal={showModal} setShowModal={setShowModal} />
          {/* File Download Modal */}
        <FileDownloadModal show={showModal2} handleClose={() => setShowModal2(false)} />
          </div>
        </div>
        <div className="col-3">
        <SearchUser onUserSelect={handlePrivateMessage} />
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;