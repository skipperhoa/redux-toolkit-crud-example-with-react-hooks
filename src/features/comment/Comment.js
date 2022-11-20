import React, { useEffect, useState } from 'react'
import styles from './comment.module.css';
import { add , update , remove , selectComments } from './commentSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Comment() {
  const dispatch = useDispatch();
  const [body,setBody] = useState();

  //select state.comments từ trong commentSlice.js
  const data = useSelector(selectComments)

  //**set state comment edit */
  const [dataEdit,setDataEdit] = useState()

  //check onClick edit
  const [edit,setEdit] = useState(false);
  
  /** add comment **/
  const addComment = ()=>{
    let payload = {
        cmt : body
    }
    dispatch(add(payload))
  }

  /** show modal edit comment **/
  const editComment=(item)=>{
    //set data edit, để hiển dữ liệu ra modal cần chỉnh sửa
    setDataEdit(item);
    //set onClick edit = true, để hiển thị modal cần chỉnh sửa
    setEdit(true);
  }

  /**update comment */
  const updateComment =()=>{
    //btn update nó
    dispatch(update(dataEdit))
    
    //update lại trạng thái, để đóng modal
    setEdit(false);
    setDataEdit({})
  }
  

  /** close modal edit */
  const closeEdit = ()=>{
    setEdit(false);
    setDataEdit({})
  }


  /** delete comment */
  const removeComment = (item)=>dispatch(remove(item));

  return (
    <div className={styles.container}>
        <div className={styles.boxcomment}>
            <label>Body</label>
            <textarea rows={5} cols={5} placeholder="Comment...!" onChange={(e)=>setBody(e.target.value)}></textarea>
            <button onClick={()=>addComment()}>Send Comment</button>
        </div>
        <div className={styles.listComments}>
            <h3>Comments : {data.length} comment</h3>
            <ul>
                {
                     data.length>0 && data.map((item)=>{
                        return (
                          <li key={item._id}>
                            <p className={styles.info}>{item._cmt}</p>
                            <div className={styles.control}>
                                <span onClick={()=>removeComment(item)}>remove</span>
                                <span onClick={()=>editComment(item)}>edit</span>
                            </div>
                          </li>
                        ) 
                     })
                }
            </ul>
        </div>
        <div className={styles.modal} style={{"display":edit?"block":"none"}}>
            
            <label>Edit</label>
            <span className={styles.close} onClick={()=>closeEdit()}>X</span>
            <input type="text" value={dataEdit?._id} />
            <textarea onChange={(e)=>setDataEdit({...dataEdit,_cmt:e.target.value})} value={dataEdit?._cmt}></textarea>
            <button onClick={()=>updateComment()}>Update</button>
        </div>

    </div>
  )
}
