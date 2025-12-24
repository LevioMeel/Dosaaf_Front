"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers"

const { auth } = require("@/src/lib/auth");

export async function signUpAction(formData) {
    const email = formData.get("email")
    const password = formData.get("password")
    const name = formData.get("name")

    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
        }
    })

    redirect("/")
}

export async function signInAction(formData) {
    const email = formData.get("email")
    const password = formData.get("password")

    await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })

    redirect("/")
}

export async function signOutAction(formData) {
    await auth.api.signOut({
        headers: await headers(),
    })

    redirect("/")
}