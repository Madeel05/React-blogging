import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { localRequest } from "../axiosRequestFunc";
import { Alert } from "../components/Alert";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await localRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    Alert('WARNING', `Not Login`, 'warning');
  }
};