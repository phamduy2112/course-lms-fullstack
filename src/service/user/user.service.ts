import axiosInstance from "../axios-config"

export const getUser=()=>{
    const token = localStorage.getItem('access_token');

return  axiosInstance.get('/user/profile', {

});

}

export const updateUserDetail=(payload:any)=>{
        const token = localStorage.getItem('access_token');

    return axiosInstance("/user/profile",{
        method:"put",
        data:payload,
    

    },
    
)
}