"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getMessages = async (id: string) => {
	const response = await axios
		.get(`${process.env.API_BASE_URL}/message/${id}`, { withCredentials: true })
		.then((res) => res)
		.catch((error) => error.response);
	return response.data;
};

export default function ChatIdPage({ params }: { params: { id: string } }) {
	console.log({ params });
	const [messages, setMessages] = useState(["this is my first message"]);
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const chatRooms = await getMessages(params.id);
			setMessages(chatRooms);
		};

		if (params.id) fetchData();
	}, [params.id]);

	// This is for socket test
	const updateMessage = (data) => {
		console.log("Received message:", data);
		setMessages((prevMessages) => [...prevMessages, data.data]);
	};

	// const sendMessage = () => {
	// 	console.log({ message });
	// 	socket.send(message);
	// 	setMessage("");
	// };

	useEffect(() => {
		console.log("useEffect");
		const socket = new WebSocket("ws://localhost:3001");

		socket.addEventListener("open", (event) => {
			console.log("open");
			socket.send("Connection established");
		});

		socket.addEventListener("message", (event) => {
			console.log({ socket: event?.data });
		});
		// socket.addEventListener("message", updateMessage);
	}, []);

	const sendMessage = async () => {
		const result = await axios.post(
			`${process.env.API_BASE_URL}/message/create`,
			{ group_id: params?.id, message },
			{ withCredentials: true }
		);
		console.log({ result });
		const newMessages = await getMessages(params?.id);
		setMessages(newMessages);
		console.log();
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
					<li key={message.id}>{message.message}</li>
				))}
			</ul>
		</main>
	);
}
