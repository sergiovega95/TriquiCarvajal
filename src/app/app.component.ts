import { Component, OnInit  } from '@angular/core';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'triqui';
  
  cells:string[]; 
  currentPlayer:string;
  counter:number;
  finishedgame:boolean;
  winningConditions:any = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

  ngOnInit() 
  {
    this.currentPlayer="O";
    this.counter=0;
    this.finishedgame=false;
    this.cells=["", "", "" , "" , "" , "" , "" , "", ""];
  }

  cellclick(event:any)
  {  
      var originalUser=0;     

     if(!this.finishedgame)
     {
       this.counter=this.counter+1;     
      
        if(this.currentPlayer=="X")
        {        
          this.drawcell(event.target.id);
          this.ValidateVictory(event.target.id);
          this.currentPlayer="O";
          originalUser=2;
        }
        else
        {    
          this.drawcell(event.target.id);
          this.ValidateVictory(event.target.id);
          this.currentPlayer="X"; 
          originalUser=1;       
        }

        if(this.finishedgame)
        {        
          
          Swal.fire(
            'Juego Terminado',
            'Ganador Player '+originalUser,
            'success'
          )
        }

     }  
     
     
    
  }

  drawcell(indexcell:number)
  {
    if(this.cells[indexcell]=="")
    {
      this.cells[indexcell]=this.currentPlayer;
    }
  }

  ValidateVictory(index:number)
  {   
     var  finished=false;       
      
      for(var i=0; i<this.winningConditions.length;i++)
      {     
                
        var aux=true;
        
         for(var j=0;j<3;j++)
         {           
            if(this.cells[this.winningConditions[i][j]]!=this.currentPlayer)
            {              
              aux=false;
              break;
            }
         }   
         
         if(aux)
         {
            this.finishedgame=true;
            finished=this.finishedgame;
            
            break;
         }
      } 
      
      return finished;

  }

  RestartGame()
  {
      this.currentPlayer="O";
      this.counter=0;
      this.finishedgame=false;
      this.cells=["", "", "" , "" , "" , "" , "" , "", ""];
  }

}
