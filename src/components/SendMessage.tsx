
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AppBar, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import Chats from './Chats';
import ChatApp from './ChatApp';
import { socket } from "../../socket";
import UserChats from "./UserChats";
import ChatContext from "../Store/ChatContext";
import { useContext, useState, useEffect, useRef } from "react";
import profilepic from '../Images/profile-picture-5.jpg'
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material';


const SendMessage = () => {
    const { selectedUser } = useContext(ChatContext)

    const [message, setMessage] = useState("");

    const messagesEndRef = useRef(null);
    const theme = createTheme({
        palette: {
            background: {
                default: '#EFEAE2', // WhatsApp background color
            },
            primary: {
                main: '#128c7e', // WhatsApp's signature green
            },
            secondary: {
                main: '#25d366', // WhatsApp's green accent (e.g., send button)
            },
            chatBubble: {
                sent: '#dcf8c6', // Light green for sent messages
                received: '#ffffff', // White for received messages
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            body2: {
                fontSize: '14px', // Message text size
            },
            caption: {
                fontSize: '11px', // Timestamp size
                color: '#999999', // Light gray for timestamps
            },
        },
    });

    const handleSendMessage = () => {
        socket.emit('sendMessage', {
            logged_in_user_uuid: localStorage.getItem('user_uuid'),
            receiver_uuid: selectedUser.user_uuid,
            message: message,
        })
        setMessage("");
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);


    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ borderRight: '2px solid #ccc', overflowY: 'auto', height: '87vh', width: '25%' }}>
                <UserChats></UserChats>
            </Box>
            <Box component="section" sx={{
                height: '60vh',
                display: 'flex-col',
                width: '75%'
            }}>
                <Box sx={{
                    flexGrow: 1,
                }}>
                    <AppBar position="static" sx={{ background: '#f0f2f5', }} elevation={0}>
                        <Toolbar>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <img src={profilepic} alt="PP" style={{ height: "45px", width: "45px", borderRadius: "65px" }} />
                                <div style={{ fontFamily: "arial", fontStyle: "normal", color: "black", alignSelf: "center" }}>
                                    {selectedUser?.first_name}
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ flexGrow: 1, padding: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: "background.default", height: '71vh', }}>
                            <Chats></Chats>
                            <div ref={messagesEndRef} />
                        </Box>
                    </ThemeProvider>
                </Box>
                <Box
                    component="section"
                    sx={{
                        display: 'flex',
                    }}
                >
                    <TextField
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        variant="outlined"
                        rows={3}
                        sx={{
                            outline: 'none',
                            width: '95%'
                        }}
                        placeholder="Type a message..."
                    />

                    <IconButton color='blue' style={{ marginLeft: '8px' }}
                        onClick={handleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </Box>

            </Box>
        </Box>
    )
}

export default SendMessage;