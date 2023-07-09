import React, { useRef, useEffect } from 'react';
import useCanvas from './useCanvas';

const Canvas = (props: any) => {

    const { draw, ...rest } = props
    const canvasRef = useCanvas(draw, 0)

    return (
        <>
            <canvas ref={canvasRef} {...rest} />
        </>
    )
}

export default Canvas