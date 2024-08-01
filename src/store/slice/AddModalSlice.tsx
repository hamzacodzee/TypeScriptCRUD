import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddStudent } from "../../helper/declarations";

interface AddModalState {
     visible: boolean;
     allUsers: AddStudent[];
     editUser: AddStudent | null;
     search: string;
}

const initialState: AddModalState = {
     visible: false,
     editUser: null,
     allUsers: JSON.parse(localStorage.getItem("CrudUser") || "[]"),
     search: "",
};

export const addModalSlice = createSlice({
     name: "addModal",
     initialState,
     reducers: {
          setVisible: (state, action: PayloadAction<boolean>) => {
               state.visible = action.payload;
          },
          setSearch: (state, action: PayloadAction<string>) => {
               state.search = action.payload;
          },
          setAllUsers: (state, action: PayloadAction<AddStudent[]>) => {
               state.allUsers = action.payload;
          },
          setEditUser: (state, action: PayloadAction<AddStudent | null>) => {
               state.editUser = action.payload;
          },
     },
});

export const { setVisible, setAllUsers, setEditUser,setSearch } = addModalSlice.actions;

export default addModalSlice.reducer;
