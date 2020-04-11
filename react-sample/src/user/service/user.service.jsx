import axiosInstance from '../../shared/libs/axios'
export const UserService = {
    changepassword: (request) => {
        //let token = UserService.getTokenFromStorage();
        //const headers = {'xlogintoken': JSON.parse(localStorage.getItem('session')).token };
        return axiosInstance.put(
            'changepassword',
            {...request}
            //{...request}, {headers}
        )
    },
    getusers: (request) => {
    //axiosInstance.defaults.headers.common["Authorization"] = JSON.parse(localStorage.getItem('session')).token;
        return axiosInstance.get(
            'userList',
            {params: {...request}}
            )     
    },
    getusersempty: (request) => {
            return axiosInstance.get(
                'userListEmpty',
                {params: {...request}}
                )     
        }
}

export * from './user.service'