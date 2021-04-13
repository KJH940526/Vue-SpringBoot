import axios from 'axios'

export default {
  register (detail) {
    return new Promise((resolve, reject) => {
      console.log('service/registration/index.js')
      console.log(detail)
      axios.post('/registration', detail).then(({ data }) => {
        console.log(data)
        resolve(data)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }
}
