import { Canvas } from "../Main/Canvas";
import { Vector } from "../Main/Vector";
import { Gameobject } from "./Gameobject";

class Alert extends Gameobject
{
    private message_: string; //alert message
    private fadeTime_: number; //how long will the alert stay
    private fadeCount_: number;
    private canvas_: Canvas;

    constructor(message: string, fadeTime: number, position: Vector, size: Vector)
    {//Create an alert with the given message at the given position for the given amount of time
        super();
        this.name_ = "Alert";
        this.tag_ = "Alert";
        this.ID_ = 0;
        this.width_ = size.x;
        this.height_ = size.y;
        this.position_ = new Vector(position.x - this.width_ / 2, position.y - this.height_ / 2);

        this.message_ = message;
        this.fadeTime_ = fadeTime;
        this.fadeCount_ = fadeTime;

        this.canvas_ = new Canvas(this.width_, this.height_);
        this.Render(1); //start with max alpha
    }

    public Update(delta_time: number) 
    {
        if (this.canvas_.CONTEXT === null) return;
        this.fadeCount_ -= delta_time;

        this.Render(this.fadeCount_ / this.fadeTime_);

        if (this.fadeCount_ <= 0) this.Kill();
    }

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        main_ctx.drawImage(this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    private Render(alpha: number)
    {
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.clearRect(0, 0, this.width_, this.height_);
        this.canvas_.CONTEXT.globalAlpha = alpha;
        this.canvas_.CONTEXT.font = 20 + "px'MSPゴシック'";
        this.canvas_.CONTEXT.fillStyle = "#ffffff"; //white
        this.canvas_.CONTEXT.strokeStyle = "#000000"; //black
        this.canvas_.CONTEXT.textAlign = "center"; 
        this.canvas_.CONTEXT.fillText(this.message_, this.width_ / 2, this.height_ / 2);
    }
}

export {Alert};