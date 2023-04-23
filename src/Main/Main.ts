import { Game } from "./Game";
import { MyMath } from "./MyMath";
import { Vector } from "./Vector";

const game_: Game = new Game(); //Scene manager
const math_: MyMath = new MyMath();

//Main canvas, will be used to draw other canvas (like views) - setup in the html file - required
const main_canvas_: HTMLCanvasElement = <HTMLCanvasElement>$("main_canvas");
// const canvasSize: Vector = math_.GetCanvasScale(new Vector(16, 9));
const canvasSize: Vector = new Vector(540, 360);
main_canvas_.width = canvasSize.x;
main_canvas_.height = canvasSize.y;
const main_ctx_: CanvasRenderingContext2D | null= main_canvas_.getContext("2d");

Main();

function Main()
{
    game_.Update(delta_time());
    if (main_ctx_ !== null) 
    {
        main_ctx_.fillStyle = "black"; //set background color
        main_ctx_.fillRect(0, 0, main_canvas_.getBoundingClientRect().width, main_canvas_.getBoundingClientRect().height); //clear the canvas and fill it with black
        game_.Draw(main_ctx_);
    }
    //var t = setTimeout(Main, 16);
    window.requestAnimationFrame(Main);
}

function $(id: string)
{
    return document.getElementById(id);
}

var past = Date.now();
function delta_time()
{
    const now = Date.now(); //Grab the current time in milliseconds
    const delta_time_ = now - past; //subtract the past from now to get the time inbetween loops
    past = now; //set up the past for next iteration
    return delta_time_ / 1000.0; //convert milliseconds to seconds
}