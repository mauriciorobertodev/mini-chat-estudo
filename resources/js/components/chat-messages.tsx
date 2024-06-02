import { useEffect, useRef, useState } from "react";
import { Message, MessageWithUser } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { useRoom } from "@/hooks/use-room";
import { ChatMessage } from "./chat-message";

export function ChatMessages({ initialMessages, userId }: { initialMessages: MessageWithUser[]; userId: number }) {
    const { toast } = useToast();
    const { room, on } = useRoom({
        room: "channel-for-everyone",
        onJoined: () => toast({ title: "Entrou na sala" }),
        onJoin: (user) => toast({ title: `${user.name}`, description: "Entrou na sala", variant: "success" }),
        onLeave: (user) => toast({ title: `${user.name}`, description: "Saiu da sala", variant: "destructive" }),
    });

    const [messages, setMessages] = useState(initialMessages);
    const scroll = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages.length, scroll.current]);

    useEffect(() => {
        on("GotMessage", ({ message }) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, [room]);

    return (
        <ScrollArea className="h-full max-h-full max-w-full">
            <div className=" h-full gap-4 space-y-8 pr-4 max-w-full " ref={scroll}>
                {messages.map((message) => (
                    <ChatMessage message={message} isUser={message.user_id === userId} />
                ))}
            </div>
        </ScrollArea>
    );
}
