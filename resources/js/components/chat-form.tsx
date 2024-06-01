import { Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, FormEventHandler, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "./ui/use-toast";

export function ChatForm() {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    });

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route("messages"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        Object.entries(errors).forEach(([key, value]) => {
            toast({
                title: key,
                description: value,
                variant: "destructive",
            });
        });
    }, [errors]);

    return (
        <form onSubmit={onSubmit} className="w-full flex items-center justify-center gap-4">
            <Input
                disabled={processing}
                name="message"
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
                className=""
            />
            <Button size={"icon"} disabled={processing}>
                {processing && <Loader2Icon />}
                {!processing && <SendIcon />}
            </Button>
        </form>
    );
}
