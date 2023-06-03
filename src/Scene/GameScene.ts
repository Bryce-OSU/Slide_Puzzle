import { Scene } from "./Scene";
import { Game } from "../Main/Game";
import { Options } from "../Main/Options";
//Gameobjects
import { GameobjectManager } from "../GameObject/GameobjectManager";
import { Gameobject } from "../GameObject/Gameobject";
import { GameManager } from "../GameObject/GameManager";
import { Vector } from "../Main/Vector";
import { Alert } from "../GameObject/Alert";

class GameScene implements Scene
{
    private game_: Game; //if a function that all scenes need, put it in "Game" and use this reference to access it
    private gom_: GameobjectManager;
    private options_: Options;
    private gm_: GameManager | null;
    private winFlag_: boolean;
    private first_: boolean

    constructor(game: Game) 
    {
        //defaults, just to initialize
        this.game_ = game;
        this.gom_ = new GameobjectManager();
        this.options_ = new Options(this);
        this.gm_ = null;
        this.winFlag_ = false;
        this.first_ = true;

        // Listeners
        this.AddEventListeners();
    }

    public Init() 
    {
        this.winFlag_ = false;
        this.options_.UpdateOptions();

        if (!this.first_ && this.options_.GetOption("image_path") === "")
        {//alert if image isn't selected
            const canvas_width: number = <number>this.GetOptions().GetOption("image_width");
            const canvas_height: number = <number>this.GetOptions().GetOption("image_height");
            this.Add(new Alert("Please select an image first!", 3, new Vector(canvas_width/2, canvas_height/2), new Vector(300, 50)));
        }
        else if (this.first_) this.first_ = false;

        this.gm_ = new GameManager(this);
        this.Add(this.gm_);
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

    public GetOptions(): Options
    {
        return this.options_;
    }

    private ReadImage = (event: Event) =>
    {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files !== null) this.RenderImage(files[0]);
    }

    private RenderImage(file: File)
    {
        const reader: FileReader = new FileReader();
        reader.onload = this.OnReadLoad;
        reader.readAsDataURL(file)
    }

    private OnReadLoad = (event: ProgressEvent<FileReader>) =>
    {
        var imagePath: string | ArrayBuffer | null | undefined = event.target?.result;
        if (typeof imagePath === "string") this.GetOptions().SetOption("image_path", imagePath);
    }

    private AddEventListeners()
    {
        window.addEventListener("keydown", this.KeyDown);

        const file_input: HTMLInputElement = <HTMLInputElement>document.getElementById("file_input");
        if (file_input !== null) file_input.addEventListener("change", this.ReadImage);

        const shuffle_button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("shuffle_button");
        if (shuffle_button !== null) shuffle_button.addEventListener("click", event => this.ChangeScene("Game"));

        const BackgroundFunction = this.BackgroundListener;
        const BackgroundElement: HTMLInputElement = <HTMLInputElement>document.getElementById("background_color_input");
        BackgroundElement.addEventListener("change", function(){BackgroundFunction(this);});

        const DisplayNumbersFunction = this.DisplayNumbersListener;
        const DisplayNumbersElement: HTMLInputElement = <HTMLInputElement>document.getElementById("num_display_input");
        DisplayNumbersElement.addEventListener("change", function(){DisplayNumbersFunction(this);});

        const NumberSizeFunction = this.NumberSizeListener;
        const NumberSizeElement: HTMLInputElement = <HTMLInputElement>document.getElementById("num_size_input");
        NumberSizeElement.addEventListener("change", function(){NumberSizeFunction(this);});

        const NumberColorFunction = this.NumberColorListener;
        const NumberColorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("num_color_input");
        NumberColorElement.addEventListener("change", function(){NumberColorFunction(this);});

        const DisplayOutlinesFunction = this.DisplayOutlinesListener;
        const DisplayOutlinesElement: HTMLInputElement = <HTMLInputElement>document.getElementById("outline_display_input");
        DisplayOutlinesElement.addEventListener("change", function(){DisplayOutlinesFunction(this);});

        const OutlineSizeFunction = this.OutlineSizeListener;
        const OutlineSizeElement: HTMLInputElement = <HTMLInputElement>document.getElementById("outline_size_input");
        OutlineSizeElement.addEventListener("change", function(){OutlineSizeFunction(this);});

        const OutlineColorFunction = this.OutlineColorListener;
        const OutlineColorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("outline_color_input");
        OutlineColorElement.addEventListener("change", function(){OutlineColorFunction(this);});

        const InvertControlsFunction = this.InvertControlsListener;
        const InvertControlsElement: HTMLInputElement = <HTMLInputElement>document.getElementById("invert_controls_input");
        InvertControlsElement.addEventListener("change", function(){InvertControlsFunction(this);});

        const DisplayHintFunction = this.DisplayHintListener;
        const HintElement: HTMLInputElement = <HTMLInputElement>document.getElementById("hint_input");
        HintElement.addEventListener("change", function(){DisplayHintFunction(this);});
    }

    private BackgroundListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("background_color", element.value);
        this.gm_?.RenderBackground();
    }

    private DisplayNumbersListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("display_numbers", element.checked);
        this.gm_?.RenderSquares();
    }

    private NumberSizeListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("number_size", element.value);
        this.gm_?.RenderSquares();
    }

    private NumberColorListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("number_color", element.value);
        this.gm_?.RenderSquares();
    }

    private DisplayOutlinesListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("display_outlines", element.checked);
        this.gm_?.RenderSquares();
    }

    private OutlineSizeListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("outline_size", element.value);
        this.gm_?.RenderSquares();
    }

    private OutlineColorListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("outline_color", element.value);
        this.gm_?.RenderSquares();
    }

    private InvertControlsListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("invert_controls", element.checked);
    }

    private DisplayHintListener = (element: HTMLInputElement) =>
    {
        this.options_.SetOption("display_hint", element.checked);
    }

    private KeyDown = (inputEvent: KeyboardEvent) =>
    {
        if (this.gm_ === null || this.winFlag_) return;
        //prevent the browser from scrolling the page with the arrow keys
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(inputEvent.code) > -1) inputEvent.preventDefault();
        const invert: boolean = <boolean>this.options_.GetOption("invert_controls");
        const hint: boolean = <boolean>this.options_.GetOption("display_hint");
        if (inputEvent.key == "ArrowUp" || inputEvent.key == "w" || inputEvent.key == "i")
        {//Up
            if (invert) this.gm_.Swap(2);
            else this.gm_.Swap(0);
        }
        else if (inputEvent.key == "ArrowLeft" || inputEvent.key == "a" || inputEvent.key == "j")
        {//Left
            if (invert) this.gm_.Swap(3);
            else this.gm_.Swap(1);
        }
        else if (inputEvent.key == "ArrowDown" || inputEvent.key == "s" || inputEvent.key == "k")
        {//Down
            if (invert) this.gm_.Swap(0);
            else this.gm_.Swap(2);
        }
        else if (inputEvent.key == "ArrowRight" || inputEvent.key == "d" || inputEvent.key == "l")
        {//Right
            if (invert) this.gm_.Swap(1);
            else this.gm_.Swap(3);
        }
        else if (hint && inputEvent.shiftKey)
        {//if hints are allowed, press shift to toggle hint off and on
            this.gm_.ToggleHint();
        }

        if (this.gm_.CheckWinCondition()) 
        {
            this.winFlag_ = true;
            this.gm_.OnWinCondition();
        }
    }
}

export {GameScene};