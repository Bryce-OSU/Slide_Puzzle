import { Vector } from "./Vector";

class MyMath
{
    constructor()
    {}

    public GetCanvasScale(ratio: Vector): Vector
    {
        if (window.innerWidth <= window.innerHeight)
        {//Scale using width
            const x = window.innerWidth;
            const y = (x / ratio.x) * ratio.y;
            return new Vector(x, y);
        }
        else 
        {//Scale using height
            const y = window.innerHeight;
            const x = (y / ratio.y) * ratio.x;
            return new Vector(x, y);
        }
    }
}

export {MyMath};