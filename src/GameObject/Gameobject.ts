import { Vector } from "../Main/Vector";

class Gameobject
{
    protected name_: string = "";
    protected tag_: string = "";
    protected ID_: number = 0;
    protected position_: Vector = new Vector(0, 0);
    protected width_: number = 0;
    protected height_: number = 0;

    private isDead_: boolean = false;

    public Update(delta_time: number) {}
    public TurnUpdate(turnsPassed: number) {}
    public Draw(main_ctx: CanvasRenderingContext2D) {}
    public DelayedDraw(main_ctx: CanvasRenderingContext2D) {}
    public Kill() {this.isDead_ = true;}
    public Deconstructor() {}

    set Name(name: string) {this.name_ = name;}
    get Name() {return this.name_;}
    set Tag(tag: string) {this.tag_ = tag;}
    get Tag() {return this.tag_;}
    set ID(ID: number) {this.ID_ = ID;}
    get ID() {return this.ID_;}
    set Dead(isDead: boolean) {this.isDead_ = isDead;}
    get Dead() {return this.isDead_;}
    set Position(position: Vector) {this.position_ = position;}
    get Position() {return this.position_;}
}

export {Gameobject};