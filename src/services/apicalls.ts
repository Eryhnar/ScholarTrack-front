const root = "http://localhost:4000/api/";

export interface RegisterProps {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponseData {
    success: boolean;
    message: string;
}

export const registerService = async (user: RegisterProps) => {
    const response = await fetch(root + "auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const parsedResponse: RegisterResponseData = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 201) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}