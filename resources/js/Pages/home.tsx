import { Link, Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BackgroundBlur } from "@/components/background-blur";
import GuestLayout from "@/Layouts/GuestLayout";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PLACEHOLDER_USER_AVATAR_URL } from "@/constants";
import { cn, getFakeAvatar } from "@/lib/utils";

export default function Home({ users }: PageProps<{ users: (User & { is_online: boolean })[] }>) {
    function generateFakeUsers() {
        router.post(route("generate.users"), {});
    }

    function loginWith(user: User) {
        router.post(route("login"), {
            email: user.email,
            password: "password",
        });
    }

    return (
        <GuestLayout>
            <Head title="Home" />
            <div className="h-full  max-w-lg mx-auto border rounded-xl grid grid-rows-[1fr_min-content] z-50 px-4">
                <ScrollArea className="h-full">
                    {/* <div className="py-4 divide-y pr-4"> */}
                    <div className="py-4 pr-4">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => loginWith(user)}
                                disabled={user.is_online}
                                className="grid grid-cols-[1fr_min-content] items-center hover:bg-muted-foreground/10 w-full px-4 rounded-md group"
                            >
                                <div className="flex gap-4 items-center justify-start py-4">
                                    <div className="relative">
                                        <img
                                            src={getFakeAvatar(user.name)}
                                            className="h-14 w-14 rounded-full border-2 border-muted group-hover:border-primary group-hover:border-4"
                                        />
                                        <div
                                            className={cn(
                                                "h-4 w-4  rounded-full absolute bottom-0 right-0",
                                                user.is_online && "bg-green-500",
                                                !user.is_online && "bg-slate-700"
                                            )}
                                        ></div>
                                    </div>
                                    <div className="text-start">
                                        <h2 className="text-foreground text-lg font-bold group-hover:text-primary">
                                            {user.name}
                                        </h2>
                                        <p className="text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>

                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        ))}
                    </div>
                </ScrollArea>

                <div className="border-t p-4 flex justify-center items-center gap-4">
                    <ToggleTheme />
                    <Button onClick={generateFakeUsers} variant={"outline"}>
                        Generate more 3 fake users
                    </Button>
                </div>
            </div>
        </GuestLayout>
    );
}
