"use server";

import { httpClient } from "@/services/httpClient";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { SignUpRequest, AuthResponse, LoginRequest } from "./types";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await httpClient.post<{ access_token: string }>(
      "/login",
      data
    );

    cookies().set("token", response.data.access_token);

    revalidatePath("/login");

    return {
      access_token: response.data.access_token,
      ok: true
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        error: error.response?.data.message
      };
    }

    return {
      ok: false,
      error: "Unknown error"
    };
  }
}

export async function signup(data: SignUpRequest): Promise<AuthResponse> {
  try {
    const response = await httpClient.post<{ access_token: string }>(
      "/signup",
      data
    );

    cookies().set("token", response.data.access_token);

    revalidatePath("/signup");
    return {
      access_token: response.data.access_token,
      ok: true
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        error: error.response?.data.message
      };
    }

    return {
      ok: false,
      error: "Unknown error"
    };
  }
}

export async function logout() {
  cookies().delete("token");
  revalidatePath("/");
}
