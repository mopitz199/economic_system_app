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
        return res.json().then((data) => {
          onServerError(data)
        })
      }
      else if(res.status<=299 && res.status>=200){
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