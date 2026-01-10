import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios, authUser, onlineUsers } = useContext(AuthContext);

  // Restore selectedUser from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) setSelectedUser(JSON.parse(storedUser));
  }, []);

  // Save selectedUser to localStorage
  useEffect(() => {
    if (selectedUser)
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    else localStorage.removeItem("selectedUser");
  }, [selectedUser]);

  // Get all users
  const getUsers = async () => {
    
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get messages for selected user
  const getMessages = async (userId) => {
   
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Send message
  const sendMessage = async (messageData) => {
    
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          data.newMessage,
        ]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Subscribe to socket messages
  const subscribeToMessages = () => {
    if (!socket ) return;

    socket.on("newMessage" , (newMessage)=>{
        if(selectedUser && newMessage.senderId === selectedUser._id){
            newMessage.seen = true;
            setMessages((prevMessages)=>[...prevMessages ,newMessage]);
            axios.put(`/api/mesages/mark/${newMessage._id}`);

        }
        else{
            setUnseenMessages((prevUnseenMessages)=>({
                ...prevUnseenMessages, [newMessage.sender.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
                [newMessage.senderId] + 1 : 1
            }))
        }
    })
  };

  //function to unsbscribe from messages
  const unsubscribeFromMessages = ()=>{
    if(socket) socket.off("newMessage");
  }

  useEffect(() => {
    getUsers();
  }, [authUser, onlineUsers]);

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
     subscribeToMessages();
    return ()=> unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
