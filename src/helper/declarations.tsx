export interface AddStudent {
    _id: string;
    s_name: string;
    marks: number;
    result: boolean;
}

export const initialValuesObj: AddStudent = { _id: '', s_name: '', marks: 0, result: false }