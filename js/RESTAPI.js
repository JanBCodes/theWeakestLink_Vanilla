class RESTAPI
{
    getAPIData(endPoint)
    {
        return new Promise((resolve, reject)=>{

            fetch(endPoint)
            .then(response=>response.json())
            .then(jsonObjData=>{
                   
                resolve (jsonObjData);
            })
            .catch(()=>{

                reject();
            });

        })

    }
}

export default RESTAPI;