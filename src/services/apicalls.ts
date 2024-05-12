import { NewTask } from "../pages/CreateTask/CreateTask";

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

export interface ChangePasswordProps {
    token: string;
    newCredentials: {
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }
}

export interface ChangePasswordResponse {
    success: boolean;
    message: string;
}

export const changePasswordService = async ({ token, newCredentials }: ChangePasswordProps) => {
    const { currentPassword, newPassword, confirmNewPassword } = newCredentials;
    const response = await fetch(root + "user/profile/password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
    });

    const parsedResponse: ChangePasswordResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface SuspendAccountProps {
    token: string;
}

export interface SuspendAccountResponse {
    success: boolean;
    message: string;
}

export const suspendAccountService = async ({ token }: SuspendAccountProps) => {
    const response = await fetch(root + "user/profile/suspend", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const parsedResponse: SuspendAccountResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

interface getOwnGroupsProps {
    token: string;
    pageParam: number;
}

export interface gradingScale {
    grade: string;
    range: {
        min: number;
        max: number;
    }
}

export interface Group {
    _id: string;
    name: string
    author: string;
    collaborators: string[];
    level: string
    students: string[];
    tasks: string[];
    status: "active" | "archived";
    gradingScale?: gradingScale | null,
    createdAt: Date;
    updatedAt: Date;
}

export interface getOwnGroupsResponse {
    success: boolean;
    message: string;
    data: Group[];
}



export const getOwnGroupsService = async ({token, pageParam=1}: getOwnGroupsProps) => {
    const response = await fetch(root + `group?page=${pageParam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const parsedResponse: getOwnGroupsResponse = await response.json();
    // console.log(parsedResponse.data);

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse.data;
}

export interface CreateGroupProps {
    token: string;
    newGroup: {
        name: string;
        level: string;
    }
}

export interface CreateGroupResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        name: string;
        author: string;
        collaborators: string[];
        level: string;
        students: string[];
        tasks: string[];
        status: "active" | "archived";
        gradingScale?: gradingScale;
        createdAt: Date;
        updatedAt: Date;
    }
}

export const createGroupService = async ({ token, newGroup }: CreateGroupProps) => {
    const response = await fetch(root + "group", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newGroup),
    });

    const parsedResponse: CreateGroupResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 201) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface EditGroupProps {
    token: string;
    groupId: string;
    editGroup: {
        name: string;
        level: string;
    }
}

export interface EditGroupResponse {
    success: boolean;
    message: string;
    data: Group;
}

export const editGroupService = async ({ token, groupId, editGroup }: EditGroupProps) => {
    const response = await fetch(root + `group/${groupId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editGroup),
    });

    const parsedResponse: EditGroupResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface DeleteGroupProps {
    token: string;
    groupId: string;
}

export interface DeleteGroupResponse {
    success: boolean;
    message: string;
}

export const deleteGroupService = async ({ token, groupId }: DeleteGroupProps) => {
    const response = await fetch(root + `group/${groupId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const parsedResponse: DeleteGroupResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface getGroupProps {
    token: string;
    groupId: string;
}

export interface getGroupResponse {
    success: boolean;
    message: string;
    data: Group;
}

export const getGroupService = async ({ token, groupId }: getGroupProps) => {
    const response = await fetch(root + `group/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const parsedResponse: getGroupResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse.data;
}  

export interface Attendance {
    _id: string;
    date: Date;
    present: boolean;
    student: string;
    group: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Mark {
    _id: string;
    value: number;
    student: string;
    task: string;
    group: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Student {
    _id: string;
    name: string;
    surname: string;
    groups: string[];
    status: "active" | "suspended";
    age: number;
    createdAt: Date;
    updatedAt: Date;
    attendances: Attendance[];
    marks: Mark[];
    totalAttendance: number;
    totalMarks: number;

}

export interface getStudentOverviewProps {
    token: string;
    groupId: string;
}

export interface getStudentOverviewResponse {
    success: boolean;
    message: string;
    data: Student[];
}

export const getStudentOverviewService = async ({ token, groupId }: getGroupProps) => {
    const response = await fetch(root + `student/overview/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    
    const parsedResponse:getStudentOverviewResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse.data;
}

export interface CreateTaskProps {
    token: string;
    group: string;
    newTask: {
        name: string;
        description?: string;
        deadline?: string;
        groups: string[];
        weight: string;
        optional: boolean;
    }
}

export interface CreateTaskResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        name: string;
        description?: string;
        deadline?: string;
        groups: string[];
        weight: string;
        optional: boolean;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }
}

export const createTaskService = async ({ token, group, newTask }: CreateTaskProps) => {
    const response = await fetch(root + `task/${group}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newTask),
    });

    const parsedResponse:CreateTaskResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 201) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface CreateStudentProps {
    token: string;
    newStudent: {
        name: string;
        surname: string;
        age: string;
        group: string;
    }
}

export interface CreateStudentResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        name: string;
        surname: string;
        age: number;
        groups: string[];
        status: "active" | "suspended";
        createdAt: Date;
        updatedAt: Date;
        attendances: Attendance[];
        marks: Mark[];
    }
}

export const createStudentService = async ({ token, newStudent }: CreateStudentProps) => {
    const response = await fetch(root + "student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newStudent),
    });

    const parsedResponse:CreateStudentResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 201) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface getTasksProps {
    token: string;
    groupId: string;
}

export interface Task {
    _id: string;
    name: string;
    description?: string;
    deadline?: string;
    groups: string[];
    weight: string;
    optional: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface getTasksResponse { //TODO change with the correct interface for task
    success: boolean;
    message: string;
    data: Task[]; 
}

export const getTasksService = async ({ token, groupId }: getTasksProps) => {
    const response = await fetch(root + `task/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const parsedResponse:getTasksResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse.data;
}

export interface EditTaskServiceProps {
    token: string;
    group: string;
    task: string;
    newTask: NewTask;
}

export interface EditTaskResponse {
    success: boolean;
    message: string;
    data: Task;
}

export const editTaskService = async ({ token, group, task, newTask }: EditTaskServiceProps) => {
    const response = await fetch(root + `task/${group}/${task}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newTask),
    });

    const parsedResponse:EditTaskResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export interface DeleteTaskProps {
    token: string;
    groupId: string;
    taskId: string;
}

export interface DeleteTaskResponse {
    success: boolean;
    message: string;
}

export const deleteTaskService = async ({ token, groupId, taskId }: DeleteTaskProps) => {
    const response = await fetch(root + `task/${groupId}/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const parsedResponse:DeleteTaskResponse = await response.json();

    if (response.status === 404) {
        throw new Error(parsedResponse.message || "Something went wrong");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}