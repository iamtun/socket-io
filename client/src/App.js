import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);

    const sendMessage = () => {
        const data = { room, userName, message };
        socket.emit("send message", data);
        //add my message
        setMessageReceived([...messageReceived, data]);
        setMessage("");
    };

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            //add other user message
            setMessageReceived([...messageReceived, data]);
        });
    }, [messageReceived]);

    return (
        <div className="App">
            <div className="content">
                <input
                    placeholder="Room number"
                    value={room}
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                />
                <button onClick={joinRoom}>Join Room</button>
                <input
                    placeholder="User name"
                    value={userName}
                    onChange={(event) => {
                        setUserName(event.target.value);
                    }}
                />
                <input
                    placeholder="Message..."
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>

            <h1>Messages</h1>
            <div className="messageBox">
                {messageReceived.map((data) =>
                    userName === data.userName ? (
                        <li className="messageRight">
                            {data.message} : {data.userName}
                        </li>
                    ) : (
                        <li>
                            {data.userName}: {data.message}{" "}
                        </li>
                    )
                )}
            </div>
        </div>
    );
}

export default App;
