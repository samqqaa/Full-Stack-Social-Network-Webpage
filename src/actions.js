import fetch from 'isomorphic-fetch'

//Modified from given code
const url = 'https://webdev-dummy.herokuapp.com'

const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

// const login = () => {
  
//   const username = document.querySelector("#username").value
//   const password = document.querySelector("#password").value
 
//   const box = document.querySelector("#message")
//   return resource('POST', 'login', { username, password })
//     .then(r => resource('GET', 'headlines'))
//     .then(r => {
//       const user = r.headlines[0]
//       box.innerHTML = `you are logged in as ${user.username} "${user.headline}"`
//     })
//     .catch(r => box.innerHTML = `"${r.message || 'Error'}" when logging in`)
// }

// const logout = () => {
//   const box = document.querySelector("#message")
//   return resource('PUT', 'logout')
//     .then(r => box.innerHTML = "You have logged out" )
//     .catch(r => box.innerHTML = `"${r.message}" when logging out` )
// }

export { url, resource }