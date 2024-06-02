import { Message, MessageWithUser, User } from "@/types";

export interface Events {
    GotMessage: { message: MessageWithUser };
}
