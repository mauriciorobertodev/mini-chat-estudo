import { cn, getFakeAvatar } from "@/lib/utils";
import { MessageWithUser } from "@/types";

type Props = {
    isUser: boolean;
    message: MessageWithUser;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
});

export function ChatMessage({ message, isUser }: Props) {
    return (
        <div className={cn("w-full flex items-center", isUser && "justify-end", !isUser && "justify-start")}>
            <div className={cn("max-w-[70%] grid  overflow-x-hidden")}>
                <div
                    className={cn(
                        "px-4 py-3 flex gap-4 overflow-x-hidden  ",
                        isUser && "bg-primary text-whites rounded-l-xl rounded-br-xl",
                        !isUser && "bg-background text-foreground rounded-r-xl rounded-bl-xl border"
                    )}
                >
                    {!isUser && (
                        <img
                            src={getFakeAvatar(message.user.name)}
                            alt={message.user.name}
                            className="h-10 w-10 rounded-full"
                        />
                    )}
                    <div className="items-center">
                        {!isUser && (
                            <p className="uppercase text-xs opacity-50 font-semibold truncate">{message.user.name}</p>
                        )}
                        <p className="text-sm pr-4">{message.content}</p>
                        <p className="text-xs opacity-60 text-end mt-4">
                            {dateFormatter.format(new Date(message.created_at))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
