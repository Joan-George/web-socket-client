"use server";

import axios from "axios";

export async function login(formData: FormData) {
	console.log({ FormData: formData.entries() });
	let data = {};
	for (const [key, value] of formData.entries()) {
		data = { ...data, [key]: value };
	}

	console.log({ data });

	const response = await axios
		.post(`http://localhost:3001/login`, data)
		.then((res) => res)
		.catch((error) => error);
	return response.data;
}
