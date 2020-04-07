import axiosInstance from './../../shared/libs/axios'
export const Users = {
    getusers: (request) => {
        let token = JSON.parse(localStorage.getItem('session')).token;
        if(token !== null) {
            axiosInstance.defaults.headers.common["Authorization"] = token;
            return axiosInstance.get(
                'userList',
                 {...request}
              )     
        }
        
    }
}

export * from './userlist.service'