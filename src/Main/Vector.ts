class Vector
{
    public x_: number;
    public y_: number;

    constructor(x: number, y: number)
    {
        this.x_ = x;
        this.y_ = y;
    }

    public set x(value: number) {this.x_ = value;}
    public get x() {return this.x_;}
    public set y(value: number) {this.y_ = value;}
    public get y() {return this.y_;}
}

export {Vector};