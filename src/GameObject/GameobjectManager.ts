import { Gameobject } from "./Gameobject";

class GameobjectManager
{
    gameobjects_: Gameobject[];
    
    constructor()
    {
        this.gameobjects_ = [];
    }

    Update(delta_time: number)
    {//Update all gameobjects every frame
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].Update(delta_time);
        }
    }

    TurnUpdate(turnsPassed: number)
    {//Update all gameobjects at controlled intervals
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].TurnUpdate(turnsPassed);
        }
    }

    Draw(main_ctx: CanvasRenderingContext2D)
    {//Regular draw phase
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].Draw(main_ctx);
        }
    }

    DelayedDraw(main_ctx: CanvasRenderingContext2D)
    {//Called after the main draw phase, useful for UI
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].DelayedDraw(main_ctx);
        }
    }

    Add(object: Gameobject)
    {
        this.gameobjects_.push(object);
    }

    RemoveDead()
    {
        // for (auto i = gameObjects_.begin(); i != gameObjects_.end(); )
        // {
        //     if ((*i)->IsDead() && (*i)->GetTag() != "Player")
        //     {
        //         delete *i;
        //         i = gameObjects_.erase(i);
        //     }
        //     else i++;
        // }

        for (var i = 0; i < this.gameobjects_.length; )
        {
            if (this.gameobjects_[i].Dead) 
            {
                this.gameobjects_[i].Deconstructor();
                delete this.gameobjects_[i];
                this.gameobjects_.splice(i, 1);
            }
            else i++;
        }
    }

    Search(name: string, tag: string, ID: number)
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].Name === name && this.gameobjects_[i].Tag === tag && this.gameobjects_[i].ID === ID) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByName(name: string): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].Name === name) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByTag(tag: string): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].Tag === tag) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByID(ID: number): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].ID === ID) return this.gameobjects_[i];
        }
        return null;
    }

    Clear()
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].Deconstructor();
        }
        this.gameobjects_ = [];
    }
}

export {GameobjectManager};