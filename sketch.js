var database;
//var name,score,HK;
var input, button;
var score = 0;
var clickButton;

function setup(){
    var canvas = createCanvas(200,200);
  //  canvas.parent("game");
    database = firebase.database();
   // console.log(firebase);

    clickButton = createButton("Click Me!!");
    input = createInput("name");
    button = createButton("push to DB!!");
    button.mousePressed(submitInDb);
    clickButton.mousePressed(function(){
       
        textSize(50);
         text(score,50,50);
         score++;
    }) 
   retrieve();
}

function draw(){
    background(0);
    
  //  console.log(score);
}
function submitInDb(){
    var data ={
        input:input.value(),
        score:score
    }
  //  console.log(data);
    var db = database.ref("scores");
    
    db.push(data)
}
function retrieve(){

    
    database.ref("scores").on("value",function(data){
    
        var list = selectAll(".list");
        for (var i=0;i<list.length;i++){
             list[i].remove();
        }
    
        scores=data.val();
       // console.log(scores);
       var keys = Object.keys(scores);
       // console.log(keys);
        for(var i =0;i<keys.length;i++){
            var k = keys[i];
            var initials = scores[k].input;
            var score = scores[k].score;
           // console.log(initials,score);
           var li= createElement("li",initials +": "+score);
        //   li.position(10,400);
           li.class('list');
      // li.parent('scorelist');
        }
        
    })
}