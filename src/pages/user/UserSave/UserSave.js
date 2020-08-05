import { axiosConfig } from "../../../Axios/Axios";

export const UserSave = (
  username,
  email,
  password,
  phoneNo,
  gender,
  role,
  department,
  township,
  setError,
  setSuccess,
  setData,
  setID
) => {
  let obj = {
    name: username,
    email: email,
    password: password,
    phone: phoneNo,
    gender: gender,
    is_active: "true",
    role_id: role,
    department_id: department,
    township_id: township,
  };
  console.table(obj);
  axiosConfig
    .post("/users", obj)
    .then((response) => {
      setID(response.data.data.id);
      setTimeout(() => {
        setData({
          username: "",
          email: "",
          password: "",
          phoneNo: "",
          gender: "",
          role: "",
          department: "",
          township: "",
          loading: false,
        });
        setSuccess("Successfully");
        setError({
          email: "",
          password: "",
        });
      }, 3000);
    })
    .catch((err) => {
      setTimeout(() => {
        setData({ loading: false });
        setSuccess("");
        setError({
          email: err.response.data.error.email,
          password: err.response.data.error.password,
        });
      }, 3000);
    });
};
