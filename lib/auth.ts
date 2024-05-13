"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const auth = () => {
	if (!cookies().get("token")) {
		redirect("/");
	}
};
