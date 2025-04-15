import React, { useEffect, useState, useRef } from "react";
import { IoPaperPlane } from "react-icons/io5";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMessage, SendMessage } from "../redux/supportSlice";

export const SupportChat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { allMessages } = useSelector((state) => state.support);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [connected, setConnected] = useState(true); // fake connected status for UI

    useEffect(() => {
        dispatch(fetchAllMessage({ ticket: id }));
    }, [id, dispatch]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        dispatch(SendMessage({ticket: id,content: message.trim()}))
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <DashboardLayout>
            <section className="support">
                <div className="row">
                    <div className="col-xxl-7 col-lg-10 col-md-11">
                        <div className="count_box p-0">
                            <div className="dashboard_head chat_head">
                                <h5 className="mb-0">
                                    {allMessages?.length > 0 && allMessages?.[0].sender !== user?.id ?
                                        `Chat with ${allMessages?.[0].sender_name}` :
                                        "Support Chat"}
                                </h5>
                                {!connected &&
                                    <span className="text-danger">Disconnected - Trying to reconnect...</span>
                                }
                            </div>

                            <div className="row chat_box" style={{ maxHeight: "500px", overflowY: "auto" }}>
                                {allMessages?.map((msg) => (
                                    msg.sender === user?.id ? (
                                        <React.Fragment key={msg.id}>
                                            <div className="col-xxl-2 col-xl-4 col-lg-1 col-md-3 col-sm-1"></div>
                                            <div className="col-xxl-10 col-xl-8 col-lg-11 col-md-9 col-sm-11 chat_spc">
                                                <div>
                                                    <h6>You</h6>
                                                    <div className="ticket_box">
                                                        <p className="mb-0">{msg.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment key={msg.id}>
                                            <div className="col-xxl-10 col-xl-8 col-lg-11 col-md-9 col-sm-11 chat_spc">
                                                <div>
                                                    <h6>{msg.sender_name}</h6>
                                                    <div className="ticket_box">
                                                        <p className="mb-0">{msg.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-2 col-xl-4 col-lg-1 col-md-3 col-sm-1"></div>
                                        </React.Fragment>
                                    )
                                ))}

                                {messages.length === 0 && (
                                    <div className="col-12 text-center py-4">
                                        <p>No messages found for this ticket.</p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="input_parent position-relative">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type your message |"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            disabled={!connected}
                                        />
                                        <div className="d-flex gap-3 align-items-center">
                                            <Link
                                                onClick={handleSendMessage}
                                                className={!connected || message.trim() === "" ? 'disabled' : ''}
                                            >
                                                <IoPaperPlane />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
};
