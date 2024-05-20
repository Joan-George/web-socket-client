"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	groupName: z.string().min(1, {
		message: "Group name should at least contain one character",
	}),
});

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	const params = useParams();
	console.log({ layout: params });
	const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			groupName: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
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
							<Button variant="outline">Edit Profile</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
							</DialogHeader>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
									<FormField
										control={form.control}
										name="groupName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input placeholder="shadcn" {...field} />
												</FormControl>
												<FormDescription>This is your public display name.</FormDescription>
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
						{`This is testing group ${i}`}
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
