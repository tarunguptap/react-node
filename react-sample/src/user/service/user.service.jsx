import axiosInstance from '../../shared/libs/axios'
export const UserService = {
    changepassword: (request) => {
        let token = UserService.getTokenFromStorage();
        const headers = {
            'xlogintoken': token
        };
        return axiosInstance.post(
            'changepassword',
            {...request}, {headers}
        )
    },
    getusers: (request) => {
        let token = JSON.parse(localStorage.getItem('session')).token;
        if(token !== null) {
            axiosInstance.defaults.headers.common["Authorization"] = token;
            return axiosInstance.get(
                'userList',
                 {...request}
              )     
        }
        
    },
    getTokenFromStorage: ()=>{
        return JSON.parse(localStorage.getItem('session')).token;
    }
}

export * from './user.service'