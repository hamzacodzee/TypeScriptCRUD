import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
     AddStudent,
     initialValuesObj,
     limit,
     PaginationValuesObj,
} from "../../helper/declarations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface AddModalState {
     visible: boolean;
     editUser: AddStudent | null;
     search: string;
     addData: AddStudent;
     getUserByIdState: AddStudent | null;
     getUserState: AddStudent[] | null;
     filteredUserState: AddStudent[] | null;
     deleteUserState: AddStudent | null;
     updateUserState: AddStudent | null;
     crudLoading: boolean;
     paginationValues: PaginationValuesObj;
}

const initialState: AddModalState = {
     visible: false,
     editUser: null,
     search: "",
     addData: JSON.parse(JSON.stringify(initialValuesObj)),
     getUserByIdState: null,
     getUserState: null,
     filteredUserState: null,
     deleteUserState: null,
     updateUserState: null,
     crudLoading: false,
     paginationValues: {
          count: 0,
          start: 1,
          end: limit,
     },
};

const host = "https://typescriptcrudbackend.onrender.com/api/crud";

export const addUser = createAsyncThunk(
     `crud/addUser`,
     async (
          userData: { s_name: string; marks: number; result: boolean },
          { dispatch }
     ) => {
          try {
               const response = await axios.post(`${host}/add`, userData);
               toast.success("Added Successfully!");
               dispatch(getUser());
               return response.data.crud;
          } catch (error: any) {
               return error.response.data;
          }
     }
);

export const updateUser = createAsyncThunk(
     `crud/updateUser`,
     async (
          userData: {
               _id: string;
               s_name: string;
               marks: number;
               result: boolean;
          },
          { dispatch }
     ) => {
          try {
               const { _id, ...updateData } = userData;
               const response = await axios.put(
                    `${host}/edit/${_id}`,
                    updateData
               );
               toast.success("Updated Successfully!");
               dispatch(getUser());
               return response.data.crud;
          } catch (error: any) {
               return error.response.data;
          }
     }
);

export const deleteUser = createAsyncThunk(
     `crud/deleteUser`,
     async (userData: { _id: string }, { dispatch }) => {
          try {
               const response = await axios.delete(
                    `${host}/delete/${userData._id}`
               );
               toast.success("Deleted Successfully!");
               dispatch(getUser());
               return response.data.crud;
          } catch (error: any) {
               return error.response.data;
          }
     }
);

export const getUser = createAsyncThunk(`crud/getUser`, async () => {
     try {
          const response = await axios.get(`${host}/get`);
          return response.data.crud;
     } catch (error: any) {
          return error.response.data;
     }
});

export const getUserById = createAsyncThunk(
     `crud/getUserById`,
     async (
          { id, actionType }: { id: string; actionType: string },
          { dispatch }
     ) => {
          try {
               const response = await axios.get(`${host}/get/${id}`);
               if (actionType === "edit") {
                    dispatch(setEditUser(response.data.crud));
               }
               return response.data.crud;
          } catch (error: any) {
               return error.response.data;
          }
     }
);

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
          setEditUser: (state, action: PayloadAction<AddStudent | null>) => {
               state.editUser = action.payload;
          },
          setPaginationValues: (
               state,
               action: PayloadAction<PaginationValuesObj>
          ) => {
               state.paginationValues = action.payload;
          },
          setFilteredUserState: (
               state,
               action: PayloadAction<AddStudent[] | null>
          ) => {
               state.filteredUserState = action.payload;
          },
     },
     extraReducers: (builder) => {
          builder
               .addCase(addUser.pending, (state) => {
                    state.crudLoading = true;
               })
               .addCase(addUser.rejected, (state) => {
                    state.addData = {
                         _id: "",
                         s_name: "",
                         marks: 0,
                         result: false,
                    };
                    state.crudLoading = false;
               })
               .addCase(addUser.fulfilled, (state, action) => {
                    state.addData = action.payload;
                    state.crudLoading = false;
               })
               .addCase(updateUser.pending, (state) => {
                    state.crudLoading = true;
               })
               .addCase(updateUser.rejected, (state) => {
                    state.updateUserState = {
                         _id: "",
                         s_name: "",
                         marks: 0,
                         result: false,
                    };
                    state.crudLoading = false;
               })
               .addCase(updateUser.fulfilled, (state, action) => {
                    state.updateUserState = action.payload;
                    state.crudLoading = false;
               })
               .addCase(deleteUser.pending, (state) => {
                    state.crudLoading = true;
               })
               .addCase(deleteUser.rejected, (state) => {
                    state.deleteUserState = {
                         _id: "",
                         s_name: "",
                         marks: 0,
                         result: false,
                    };
                    state.crudLoading = false;
               })
               .addCase(deleteUser.fulfilled, (state, action) => {
                    state.deleteUserState = action.payload;
                    state.crudLoading = false;
               })
               .addCase(getUser.pending, (state) => {
                    state.crudLoading = true;
               })
               .addCase(getUser.rejected, (state) => {
                    state.getUserState = null;
                    state.crudLoading = false;
               })
               .addCase(getUser.fulfilled, (state, action) => {
                    state.getUserState = action.payload;
                    state.crudLoading = false;
               })
               .addCase(getUserById.pending, (state) => {
                    state.crudLoading = true;
               })
               .addCase(getUserById.rejected, (state) => {
                    state.getUserByIdState = null;
                    state.crudLoading = false;
               })
               .addCase(getUserById.fulfilled, (state, action) => {
                    state.getUserByIdState = action.payload;
                    state.crudLoading = false;
               });
     },
});

export const {
     setVisible,
     setEditUser,
     setSearch,
     setPaginationValues,
     setFilteredUserState,
} = addModalSlice.actions;

export default addModalSlice.reducer;
