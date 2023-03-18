// AI flash와 socket 기본 연결 확인용
 
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function SocketPage() {
    const socket = io("http://localhost:5005");

    useEffect(() => {
        socket.on("connect", (err) => {
            if (err) alert(err);

            console.log("User conneccted")
        });
    })
} 