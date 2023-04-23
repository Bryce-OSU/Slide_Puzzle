import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";

class ExampleGameObject extends Gameobject
{
    private color_: string;
    private canvas_: Canvas;
    
    constructor(name: string, tag: string, ID: number, position: Vector, size: Vector, color?: string)
    {
        super();
        this.name_ = name;
        this.tag_ = tag;
        this.ID_ = ID;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = size.x;
        this.height_ = size.y;
        this.color_ = color === undefined? "#ffffff" : color;

        this.canvas_ = new Canvas(this.width_, this.height_);
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.fillStyle = this.color_;
        this.canvas_.CONTEXT.font = "100px serif";
        this.canvas_.CONTEXT.fillText("WIP", 50, 100);
    }

    public Update(delta_time: number) 
    {}

    public TurnUpdate(turnsPassed: number) 
    {}

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        main_ctx.drawImage(this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }
}

export {ExampleGameObject};