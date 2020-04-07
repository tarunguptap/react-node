import axiosInstance from './../../shared/libs/axios'
export const Auth = {
    login: (request) => {
        return axiosInstance.post(
          'user/login',
           {...request}
        )
    },

    changepassword: (request) => {
        let token = JSON.parse(localStorage.getItem('session')).token;
        axiosInstance.defaults.headers.common["Authorization"] = token;
        return axiosInstance.post(
            'changepassword',
            {...request}
        )
    }
}

export * from './auth.service'