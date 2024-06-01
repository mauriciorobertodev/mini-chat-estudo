import { Link, Head, router } from "@inertiajs/react";
import { Message, PageProps } from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import { ToggleTheme } from "@/components/toggle-theme";
import { User } from "@/types";
import { getFakeAvatar } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";

export default function Rooms({ auth, messages }: PageProps<{ messages: Message[] }>) {
    function logout() {
        console.log("logou");
        router.post(route("logout"));
    }

    return (
        <GuestLayout>
            <Head title="Rooms" />

            <div className="h-screen max-h-full max-w-7xl mx-auto grid grid-rows-[min-content_1fr] gap-4">
                <div className="h-full">
                    <div className="flex gap-6 items-center">
                        <img src={getFakeAvatar(auth.user.name)} className="h-14 w-14 rounded-full" />
                        <div>
                            <h2 className="text-foreground text-lg font-bold group-hover:text-primary">
                                {auth.user.name}
                            </h2>
                            <p className="text-muted-foreground">{auth.user.email}</p>
                        </div>
                        <Button variant={"ghost"} size={"icon"} onClick={logout}>
                            <LogOutIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="border rounded-xl grid grid-rows-[1fr_min-content] z-50 px-4 overflow-hidden">
                    <div className="grid grid-cols-[min-content_1fr] divide-x py-4 h-full max-h-full overflow-hidden ">
                        <div>
                            <div className="w-32 h-10 bg-blue-500"></div>
                        </div>
                        <div className="h-full grid grid-rows-[1fr_min-content] overflow-y-auto gap-4 px-4 pb-4">
                            <ChatMessages initialMessages={messages} />
                            <ChatForm />
                        </div>
                    </div>
                    <div className="border-t p-4 flex justify-center items-center gap-4">
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
