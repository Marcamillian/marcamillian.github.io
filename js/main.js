import ServiceWorkerHelper from './SwHelper.js';
import DbHelper from './DbHelper.js';

// functions
const emptyHTML = (htmlElement)=>{
  while(htmlElement.children.length > 0){
    htmlElement.children[0].remove()
  }
  return htmlElement
}

const updateUIShow = ()=>{
  console.log("can update UI")
}

const renderProjects = function renderProjects( projectArray ){
  
  projectContainer = emptyHTML(projectContainer);
  
  projectArray.projects.forEach( ({ title, imageSrc, description, tags, demoLink }= {}) =>{
  
    let projectCard = document.createElement('project-card');
    projectCard.setAttribute('project-title', title);
    projectCard.setAttribute('project-image', imageSrc);
    projectCard.setAttribute('project-description', description);
    projectCard.setAttribute('project-tags', tags)
    projectCard.setAttribute('demo-link', demoLink)

    projectContainer.appendChild(projectCard)

  })
}

const showProjects = function showProjects(){
  dbHelper.getProjects()
  .then( renderProjects )
  .catch( console.error ) 
}

// instance vaiables
let projectContainer = document.querySelector('#project-container');
let updateModal = document.querySelector('#update-modal');

//const swHelper = ServiceWorkerHelper('sw.js', updateUIShow)
const dbHelper = new DbHelper

showProjects();

export default {
  showProjects
}


