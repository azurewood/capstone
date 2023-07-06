import { useRef, useEffect } from 'react'

const useCanvas = (draw: any) => {

    const canvasRef = useRef(null)

    function resizeCanvas(canvas:any) {
        const { width, height } = canvas.parentNode.getBoundingClientRect()
        // console.log(width)

        if (canvas.width !== width || canvas.height !== height) {
        //   const { devicePixelRatio:ratio=1 } = window
        const ratio=width/canvas.width
        // console.log(canvas.width,width,ratio)
        //   const context = canvas.getContext('2d')
        //   canvas.width = width*ratio
        //   canvas.height = height*ratio
        // context.scale(ratio, ratio)

        //   console.log(canvas.width,width,ratio)
          return ratio
        }
    
        return 1
      }

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const context = (canvas as HTMLCanvasElement).getContext('2d');
        if (!context)
            return;
        let frameCount = 0
        let animationFrameId: number

        //Our draw came here

        const render = () => {
            frameCount++
            
            const ratio=resizeCanvas(canvas)
          
            // context.scale(ratio,ratio)

            draw(context, frameCount, ratio)
            
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}

export default useCanvas