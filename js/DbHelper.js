export default class DbHelper{

  static get DATA_URL(){
    return '/data/projects.json'
  }

  constructor(){
    
  }

  getProjects(){
    return fetch(DbHelper.DATA_URL)
    // check the response was valid
    .then( response => {
      if( response.status === 200 ){
        return response.json()
      } else {
        throw new Error( `Couldn't fetch projects from ${DbHelper.DATA_URL}: ${response.status}`)
      }
    })
  }
}

