export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
}

export interface Message {
    id: number;
    content: string;
    user_id: number;
    user?: User;
    created_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
