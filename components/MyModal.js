const template = document.createElement('template')
template.innerHTML = `<slot></slot>`

const enterKeyframes = [

]


export default class MyModal extends HTMLElement{

  constructor(){
    super()
  }

  connectedCallback(){
    let shadowRoot = this.attachShadow({mode:'open'})

    // clone the template
    let instance = template.content.cloneNode(true)
    shadowRoot.appendChild(instance)

    // style the modal
    this.style.position = 'fixed';
    
  }
  
  show(){
    this.animate(
      [
        { top: `${-( this.clientHeight + 10 )}px` },
        { top: '0px' }
      ],
      {
        duration: 1000,
        fill:"forwards",
        easing:'ease-in-out'
      }
    )

  }

  hide(){
    this.animate(
      [
        { top: '0px' },
        { top: `${-( this.clientHeight + 10 )}px` }
      ],
      {
        duration: 1000,
        fill: 'forwards',
        easing:'ease-in-out'
      }
    )
  }

}