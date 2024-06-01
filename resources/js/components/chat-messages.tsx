import { Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Message } from "@/types";
import { ScrollArea } from "./ui/scroll-area";

const webSocketChannel = `channel-for-everyone`;

export function ChatMessages({ initialMessages }: { initialMessages: Message[] }) {
    const [messages, setMessages] = useState(initialMessages);

    const connectWebSocket = () => {
        console.log("Conectando ao WebSocket...");

        window.Echo.join(webSocketChannel)
            .here((users) => {
                // ...
                console.log("here", users);
            })
            .joining((user) => {
                console.log("joining", user);
            })
            .leaving((user) => {
                console.log("leaving", user);
            })
            .error((error) => {
                console.error("error", error);
            })
            .listen("", (e: { message: Message }) => {
                console.log("Evento recebido:", e);
                setMessages((prevMessages) => [...prevMessages, e.message]);
            })
            .listen("got-message", (e: { message: Message }) => {
                console.log("Evento recebido:", e);
                setMessages((prevMessages) => [...prevMessages, e.message]);
            })
            .listen("GotMessage", (e: { message: Message }) => {
                console.log("Evento recebido:", e);
                setMessages((prevMessages) => [...prevMessages, e.message]);
            })
            .listen("App\\Events\\GotMessage", (e: { message: Message }) => {
                console.log("Evento recebido:", e);
                setMessages((prevMessages) => [...prevMessages, e.message]);
            })
            .listen(".GotMessage", (e: { message: Message }) => {
                console.log("Evento recebido:", e);
                setMessages((prevMessages) => [...prevMessages, e.message]);
            });
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        };
    }, []);

    return (
        <ScrollArea className="h-full max-h-full">
            <div className="w-full h-full gap-4 space-y-8">
                {messages.map((message) => (
                    <div key={message.id}>{message.content}</div>
                ))}
            </div>
        </ScrollArea>
    );
}
