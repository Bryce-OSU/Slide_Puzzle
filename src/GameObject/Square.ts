import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { GameManager } from "./GameManager";

class Square extends Gameobject
{
    private gm_: GameManager;
    private canvas_: Canvas;
    private display_: boolean;
    private img_: HTMLImageElement;
    private texturePosition_: Vector;
    private textureSize_: Vector;
    private currentID_: number
    private targetPosition_: Vector;
    
    constructor(name: string, tag: string, ID: number, position: Vector, size: Vector, 
        img: HTMLImageElement, texturePosition: Vector, textureSize: Vector, gm: GameManager)
    {//Creates an individual square that holds a portion of the puzzle image
        super();
        this.gm_ = gm;
        this.name_ = name;
        this.tag_ = tag;
        this.ID_ = ID;
        this.currentID_ = ID;
        this.position_ = new Vector(position.x, position.y);
        this.targetPosition_ = this.position_;
        this.width_ = size.x;
        this.height_ = size.y;
        this.img_ = img;
        this.texturePosition_ = texturePosition;
        this.textureSize_ = textureSize;
        this.display_ = true;

        this.canvas_ = new Canvas(this.width_, this.height_);

        this.Render();
    }

    public Update(delta_time: number) 
    {
        this.Lerp(delta_time * 10.0);
    }

    public TurnUpdate(turnsPassed: number) 
    {}

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        if (!this.DISPLAY) return;
        main_ctx.drawImage(this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    public Translate(targetPosition: Vector, currentID: number)
    {
        this.targetPosition_ = targetPosition;
        this.currentID_ = currentID; //update the currentID to its new position

        if (<boolean>this.gm_.GetOptions().GetOption("display_outlines")) this.Render();
    }

    private Lerp(time: number)
    {//To smooth out movements
        this.position_.x = (1 - time) * this.position_.x + time * this.targetPosition_.x;
        this.position_.y = (1 - time) * this.position_.y + time * this.targetPosition_.y;
    }

    public Render()
    {
        if (this.canvas_.CONTEXT === null) return;

        this.canvas_.CONTEXT.drawImage(this.img_, this.texturePosition_.x, this.texturePosition_.y, 
            this.textureSize_.x, this.textureSize_.y, 0, 0, this.width_, this.height_);

        if (<boolean>this.gm_.GetOptions().GetOption("display_numbers"))
        {//if display number option is set
            const numberSize: number = <number>this.gm_.GetOptions().GetOption("number_size");
            const numberColor: string = <string>this.gm_.GetOptions().GetOption("number_color");
            this.canvas_.CONTEXT.font = numberSize + "px'MSPゴシック'";
            this.canvas_.CONTEXT.fillStyle = numberColor;
            this.canvas_.CONTEXT.fillText(this.ID_.toString(), 0, numberSize);
        }

        if (<boolean>this.gm_.GetOptions().GetOption("display_outlines") && this.InCorrectPosition())
        {//if display outline option is set
            const outlineSize: number = <number>this.gm_.GetOptions().GetOption("outline_size");
            const outlineColor: string = <string>this.gm_.GetOptions().GetOption("outline_color");
            this.canvas_.CONTEXT.lineWidth = outlineSize;
            this.canvas_.CONTEXT.strokeStyle = outlineColor;
            this.canvas_.CONTEXT.strokeRect(outlineSize / 2, outlineSize / 2, this.width_ - outlineSize, this.height_ - outlineSize);
        }
    }

    public InCorrectPosition(): boolean
    {
        if (this.ID === this.CURRENT_ID) return true;
        return false;
    }

    public get DISPLAY(): boolean {return this.display_;}
    public set DISPLAY(display: boolean) {this.display_ = display;}
    public get CURRENT_ID(): number {return this.currentID_;}
    public set CURRENT_ID(currentID: number) {this.currentID_ = currentID;}
}

export {Square};