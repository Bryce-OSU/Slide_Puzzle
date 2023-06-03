import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { GameManager } from "./GameManager";

class Hint extends Gameobject
{
    private gm_: GameManager;
    private canvas_: Canvas;
    private img_: HTMLImageElement;
    private display_: boolean;
    
    constructor(img: HTMLImageElement, position: Vector, gm: GameManager)
    {//Creats hint - just the completed image
        super();
        this.gm_ = gm;
        this.name_ = "Hint";
        this.tag_ = "Hint";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = <number>this.gm_.GetOptions().GetOption("image_width");
        this.height_ = <number>this.gm_.GetOptions().GetOption("image_height");
        this.display_ = false;

        this.canvas_ = new Canvas(this.width_, this.height_);

        this.img_ = img;
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.drawImage(this.img_, 0, 0, this.width_, this.height_);
    }

    public Update(delta_time: number) 
    {}

    public TurnUpdate(turnsPassed: number) 
    {}

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        if (!this.DISPLAY) return;
        main_ctx.drawImage(this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    public get DISPLAY(): boolean {return this.display_;}
    public set DISPLAY(display: boolean) {this.display_ = display;}
}

export {Hint};