import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { GameManager } from "./GameManager";

class Background extends Gameobject
{
    private gm_: GameManager;
    private canvas_: Canvas;
    
    constructor(gm: GameManager)
    {//Create background using the background color option
        super();
        this.gm_ = gm;
        this.name_ = "Background";
        this.tag_ = "Background";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = <number>this.gm_.GetOptions().GetOption("image_width");
        this.height_ = <number>this.gm_.GetOptions().GetOption("image_height");

        this.canvas_ = new Canvas(this.width_, this.height_);
        this.Render();
    }

    public Update(delta_time: number) 
    {}

    public TurnUpdate(turnsPassed: number) 
    {}

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        main_ctx.drawImage(this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    public Render()
    {
        if (this.canvas_.CONTEXT === null) return;
        const backgroundColor: string = <string>this.gm_.GetOptions().GetOption("background_color");
        this.canvas_.CONTEXT.fillStyle = backgroundColor;
        this.canvas_.CONTEXT.fillRect(0, 0, this.width_, this.height_);
    }
}

export {Background};