const template = document.createElement('template')
template.innerHTML = `
<style>
  html{
    background-color:green;
  }
  .container{
    width:800px;
    background-color:white;
    font-family: 'Roboto', sans-serif;
  }

  .hero-img{
    width:100%;
  }

  .tags{
    list-style:none;
    padding:0px;

    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 1em;
  }
  .tags li{
    font-weight:bold;
    color: #EE9617;
    margin:0em 1em;
  }

  h2,p{
    width:100%;
    text-align: center;
  }
  h2{
    font-size: 1em;
  }

  .description{
    margin:auto;
    width:80%;
    font-size: 1em;
    color: #8C8C8C;
    padding-bottom:1em;
  }

  .demo-link{
    padding-bottom:2em;
  }
  .demo-link a{
    padding:1em;
    margin:1em;
    color:white;
    background-color:#9AD217;
  }
</style>

<img class="hero-img"></img>
<ul class="tags"></ul>
<h2 class="title"></h2>
<p class="description"></p>
<p class="demo-link"><a target=_blank>Visit Demo</a></p>

`

export default class ProjectCard extends HTMLElement{

  constructor(){
    super()
  }

  render({imageSrc, title, tags, description, demoLink}={}){
    this.shadowRoot.querySelector('.hero-img').src = imageSrc;
    this.shadowRoot.querySelector('.title').innerHTML = title;
    this.shadowRoot.querySelector('.description').innerHTML = description;
    this.shadowRoot.querySelector('.demo-link a').href = demoLink;
    
    let tagList = this.shadowRoot.querySelector('ul.tags');
    tags.forEach((tagString)=>{
      let tag = document.createElement('li');
      tag.innerHTML = tagString;
      tagList.appendChild(tag)
    })
    // do something about the tags
  }

  connectedCallback(){
    let shadowRoot = this.attachShadow({mode:'open'})

    // clone the template
    let instance = template.content.cloneNode(true)
    shadowRoot.appendChild(instance)

    // styling on the container
    this.style.display = 'block';

    // extract values from the attributes
    let imageSrc = this.getAttribute('project-image');
    let title = this.getAttribute('project-title');
    let tags = this.getAttribute('project-tags').split(",");
    let description = this.getAttribute('project-description');
    let demoLink = this.getAttribute('demo-link')

    this.render({imageSrc, title, tags, description, demoLink})
  }

}