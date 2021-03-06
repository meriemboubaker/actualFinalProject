import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const postNewUser = createAsyncThunk('user/postNewUser',async(info,{rejectWithValue})=>{
const formData = new FormData()
const {userInput,fileInput} = info
formData.append('picture',fileInput)
formData.append('info',JSON.stringify(userInput))

console.log(formData)
console.log(Array.from(formData))
try {

 const res = await axios.post('http://localhost:5000/users/register',formData);
    return res.data
    
} catch (error) {
  return rejectWithValue(error.response.data.message);
    
}

});


export const updateUserImage = createAsyncThunk('user/updateUserImage', async (info, { rejectWithValue, dispatch }) => {
 
    try {
      const formData = new FormData();
      console.log(info.file)
    
    formData.append('userImg', info.file) 
      
      console.log(formData)
      const res = await axios.put(`http://localhost:5000/users/updateImage/${info.id}`, formData, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getUsers());
      return res.data;
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);




export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (info, { rejectWithValue, dispatch }) => {
    console.log(info.data)
    try {
      const res = await axios.put(`http://localhost:5000/users/updateUser/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getUsers());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);




export const login = createAsyncThunk('user/login',async(data,{rejectWithValue})=>{


    try {
       const res= await axios.post('http://localhost:5000/users/login',data) ;
       return res.data;
    } catch (error) {
        return rejectWithValue(
            error.response.data.message?
            error.response.data.message:
            error.response.data.errors.password.msg
        
            )
    }
}

)

export const getUsers = createAsyncThunk('user/getUsers',async(info,{rejectWithValue})=>{

    try {

        const res= await axios.get('http://localhost:5000/users/listUsers',{
            headers: { token: localStorage.getItem('token') }
          }) ;
        return res.data
        
    } catch (error) {
        return rejectWithValue(error.response.data.message)
        
    }
}

)



export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id, { rejectWithValue, dispatch }) => {
      try {
        const res = await axios.delete(`http://localhost:5000/users/deleteUser/${id}`, {
          headers: { token: localStorage.getItem('token') },
        });
        return res.data;
        dispatch(getUsers());
       
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );


  export const updateStateUser = createAsyncThunk(
    'user/updateStateUser',
    async (id, { rejectWithValue, dispatch }) => {
      try {
        const res = await axios.put(`http://localhost:5000/users/updateStateUser/${id}`, {}, {
          headers: { token: localStorage.getItem('token') },
        });
        return res.data;
        dispatch(getUsers());
       
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );


  

const userSlice = createSlice({
name :'user',
initialState:{
 
    user:{},
    users:[],
   
    userInfo:JSON.parse(localStorage.getItem('user')),
    loading:false,
   
    token:localStorage.getItem('token'),
    isAuth:Boolean(localStorage.getItem('isAuth')),
    userErrors:null,
},
reducers: {
    logout: (state) => {
      console.log('logout');
      // localStorage.clear();
      state.isAuth = false;
      state.userInfo = {};
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
    },
  },
extraReducers:{
[postNewUser.pending]:(state)=>{
    state.loading=true
},
[postNewUser.fulfilled]:(state,action)=>{

  state.loading=false;
  state.user=action.payload;
  state.userErrors=null;

},
[postNewUser.rejected]:(state, action)=>{
  state.userErrors = action.payload;  
  state.loading = false;
},
[login.pending]:state=>{
    state.loading =true;
},
[login.fulfilled]:(state,action)=>{
console.log(action.payload);
state.userInfo = action.payload.user;
state.token =action.payload.token
state.isAuth = true
state.userErrors = null
localStorage.setItem('token',action.payload.token)
localStorage.setItem('user',JSON.stringify(action.payload.user))
localStorage.setItem('isAuth',true)

},
[login.rejected]:(state,action)=>{
    state.userErrors = action.payload
    state.isAuth=false
},


[getUsers.pending]:state=>{
    state.loading =true;
},
[getUsers.fulfilled]:(state,action)=>{
state.loading=false;
state.users=action.payload;
state.userErrors=null;


},
[getUsers.rejected]:(state,action)=>{
  state.loading=false;
  state.userErrors=action.payload;
},


[deleteUser.pending]:state=>{
    state.loading =true;
  },
  [deleteUser.fulfilled]:(state,action)=>{
  state.loading=false;
  state.user=action.payload;
  state.userErrors=null;
  
  
  },
  [deleteUser.rejected]:(state,action)=>{
  state.loading=false;
  state.userErrors=action.payload;
  },
  [updateUser.pending]:state=>{
    state.loading =true;
  },
  [updateUser.fulfilled]:(state,action)=>{
  state.loading=false;
  state.user=action.payload;
  state.userErrors=null;
  
  
  },
  [updateUser.rejected]:(state,action)=>{
  state.loading=false;
  state.userErrors=action.payload;
  },

  [updateStateUser.pending]:state=>{
    state.loading =true;
  },
  [updateStateUser.fulfilled]:(state,action)=>{
  state.loading=false;
  state.user=action.payload;
  state.userErrors=null;
  
  
  },
  [updateStateUser.rejected]:(state,action)=>{
  state.loading=false;
  state.userErrors=action.payload;
  }

  


}



}

)
export default userSlice.reducer
export const { logout } = userSlice.actions;
