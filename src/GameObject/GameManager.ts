import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { GameScene } from "../Scene/GameScene";
import { Hint } from "./Hint";
import { Options } from "../Main/Options";
import { Square } from "./Square";
import { Background } from "./Background";

class GameManager extends Gameobject
{
    private gameScene_: GameScene;
    private img_: HTMLImageElement;
    private background_: Background | null;
    private squares_: Square[];
    private emptySquare_: Square | null;
    private hint_: Hint | null;
    private columns_: number;
    private rows_: number;

    constructor(gameScene: GameScene)
    {//Game manager - Controlls game setup and movements
        super();
        this.name_ = "GameManager";
        this.tag_ = "GM";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = 0;
        this.height_ = 0;
        this.gameScene_ = gameScene;
        this.columns_ = <number>this.GetOptions().GetOption("columns");
        this.rows_ = <number>this.GetOptions().GetOption("rows");

        this.background_ = null;
        this.squares_ = [];
        this.emptySquare_ = null;
        this.hint_ = null;

        this.img_ = new Image();
        this.img_.src = <string>this.GetOptions().GetOption("image_path");
        this.img_.onload = this.OnImgLoad;
    }

    public GetOptions(): Options
    {
        return this.gameScene_.GetOptions()
    }

    public RenderBackground()
    {
        this.background_?.Render();
    }

    public RenderSquares()
    {
        for (var i = 0; i < this.squares_.length; i++)
        {
            this.squares_[i].Render();
        }
    }

    private OnImgLoad = () =>
    {//Once the image loads
        this.SetSize();
        this.SetBackground();
        this.SetSquares();
        this.AddHint();
        this.Shuffle();
    }

    private SetSize()
    {//Set image and square size depending on window size
        const textureWidth = this.img_.naturalWidth;
        const textureHeight = this.img_.naturalHeight;
        var imageWidth = textureWidth;
        var imageHeight = textureHeight; 

        if (window.innerWidth < textureWidth || window.innerHeight < textureHeight) 
        {//if the natual width or height of the image is greater then the windows width or height, resize the image
            if (window.innerWidth <= window.innerHeight)
            {//is the browser window smaller then the browser height?
                imageWidth = window.innerWidth; //set the image width to the browser width
                imageHeight = Math.floor(textureHeight / (textureWidth / imageWidth)); //scale the image height to match the width
            }
            else
            {//or is the browser window bigger then the browser height?
                imageHeight = window.innerHeight; //set the image height to the browser height
                imageWidth = Math.floor(textureWidth / (textureHeight / imageHeight)); //scale the image width to match the height
            }
        }
        const squareWidth: number = Math.floor(imageWidth / this.columns_);
		const squareHeight: number = Math.floor(imageHeight / this.rows_);

        this.GetOptions().SetOption("image_width", imageWidth);
        this.GetOptions().SetOption("image_height", imageHeight);
        const main_canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("main_canvas");
        main_canvas.width = squareWidth * this.columns_;
        main_canvas.height = squareHeight * this.rows_;
    }

    private SetBackground()
    {
        this.background_ = new Background(this);
        this.gameScene_.Add(this.background_);
    }

    private SetSquares()
    {//create the square objects and pass them to the manager
        const squareWidth: number = Math.floor(<number>this.GetOptions().GetOption("image_width") / this.columns_);
		const squareHeight: number = Math.floor(<number>this.GetOptions().GetOption("image_height") / this.rows_);

        //if the random empty square setting is set, randomize the empty square location
        var emptySquareID: number = 0;
        if (<boolean>this.GetOptions().GetOption("random_square")) emptySquareID = Math.floor(Math.random() * (this.columns_ * this.rows_ - 1));
        else emptySquareID = this.columns_ * this.rows_ - 1; //else the empty square location is set to the bottom right corner

        var squareNum = 0; //used to set IDs
        for (var y = 0; y < this.rows_; y++)
        {
            for (var x = 0; x < this.columns_; x++)
            {//make square objects
                this.squares_.push(new Square("Square", "Square", squareNum, 
                new Vector(squareWidth*x, squareHeight*y), new Vector(squareWidth, squareHeight), 
                this.img_, new Vector(this.img_.naturalWidth/this.columns_*x, this.img_.naturalHeight/this.rows_*y), 
                new Vector(this.img_.naturalWidth/this.columns_, this.img_.naturalHeight/this.rows_), this))

                if (emptySquareID === squareNum) 
                {
                    this.emptySquare_ = this.squares_[squareNum];
                    this.emptySquare_.DISPLAY = false;
                }

                this.gameScene_.Add(this.squares_[squareNum]);
                squareNum++;
            }
        }
    }

    private AddHint()
    {
        this.hint_ = new Hint(this.img_, new Vector(0, 0), this);
        this.gameScene_.Add(this.hint_);
    }

    public ToggleHint()
    {
        if (this.hint_ === null) return;

        if (this.hint_.DISPLAY) this.hint_.DISPLAY = false;
        else this.hint_.DISPLAY = true;
    }

    private Shuffle()
    {//Shuffle the board
        for (var i = 0; i < 100 * this.columns_ * this.rows_; i++)
        {
            var rand = Math.floor(Math.random() * 4); //random direction
            this.Swap(rand);
        }
    }
    
    public Swap(direction: number)
    {//swaps one object with the empty square object
        if (this.emptySquare_ === null) return;
        var target: Square | null = null; //this will be the target object that will be swaped with the empty square
        switch (direction)
        {//set target
            case 0: //Down
            console.log(typeof this.columns_);
            if (this.emptySquare_.CURRENT_ID < this.columns_ * (this.rows_ - 1)) target = this.SearchByCurrentID(this.emptySquare_.CURRENT_ID + this.columns_);
            break;

            case 1: //Right
            if (this.emptySquare_.CURRENT_ID % this.columns_ !== (this.columns_ - 1)) target = this.SearchByCurrentID(this.emptySquare_.CURRENT_ID + 1);
            break;

            case 2: //Up
            if (this.emptySquare_.CURRENT_ID > this.columns_ - 1) target = this.SearchByCurrentID(this.emptySquare_.CURRENT_ID - this.columns_);
            break;

            case 3: //Left
            if (this.emptySquare_.CURRENT_ID % this.columns_ !== 0) target = this.SearchByCurrentID(this.emptySquare_.CURRENT_ID - 1);
            break;
        }
        
        if (target === null) return; //if the target object somehow dosen't exist exit the function
        var tempTag = this.emptySquare_.CURRENT_ID; //temp hold for empty square tag
        const squareWidth: number = Math.floor(<number>this.GetOptions().GetOption("image_width") / this.columns_);
		const squareHeight: number = Math.floor(<number>this.GetOptions().GetOption("image_height") / this.rows_);
        this.emptySquare_.Translate(new Vector(target.CURRENT_ID % this.columns_ * squareWidth, Math.floor(target.CURRENT_ID / this.columns_) * squareHeight), target.CURRENT_ID); //move empty square
        target.Translate(new Vector(tempTag % this.columns_ * squareWidth, Math.floor(tempTag / this.columns_) * squareHeight), tempTag); //move target
    }

    private SearchByCurrentID(currentID: number): Square | null
    {
        for (var i = 0; i < this.squares_.length; i++)
        {
            if (this.squares_[i].CURRENT_ID === currentID) return this.squares_[i]
        }
        return null;
    }

    public CheckWinCondition(): boolean
    {
        for (var i = 0; i < this.squares_.length; i++)
        {
            if (!this.squares_[i].InCorrectPosition()) return false;
        }
        return true;
    }

    public OnWinCondition()
    {
        this.GetOptions().SetOption("display_numbers", false);
        this.GetOptions().SetOption("display_outlines", false);
        if (this.emptySquare_ !== null) this.emptySquare_.DISPLAY = true;
        this.RenderSquares();
    }
}

export { GameManager };