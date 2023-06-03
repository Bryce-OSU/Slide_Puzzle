import { Alert } from "../GameObject/Alert";
import { GameScene } from "../Scene/GameScene";
import { Vector } from "./Vector";

class Options
{
    private gameScene_: GameScene;
    private options_: {[key: string]: unknown};
    private elements_: {[key: string]: HTMLInputElement | null};

    constructor(gameScene: GameScene)
    {//Object that holds game options
        this.gameScene_ = gameScene;

        this.options_ = {
            "image_path": "",
            "image_width": 540,
            "image_height": 360,
            "background_color": "#000000",
            "rows": 5,
            "columns": 5,
            "display_numbers": false,
            "number_size": 15,
            "number_color": "#000000",
            "display_outlines": false,
            "outline_size": 15,
            "outline_color": "#000000",
            "display_hint": false,
            "invert_controls": false,
            "random_square": false
        };

        this.elements_ = {
            "background_color": <HTMLInputElement>document.getElementById("background_color_input"),
            "rows": <HTMLInputElement>document.getElementById("row_input"),
            "columns": <HTMLInputElement>document.getElementById("column_input"),
            "display_numbers": <HTMLInputElement>document.getElementById("num_display_input"),
            "number_size": <HTMLInputElement>document.getElementById("num_size_input"),
            "number_color": <HTMLInputElement>document.getElementById("num_color_input"),
            "display_outlines": <HTMLInputElement>document.getElementById("outline_display_input"),
            "outline_size": <HTMLInputElement>document.getElementById("outline_size_input"),
            "outline_color": <HTMLInputElement>document.getElementById("outline_color_input"),
            "display_hint": <HTMLInputElement>document.getElementById("hint_input"),
            "invert_controls": <HTMLInputElement>document.getElementById("invert_controls_input"),
            "random_square": <HTMLInputElement>document.getElementById("random_empty_input")
        };

        const save_button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("save_button");
        if (save_button !== null) save_button.addEventListener("click", this.Save);

        const load_button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("load_button");
        if (load_button !== null) load_button.addEventListener("click", this.Load);
    }

    public GetOption(option_name: string): unknown {return this.options_[option_name];}
    public SetOption(option_name: string, option_value: unknown) {this.options_[option_name] = option_value;}

    public UpdateOptions()
    {
        for (var element_key in this.elements_)
        {
            const element: HTMLInputElement | null = this.elements_[element_key];
            if (element === null) continue;
            if (element.value === "on") this.options_[element_key] = element.checked; // if element is a checkbox
            else if (element.value[0] !== "#") this.options_[element_key] = +element.value; // if element is of type number
            else this.options_[element_key] = element.value; // else element is a string
        }
    }

    private Save = () =>
    {
        // Creating a XHR object
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080";
    
        // open a connection
        xhr.open("POST", url, true);

        // Set the request header i.e. which type of content you are sending
        xhr.setRequestHeader("Content-Type", "application/json");

        // Create a state change callback
        const OnSaveFunction = this.OnSave;
        xhr.onreadystatechange = function(){OnSaveFunction(this);}

        this.UpdateOptions()

        // Converting JSON data to string
        const data = JSON.stringify(this.options_);

        // Sending data with the request
        xhr.send(data);
    }

    private OnSave = (xhr: XMLHttpRequest) =>
    {
        if (xhr.readyState === 4 && xhr.status === 200) 
        {
            console.log(xhr.responseText);
        }
        else if (xhr.status === 0)
        {  
            const canvas_width: number = <number>this.GetOption("image_width");
            const canvas_height: number = <number>this.GetOption("image_height");
            this.gameScene_.Add(new Alert("Feature not currently available", 3, new Vector(canvas_width/2, canvas_height/2), new Vector(400, 50)));
        }
    }

    private Load = async () =>
    {
        // Creating a XHR object
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080";
    
        // open a connection
        xhr.open("POST", url, true);

        // Set the request header i.e. which type of content you are sending
        xhr.setRequestHeader("Content-Type", "text/plain");

        // Create a state change callback
        const OnLoadFunction = this.OnLoad;
        xhr.onreadystatechange = function(){OnLoadFunction(this);}

        const data = "load";

        // Sending data with the request
        xhr.send(data);
    }

    private OnLoad = (xhr: XMLHttpRequest) =>
    {
        if (xhr.readyState === 4 && xhr.status === 200) 
        {
            const options = JSON.parse(JSON.parse(xhr.responseText));

            const background_color_input: HTMLInputElement = <HTMLInputElement>document.getElementById("background_color_input");
            if (background_color_input !== null)  background_color_input.value = options["background_color"];
            const row_input: HTMLInputElement = <HTMLInputElement>document.getElementById("row_input");
            if (row_input !== null)  row_input.value = options["rows"];
            const column_input: HTMLInputElement = <HTMLInputElement>document.getElementById("column_input");
            if (column_input !== null)  column_input.value = options["columns"];
            const num_display_input: HTMLInputElement = <HTMLInputElement>document.getElementById("num_display_input");
            if (num_display_input !== null)  num_display_input.checked = options["display_numbers"];
            const num_size_input: HTMLInputElement = <HTMLInputElement>document.getElementById("num_size_input");
            if (num_size_input !== null)  num_size_input.value = options["number_size"];
            const num_color_input: HTMLInputElement = <HTMLInputElement>document.getElementById("num_color_input");
            if (num_color_input !== null)  num_color_input.value = options["number_color"];
            const outline_display_input: HTMLInputElement = <HTMLInputElement>document.getElementById("outline_display_input");
            if (outline_display_input !== null)  outline_display_input.checked = options["display_outlines"];
            const outline_size_input: HTMLInputElement = <HTMLInputElement>document.getElementById("outline_size_input");
            if (outline_size_input !== null)  outline_size_input.value = options["outline_size"];
            const outline_color_input: HTMLInputElement = <HTMLInputElement>document.getElementById("outline_color_input");
            if (outline_color_input !== null)  outline_color_input.value = options["outline_color"];
            const invert_controls_input: HTMLInputElement = <HTMLInputElement>document.getElementById("invert_controls_input");
            if (invert_controls_input !== null)  invert_controls_input.checked = options["invert_controls"];
            const hint_input: HTMLInputElement = <HTMLInputElement>document.getElementById("hint_input");
            if (hint_input !== null)  hint_input.checked = options["display_hint"];
            const random_empty_input: HTMLInputElement = <HTMLInputElement>document.getElementById("random_empty_input");
            if (random_empty_input !== null)  random_empty_input.checked = options["random_square"];
        }
        else if (xhr.status === 0)
        {
            const canvas_width: number = <number>this.GetOption("image_width");
            const canvas_height: number = <number>this.GetOption("image_height");
            this.gameScene_.Add(new Alert("Feature not currently available", 3, new Vector(canvas_width/2, canvas_height/2), new Vector(400, 50)));
        }
    }
}

export {Options};