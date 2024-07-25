import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddStudent } from "../../helper/declarations";

interface AddModalState {
     visible: boolean;
     allUsers: AddStudent[];
     editUser: AddStudent | null;
}

const initialState: AddModalState = {
     visible: false,
     editUser: null,
     allUsers: [
          // {
          //      id: generateUniqueId(),
          //      s_name: "abc",
          //      marks: 100,
          //      result: true,
          // },
     ],
};

export const addModalSlice = createSlice({
     name: "addModal",
     initialState,
     reducers: {
          setVisible: (state, action: PayloadAction<boolean>) => {
               state.visible = action.payload;
          },
          setAllUsers: (state, action: PayloadAction<AddStudent[]>) => {
               state.allUsers = action.payload;
          },
          setEditUser: (state, action: PayloadAction<AddStudent | null>) => {
               state.editUser = action.payload;
          },
     },
});

export const { setVisible, setAllUsers, setEditUser } = addModalSlice.actions;

export default addModalSlice.reducer;
