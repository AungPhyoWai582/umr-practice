import {axiosConfig} from '../../Axios/Axios';

export const TownShip = (townships,setTownShips) => {
    axiosConfig.get("/townships").then(response=>{
        setTownShips(response.data.data);
    })
}

export const Role = (role,setRole) => {
    axiosConfig.get("/roles").then(response=>{
        setRole(response.data.data);
    })
}

export const Department= (department,setDepartment) => {
    axiosConfig.get("/departments").then(response=>{
        setDepartment(response.data.data);
    })
}

export const Educations = (setEducations)=>{
    axiosConfig.get("/educations").then(response=>{
        setEducations(response.data.data);
    })
}

export const Specialities = (setSpecialities) => {
    axiosConfig.get("/specialities").then(response=>{
        setSpecialities(response.data.data);
    })
}

export const Desiginations = (setDesiginations) => {
    axiosConfig.get("/designations").then(response=>{
        setDesiginations(response.data.data);
    })
}