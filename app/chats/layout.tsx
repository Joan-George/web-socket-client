"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	const params = useParams();
	console.log({ layout: params });
	return (
		<div className="flex h-screen w-screen overflow-hidden">
			{/* <ChatList /> */}
			<div className=" flex flex-col overflow-auto">
				{[...Array(30)].map((_, i) => (
					<Link
						key={i}
						className={cn(
							`bg-zinc-900 p-4 ease-in-out transition-all cursor-pointer  hover:bg-slate-700 ${
								params.id === i.toString() ? "bg-green-500 hover:bg-green-500" : ""
							}`
						)}
						href={`/chats/${i}`}
					>
						{`This is tesing group ${i}`}
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
