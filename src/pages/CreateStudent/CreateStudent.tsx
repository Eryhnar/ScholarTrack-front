import { useState } from "react";
import { CInput } from "../../common/CInput/CInput"

interface NewStudent{
    name: string;
    surname: string;
    age: string;
    group: string;
}

export const CreateStudent: React.FC = (): JSX.Element => {
    const [newStudent, setNewStudent] = useState<NewStudent>({
        name: "",
        surname: "",
        age: "",
        group: "",
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewStudent({
                ...newStudent,
                [e.target.name]: e.target.value,
            })
        }
    
    return (
        <>
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
            <CInput
                type="text"
                placeholder="Group"
                name="group"
                value={newStudent.group || ""}
                onChangeFunction={inputHandler}
            />
        </>
    )
}