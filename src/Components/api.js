import axios from 'axios'
const dataDiri = {
  nama: 'My Name',
  address: 'Somewhere',
  dateOfBirth: 'Sometimes'
}

function createApi () {
  return axios.create({
    baseUrl: 'https://someurl.com/'
  })
}

function data () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      return resolve(dataDiri)
    }, 0)
  })
}


export {
  data
}