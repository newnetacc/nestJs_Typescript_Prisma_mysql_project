
export const BitnobApiCall = (data:object,path:string) :object => {
    const options = {
        method: 'POST',
        url: process.env.BITNOB_API_URL+path,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:" Bearer sk.15dd6.39dfa54d4c74f6343905"
        },
        data:data
    };

    return options
    
}
