let gl : WebGL2RenderingContext

export function main() {
    const canvas = document.querySelector("#glcanvas") as HTMLCanvasElement | null
    if (canvas == null)
        return
    const ctx = canvas.getContext("webgl2")
    if (!ctx)
        return
    gl = ctx
    gl.clearColor(1, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT)
}

window.addEventListener('load', main)
