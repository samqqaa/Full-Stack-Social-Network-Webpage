import fetch from 'isomorphic-fetch'

// const url = 'https://webdev-dummy.herokuapp.com'
// if using backend 
const url = 'http://localhost:3000' 

// The function to communicate to the server
const resource = (method, endpoint, payload, isJson=true) => {
  const options =  {
    method,
    credentials: 'include'
  }
    if (isJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
        options.body = isJson ? JSON.stringify(payload) : payload
    }  
  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        throw new Error(r.statusText)
      }
    })
}


export { url, resource }