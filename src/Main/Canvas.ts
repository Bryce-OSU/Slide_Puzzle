class Canvas
{
    private canvas_: HTMLCanvasElement;
    private ctx_: CanvasRenderingContext2D | null;

    constructor(width: number, height: number, ID?: string)
    {
        this.canvas_ = document.createElement("canvas");
        this.canvas_.width = width;
        this.canvas_.height = height;
        this.canvas_.id = ID === undefined? "" : ID;
        this.ctx_ = this.canvas_.getContext("2d");
    }

    get CANVAS(): HTMLCanvasElement {return this.canvas_;}
    get CONTEXT(): CanvasRenderingContext2D | null {return this.ctx_;}
}

export { Canvas };