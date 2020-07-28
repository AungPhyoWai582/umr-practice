import { axiosConfig } from "../../../Axios/Axios";

export const StudentSave = (id,studentData,setStudentData) => {
  const role=studentData.role.toString();
  const intership=studentData.intership.toString();
  let newObj = {
    roll_no:role,
    is_internship:intership,
    user_id:id,
    education_id:studentData.education,
    speciality_id:studentData.specialities,
  }
  axiosConfig.post("/students",newObj).then((response)=>{
    console.table(response.data.data);
    setStudentData({
      role: "",
      education: "",
      specialities: "",
      intership:false,
    });
  }).catch((error)=>{
    console.log(error);
  })
};

export const DoctorSave = (id,doctorData) => {
  let newObj={
    user_id:id,
    education_id:doctorData.education,
    speciality_id:doctorData.specialities,
    designation_id:doctorData.designation
  }
  axiosConfig.post("/doctors",newObj).then(response=>{
    console.log(response.data.data);
  }).catch(error=>{
    console.log(error);
  })
}