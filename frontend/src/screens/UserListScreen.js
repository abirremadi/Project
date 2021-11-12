import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector((state) => state.userDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listUsers());
      dispatch({
        type: USER_DETAILS_RESET,
      });
    }, [dispatch, successDelete]);
    const deleteHandler = (user) => {
      if (window.confirm('Are you sure?')) {
        dispatch(deleteUser(user._id));
      }
    };
    return (
      <div>
        <div>
        <i class="fa fa-users" ></i>  
        <span className="weight"> Users </span>
         </div>
         <br/>
        {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td>
                  <button
                    type="button"
                    className="small edit"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                   <span> Edit </span>
                  </button>
                  <button
                    type="button"
                    className="small delete"
                    onClick={() => deleteHandler(user)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                   <span> Delete </span>
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }