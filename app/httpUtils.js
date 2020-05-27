export function customFetch({
  url,
  request=null,
  onServerError,
  onSuccess,
  onError,
}){
  return fetch(url, request)
    .then((res) => {
      if(res.status>=500){
        onServerError()
      }
      else if(res.status==201){
        return res.json().then((data) => {
          onSuccess(data)
        })
      }else{
        return res.json().then((data) => {
          onError(data)
        })
      }
    })
}