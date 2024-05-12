import { useState } from "react";
import { CInput } from "../../common/CInput/CInput"
import { useNavigate, useParams } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { Toast } from "../../common/Toast/Toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { CreateStudentResponse, createStudentService } from "../../services/apicalls";
import { useMutation } from "react-query";

interface NewStudent {
    name: string;
    surname: string;
    age: string;
    group: string;
}

export const CreateStudent: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token;
    const navigate = useNavigate()
    const group = useParams<{ groupId: string }>().groupId
    const [newStudent, setNewStudent] = useState<NewStudent>({
        name: "",
        surname: "",
        age: "",
        group: group!,
    })
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStudent({
            ...newStudent,
            [e.target.name]: e.target.value,
        })
    }

    const mutation = useMutation(createStudentService, {
        onSuccess: (response: CreateStudentResponse) => {
            // console.log(response)
            navigate(-1)
        },
        onError: (error: any) => {
            // console.log(error)
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    })

    const createStudent = async () => {
        mutation.mutate({token, newStudent})
    }

    return (
        <>
            <Toast 
                message={errorMsg.serverError.message}
                success={errorMsg.serverError.success}
                time={4000}
                resetServerError={() => setErrorMsg({serverError: {message: "", success: false}})}
            />
            <h1>Create Student</h1>
            <CInput
                type="text"
                placeholder="Name"
                name="name"
                value={newStudent.name || ""}
                onChangeFunction={inputHandler}
            />
            <CInput
                type="text"
                placeholder="Surname"
                name="surname"
                value={newStudent.surname || ""}
                onChangeFunction={inputHandler}
            />
            <CInput
                type="text"
                placeholder="Age"
                name="age"
                value={newStudent.age || ""}
                onChangeFunction={inputHandler}
            />
            {/* <CInput
                type="text"
                placeholder="Group"
                name="group"
                value={newStudent.group || ""}
                onChangeFunction={inputHandler}
            /> */}
            <CButton
                title="Create Student"
                onClickFunction={createStudent}
            />
        </>
    )
}