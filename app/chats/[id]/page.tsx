"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatIdPage({ params }: { params: { id: string } }) {
	console.log({ params });
	const [messages, setMessages] = useState(["this is my first message"]);
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const updateMessage = (data) => {
		console.log("Received message:", data);
		setMessages((prevMessages) => [...prevMessages, data.data]);
	};

	const sendMessage = () => {
		console.log({ message });
		socket.send(message);
		setMessage("");
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		console.log({ event });
		if (event.key === "Enter") {
			event.preventDefault();
			sendMessage();
		}
	};

	return (
		<main className="flex flex-col gap-2">
			<div className="flex flex-col w-56 self-center mt-2">
				<div>This is Group1 {params.id}</div>
				<Input placeholder="Message here" onChange={(e) => setMessage(e?.target?.value)} value={message} onKeyDown={handleKeyDown} />

				<Button asChild className="mt-1" variant={"destructive"}>
					<Link href={"/api/auth/logout"}>LogOut</Link>
				</Button>
			</div>

			<ul>
				{messages.map((message) => (
					<li key={message}>{message}</li>
				))}
			</ul>
		</main>
	);
}
