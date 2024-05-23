"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { redirect } from "next/navigation";

const login = async ({ data }: { data: FormData }) => {
	let formData = {};
	for (const [key, value] of data.entries()) {
		formData = { ...formData, [key]: value };
	}

	const response = await axios
		.post(`http://localhost:3001/login`, formData, { withCredentials: true })
		.then((res) => res)
		.catch((error) => error.response);
	console.log({ response: response?.data, status: response?.status });
	return response.data;
};

const getData1 = async () => {
	const response = await axios
		.get(`${process.env.API_BASE_URL}/getData`, { withCredentials: true })
		.then((res) => res)
		.catch((error) => error.response);
	return response.data;
};

export default function Home() {
	const submit = async (FormData: FormData) => {
		let body = {};

		console.log({ FormData });
		const loginData = await login({ data: FormData });
		const getData = await getData1();
		redirect("/chats");
		console.log({ getData });
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="flex flex-col w-1/3 ">
				<ModeToggle />
				<div id="header" className="font-mono text-lg font-bold">
					Login Mod
				</div>
				<form action={submit}>
					<div className="mt-2 flex flex-col gap-2">
						<Input placeholder="Email" type="email" className="w-96" name="email" />
						<Input placeholder="Password" type="password" className="w-96" name="password" />
						<Button type="submit" className="primary w-1/2 self-center inline-block" variant={"destructive"}>
							Login
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
