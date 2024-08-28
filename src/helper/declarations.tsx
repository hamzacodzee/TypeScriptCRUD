export interface AddStudent {
     _id: string;
     s_name: string;
     marks: number;
     result: boolean;
}

export interface PaginationValuesObj {
     count: number;
     start: number;
     end: number;
}

export const initialValuesObj: AddStudent = {
     _id: "",
     s_name: "",
     marks: 0,
     result: false,
};

export const limit: number = 2;