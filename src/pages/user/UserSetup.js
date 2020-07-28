import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import FormSection from "../../components/Form/FormWithSection/FormSection";
import FormControl from "../../components/Form/FormControl/FormControl";
import Input from "../../components/Form/Input/Input";
import Select from "../../components/Form/Input/Select";
import CheckBox from "../../components/Form/Input/Checkbox";
import FormFooter from "../../components/Form/FormFooter/FormFooter";
import Button from "../../components/Form/Button/Button";
import { UserSave } from "./UserSave/UserSave";
import { StudentSave, DoctorSave } from "./StudentSave/Student_Doctor";
import {
  TownShip,
  Role,
  Department,
  Educations,
  Specialities,
  Desiginations,
} from "./GetAxios";
import CSVSetup from "./CSVSetup";
import LoadingModal from "../../modals/LoadingModal";
//import {axiosConfig} from '../../Axios/Axios';

const UserSetup = ({ toggleSidebar }) => {
  const [data, setData] = useState({
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
  const [studentData, setStudentData] = useState({
    role: "",
    education: "",
    specialities: "",
    intership: false,
  });
  const [doctorData, setDoctorData] = useState({
    education: "",
    designation: "",
    specialities: "",
  });
  const [hiddenStudent, setHiddenStudent] = useState(false);
  const [hiddenDoctor, setHiddenDoctor] = useState(false);
  const [click, setClick] = useState(false);
  const [doctorClick, setDoctorClick] = useState(false);
  const [studentClick, setStudentClick] = useState(false);
  const [townships, setTownShips] = useState([]);
  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);
  const [gender, setGender] = useState([]);
  const [educations, setEducations] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [desiginations, setDesiginations] = useState([]);
  const [success, setSuccess] = useState();
  const [ID, setID] = useState();
  const [Error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (click === false) {
      TownShip(townships, setTownShips);
      Role(role, setRole);
      Department(department, setDepartment);
      setGender([
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
      ]);
      Educations(setEducations);
      Specialities(setSpecialities);
      Desiginations(setDesiginations);
    }
  }, []);

  const userChangeHandler = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const studentFormOnChange = (name, value) => {
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const doctorOnChangeHandler = (name, value) => {
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.phoneNo ||
      !data.gender ||
      !data.role ||
      !data.department ||
      !data.township
    ) {
      setClick(true);
      return;
    } else {
      setData({ loading: true });
      UserSave(
        data.username,
        data.email,
        data.password,
        data.phoneNo,
        data.gender,
        data.role,
        data.department,
        data.township,
        townships,
        department,
        role,
        setError,
        setSuccess,
        setData,
        setID
      );
      setClick(false);
    }
  };

  const studentShowCheck = () => {
    setHiddenStudent(!hiddenStudent);
    if (hiddenStudent) {
      setStudentClick(true);
    } else {
      setStudentClick(false);
    }
  };

  const doctorShowCheck = () => {
    setHiddenDoctor(!hiddenDoctor);
    if (hiddenDoctor) {
      setDoctorClick(true);
    } else {
      setDoctorClick(false);
    }
  };

  const doctorFormSave = (e) => {
    e.preventDefault();
    if (
      !doctorData.education ||
      !doctorData.designation ||
      !doctorData.specialities
    ) {
      setDoctorClick(true);
      return;
    } else {
      DoctorSave(ID, doctorData);
      setDoctorData({
        education: "",
        designation: "",
        specialities: "",
      });
    }
  };

  const studentFormSave = (e) => {
    e.preventDefault();
    if (
      !studentData.role ||
      !studentData.education ||
      !studentData.specialities
    ) {
      setStudentClick(true);
      return;
    } else {
      StudentSave(ID, studentData, setStudentData);
    }
  };
  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="User List" />
      <div className="my-1 px-4 lg:p-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/5 lg:px-2">
            <div className="bg-white rounded-lg shadow-lg mb-4">
              <div className="p-4 border-b">
                <h1 className="text-lg">Create New User</h1>
                {Error && (
                  <h1 style={{ color: "red" }}>
                    {Error.email} &nbsp; {Error.password}{" "}
                  </h1>
                )}
                {success && (
                  <h1 style={{ color: "green" }} align="center">
                    {success}
                  </h1>
                )}
              </div>
              {data.loading === true ? <LoadingModal /> : null}
              <form>
                <FormSection sectionTitle="User Information">
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Input
                      className="w-full"
                      type="text"
                      labelText="User Name"
                      value={data.username}
                      click={click}
                      required={data.username ? false : true}
                      onChange={(e) =>
                        userChangeHandler("username", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Input
                      className="w-full"
                      type="email"
                      labelText="Email"
                      value={data.email}
                      click={click}
                      required={data.email ? false : true}
                      onChange={(e) =>
                        userChangeHandler("email", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Input
                      className="w-full"
                      type="password"
                      labelText="Password"
                      value={data.password}
                      click={click}
                      required={data.password ? false : true}
                      onChange={(e) =>
                        userChangeHandler("password", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Input
                      className="w-full"
                      type="text"
                      labelText="Phone Number"
                      value={data.phoneNo}
                      click={click}
                      required={data.phoneNo ? false : true}
                      onChange={(e) =>
                        userChangeHandler("phoneNo", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Gender"
                      value={data.gender}
                      click={click}
                      required={data.gender ? false : true}
                      optionData={gender}
                      onChange={(e) =>
                        userChangeHandler("gender", e.target.value)
                      }
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Role"
                      value={data.role}
                      click={click}
                      required={data.role ? false : true}
                      optionData={role}
                      onChange={(e) =>
                        userChangeHandler("role", e.target.value)
                      }
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Department"
                      value={data.department}
                      click={click}
                      required={data.department ? false : true}
                      optionData={department}
                      onChange={(e) =>
                        userChangeHandler("department", e.target.value)
                      }
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Township"
                      value={data.township}
                      click={click}
                      required={data.township ? false : true}
                      optionData={townships}
                      onChange={(e) =>
                        userChangeHandler("township", e.target.value)
                      }
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormFooter>
                    <Button className="ml-2" type="" onClick={save}>
                      Save
                    </Button>
                  </FormFooter>
                </FormSection>
              </form>
              <div className="flex items-center justify-center p-2">
                <CheckBox
                  name="student"
                  labelText="Student"
                  checked={hiddenStudent}
                  onClick={studentShowCheck}
                />
                <CheckBox
                  name="doctor"
                  labelText="Doctor"
                  checked={hiddenDoctor}
                  onClick={doctorShowCheck}
                />
              </div>
              {/* student form */}
              <form hidden={hiddenStudent ? false : true}>
                <FormSection sectionTitle="Student Information">
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Input
                      className="w-full"
                      type="text"
                      labelText="Roll Number"
                      value={studentData.role}
                      required={studentData.role ? false : true}
                      click={studentClick}
                      onChange={(e) =>
                        studentFormOnChange("role", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Educations"
                      value={studentData.education}
                      required={studentData.education ? false : true}
                      click={studentClick}
                      onChange={(e) =>
                        studentFormOnChange("education", e.target.value)
                      }
                      optionData={educations}
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Specialities"
                      value={studentData.specialities}
                      required={studentData.specialities ? false : true}
                      click={studentClick}
                      onChange={(e) =>
                        studentFormOnChange("specialities", e.target.value)
                      }
                      optionData={specialities}
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <CheckBox
                      name="Intership"
                      labelText="Internship"
                      checked={studentData.intership}
                      onClick={(e) =>
                        studentFormOnChange("intership", e.target.checked)
                      }
                    />
                  </FormControl>
                  <FormFooter>
                    <Button className="ml-2" type="" onClick={studentFormSave}>
                      Save
                    </Button>
                  </FormFooter>
                </FormSection>
              </form>
              {/* doctor form */}
              <form hidden={hiddenDoctor ? false : true}>
                <FormSection sectionTitle="Doctor Information">
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Educations"
                      value={doctorData.education}
                      required={doctorData.education ? false : true}
                      click={doctorClick}
                      onChange={(e) =>
                        doctorOnChangeHandler("education", e.target.value)
                      }
                      optionData={educations}
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Specialities"
                      value={doctorData.specialities}
                      required={doctorData.specialities ? false : true}
                      click={doctorClick}
                      onChange={(e) =>
                        doctorOnChangeHandler("specialities", e.target.value)
                      }
                      optionData={specialities}
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl className="flex-grow md:flex-grow-0">
                    <Select
                      labelText="Designation"
                      value={doctorData.designation}
                      required={doctorData.designation ? false : true}
                      click={doctorClick}
                      onChange={(e) =>
                        doctorOnChangeHandler("designation", e.target.value)
                      }
                      optionData={desiginations}
                      preViewData="Choice"
                      className="w-full"
                    />
                  </FormControl>
                  <FormFooter>
                    <Button className="ml-2" type="" onClick={doctorFormSave}>
                      Save
                    </Button>
                  </FormFooter>
                </FormSection>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-2/5 lg:px-2">
            <CSVSetup />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserSetup;
