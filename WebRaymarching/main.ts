import * as controls from './controls.js'
import { init, render } from './anim.js'

export async function main() {
  await init()
  render()
}

function resize() {
  const canvas = document.querySelector('#glcanvas') as HTMLCanvasElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  main() // bad idea.
}

window.addEventListener('load', main)
window.addEventListener('resize', resize)
window.addEventListener('resize', resize)

window.onmousemove = controls.handleMouseMove
window.onmousedown = controls.handleMouseDown
window.onmouseup = controls.handleMouseUp
window.onscroll = () => window.scroll(0, 0)
window.addEventListener('contextmenu', (e) => e.preventDefault())
window.addEventListener('wheel', controls.handleMouseZoom)
window.addEventListener('keyup', controls.handleKeyUp)
window.addEventListener('keydown', controls.handleKeyDown)
