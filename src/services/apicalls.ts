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

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponseData {
    success: boolean;
    message: string;
    data: {
        token: string
        user: {
            id: string;
            name: string;
            role: string;
        }
    };
}

export const loginService = async (user: LoginProps) => {
    const response = await fetch(root + "auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const parsedResponse: LoginResponseData = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface UpdateUserProps {
    token: string;
    newUser: {
        name?: string;
        email?: string;
    };
}

export interface UpdateUserResponseData {
    success: boolean;
    message: string;
    data: {
        id: string;
        name: string;
        role: string;
    };
}

export const updateUserService = async ({ token, newUser }: UpdateUserProps): Promise<UpdateUserResponseData> => {
    const response = await fetch(root + "user/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newUser),
    });

    const parsedResponse: UpdateUserResponseData = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}