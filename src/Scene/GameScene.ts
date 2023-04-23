import { Scene } from "./Scene";
import { Game } from "../Main/Game";
import { MyMath } from "../Main/MyMath";
//Gameobjects
import { GameobjectManager } from "../GameObject/GameobjectManager";
import { Gameobject } from "../GameObject/Gameobject";
import { ExampleGameObject } from "../GameObject/ExampleGameObject";
import { Vector } from "../Main/Vector";

class GameScene implements Scene
{
    private game_: Game; //if a function that all scenes need, put it in "Game" and use this reference to access it
    private gom_: GameobjectManager;

    constructor(game: Game) 
    {
        //defaults, just to initialize
        this.game_ = game;
        this.gom_ = new GameobjectManager();
    }

    public Init() 
    {
        const math: MyMath = new MyMath();
        var size: Vector = math.GetCanvasScale(new Vector(16, 9));
        const x = size.x - 20;
        const y = size.y - 20;
        this.Add(new ExampleGameObject("Example", "EX", 0, new Vector(10, 10), new Vector(x, y), "Green"));
    }
    
    public Update(delta_time: number) 
    {
        this.gom_.RemoveDead(); //delete dead objects
        this.gom_.Update(delta_time);
    }

    public Draw(main_ctx: CanvasRenderingContext2D) 
    {
        this.gom_.Draw(main_ctx);
        this.gom_.DelayedDraw(main_ctx);
    }

    public ChangeScene(sceneName: string)
    {
        this.game_.ChangeScene(sceneName);
    }

    public Add(gameobject: Gameobject)
    {
        this.gom_.Add(gameobject);
    }

    public Search(name: string, tag: string, ID: number)
    {
        return this.gom_.Search(name, tag, ID);
    }

    public SearchByName(name: string) : Gameobject | null
    {
        return this.gom_.SearchByName(name);
    }

    public SearchByTag(tag: string) : Gameobject | null
    {
        return this.gom_.SearchByTag(tag);
    }

    public SearchByID(ID: number) : Gameobject | null
    {
        return this.gom_.SearchByID(ID);
    }

    public End()
    {
        this.gom_.Clear(); //remove objects
    }
}

export {GameScene};