import { Message, User } from "@/types";
import { Events } from "@/types/events";
import { Channel, PresenceChannel } from "laravel-echo";
import { useCallback, useEffect, useState } from "react";

type Props = {
    room: string;
    onJoined?: (users: User[]) => void;
    onJoin?: (user: User) => void;
    onLeave?: (user: User) => void;
    onError?: (error: Error) => void;
};

export function useRoom({ room, onJoin, onLeave, onError, onJoined }: Props) {
    const [participants, setParticipants] = useState<User[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [channel, setChannel] = useState<PresenceChannel | null>(null);

    const join = useCallback(() => {
        console.log("Conectando ao WebSocket...");

        const channel = window.Echo.join(room)
            .here((users: User[]) => {
                console.log("Conectado ao WebSocket....");
                setParticipants(users);
                if (onJoined) onJoined(users);
            })
            .joining((user: User) => {
                setParticipants((prevParticipants) => {
                    return [...prevParticipants.filter((p) => p.id != user.id), user];
                });
                if (onJoin) onJoin(user);
            })
            .leaving((user: User) => {
                setParticipants((prevParticipants) => {
                    return [...prevParticipants.filter((p) => p.id != user.id)];
                });
                if (onLeave) onLeave(user);
            })
            .error((error: Error) => {
                setError(error);
                if (onError) onError(error);
            }) as PresenceChannel;

        setChannel(channel);
        return channel;
    }, [room]);

    const leave = useCallback(() => {
        console.log("Desconectando do WebSocket...");

        window.Echo.leave(room);
        setParticipants([]);
        setChannel(null);
    }, [room]);

    const on = useCallback(
        <K extends keyof Events>(event: K, callback: (data: Events[K]) => void) => {
            channel?.listen(event, callback);
        },
        [room, channel]
    );

    useEffect(() => {
        console.log("renderizando");
        join();
        return () => leave();
    }, []);

    return {
        join,
        leave,
        on,

        participants,
        error,
        room: channel,
    };
}
