import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
//setup state 
const initialState = {
  comments: [],
};
export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    add: (state,action) => {
    // setup opject comment 
      let cmt = {
         _id:1,
         _cmt:action.payload.cmt
      }

     // kiểm tra đã có comment nào chưa, nếu có ta setup id bằng chiều dài của mảng + 1
      if(state.comments.length>0) cmt._id = state.comments.length + 1

     // thêm comment vào mảng
      state.comments.push(cmt)
    },
    update: (state, action) => {
       //lấy dữ liệu từ state ra
       let data = state.comments;

       /**
        * ta có thể sử dụng current để console dữ liệu ra xem trước
        */
       console.log(current(data))

       //kiểm tra có _id comment trùng với action.payload._id không, nếu có tiến hành update tại vị trí đó
       data.map(item=>{
         if(item._id===action.payload._id) item._cmt = action.payload._cmt
       })
       // cập nhật lại state.comments kết quả mới
       state.comments = data
    },
    remove: (state,action) =>{
      //kiểm tra xóa _id trong mảng comments, sau đó cập nhật mảng comments lại
      state.comments = state.comments.filter(item=>item._id!=action.payload._id)
    }
  },
});

/*
kết xuất các function add, update, remove
trong Comment.js ta có thể gọi nó, để ta có thể dispatch action
import { add , update , remove , selectComments } from './commentSlice';
 let payload = {
        cmt : body
    }
    dispatch(add(payload))
*/
export const { add, update, remove } = commentSlice.actions;

/* 
lấy giá trị data comments
trong Comment.js ta có thể select nó ra : const data = useSelector(selectComments)
*/
export const selectComments = (state)=> state.comment.comments;
export default commentSlice.reducer;
