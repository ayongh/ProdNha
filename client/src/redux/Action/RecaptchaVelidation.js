import axios from 'axios'

export async function recaptchaValidation(recaptchaToken) {

    var payload = {
        token:recaptchaToken
    }

    try {
        await axios.post('/recaptcha', payload, {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( async res =>{
    
            if(res.status === 200)
            {
                return true
            }
            else
            {
                return false
            }
        }) 
    } catch (error) 
    {
        return Promise.reject(error.response)    
    }
    

}