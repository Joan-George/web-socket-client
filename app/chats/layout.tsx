"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Group name should at least contain one character",
	}),
});

const getChats = async () => {
	const response = await axios
		.get(`${process.env.API_BASE_URL}/group`, { withCredentials: true })
		.then((res) => res)
		.catch((error) => error.response);
	return response.data;
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const chatRooms = await getChats();
			setChats(chatRooms);
		};

		fetchData();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			group_name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log({ baseURL: process.env.API_BASE_URL });
		await axios.post(`${process.env.API_BASE_URL}/group/create`, values, { withCredentials: true });
		const chatRooms = await getChats();
		setChats(chatRooms);
		form.reset();
		setIsDialogueOpen(false);

		console.log(values);
		setIsDialogueOpen(false);
	}

	return (
		<div className="flex h-screen w-screen overflow-hidden">
			{/* <ChatList /> */}

			<div className=" flex flex-col overflow-auto">
				<div id="miscellaneous">
					<Dialog open={isDialogueOpen} onOpenChange={(open) => setIsDialogueOpen(open)}>
						<DialogTrigger asChild>
							<Button variant="outline">Create Group</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Create Group</DialogTitle>
							</DialogHeader>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Group Name</FormLabel>
												<FormControl>
													<Input placeholder="Enter Group Name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* <Button type="submit">Submit</Button> */}
								</form>
							</Form>
							<DialogFooter>
								<Button type="submit" onClick={form.handleSubmit(onSubmit)}>
									Create Group
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
				{chats.map((chat) => (
					<Link
						key={chat.id}
						className={cn(
							`bg-zinc-900 p-4 ease-in-out transition-all cursor-pointer  hover:bg-slate-700 ${
								params.id === chat.id ? "bg-green-500 hover:bg-green-500" : ""
							}`
						)}
						href={`/chats/${chat.id}`}
					>
						{chat.name}
					</Link>
				))}
			</div>
			<div className="col-span-3">{children}</div>
		</div>
	);
}

function ChatList() {
	return (
		<div className="h-fit overflow-auto">
			{[...Array(30)].map((_, i) => (
				<div key={i} className="bg-zinc-900 p-2">
					{i}
				</div>
			))}
		</div>
	);
}
