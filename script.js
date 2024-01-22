const n=20;
const array=[];

init();


let audioCtx=null;

function playnote(freq)
{
    if(audioCtx===null)
    {
        audioCtx=new(AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);

    const node=audioCtx.createGain();
    node.gain.value=0.1;
    osc.connect(node);

    node.connect(audioCtx.destination);

}

function init()
{
    for(let i=0;i<n;i++)
    {
        array[i]=Math.random();
    }
    ShowBar();
}


function play()
{
    const copy=[...array];
   const moves= Bubblesort(copy);
   animate(moves);
    
}

function animate(moves)
{
    if(moves.length==0)
    {
        ShowBar();
        return;
    }

    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap")
    {
         [array[i],array[j]]=[array[j],array[i]];
    }
    playnote(200+array[i]*500);
    playnote(200+array[j]*500);
   
    ShowBar(move);
    setTimeout(function(){animate(moves);},200);


}



function Bubblesort(array)
{
    const moves=[];
   do{
       var swapped=false;
       for(let i=0;i<array.length;i++)
      {
        moves.push({indices:[i-1,i],type:"comp"});

         if(array[i-1]>array[i])
         {
             swapped=true;
             moves.push({indices:[i-1,i],type:"swap"});
             [array[i-1],array[i]]=[array[i],array[i-1]];
         }
      }
    }while(swapped);
    return moves;
}





function ShowBar(move)
{
    container.innerHTML="";
    for(let i=0;i<array.length;i++)
    {
       
        const bar=document.createElement("div");
         bar.style.height=array[i]*100+"%";
         bar.classList.add("bar");
         if(move && move.indices.includes(i))
          //ternary operator
          //bar.style.backgroundColor=move.type=="swap"?"red":"green";

         if(move.type=="swap")
         bar.style.backgroundColor="red";
        else
        bar.style.backgroundColor="green";

        
         container.appendChild(bar);
    }

}



