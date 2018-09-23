$(document).ready(function() {
    var clockstatus={
      insession:true,
      inbreak:false,
      inpause:false
    };  
    Audio.prototype.stop = function()
    {
        this.pause();
        this.currentTime = 0.0;
    }
    var audio = new Audio("https://drive.google.com/uc?export=download&id=1ErJf6TaH0AntVjaUsjpIgMhfl03oLy0i");
    $("#countdown-timer").html($("#session-length").html()+":00");
    
    //Added comment for start button click event
    $("#start").click(function(){
    $("#increase-break-length,#decrease-break-length,#increase-session-length,#decrease-session-length,#start").prop("disabled",true);
      clockstatus.insession=true;
      sessionduration=parseInt($("#session-length").html());
      sessiondurationinseconds=sessionduration*60;
      sessioninterval=setInterval(function(){
          if(sessiondurationinseconds===-1){
            audio.play();
            clearInterval(sessioninterval);
          }
          timer(sessiondurationinseconds);
          sessiondurationinseconds=sessiondurationinseconds-1;
       },1000);
       setTimeout(()=>{
         $("#countdown-text").html("Break");
         clockstatus.insession=false;
         clockstatus.inbreak=true;
         breakduration=parseInt($("#break-length").html());
         breakdurationinseconds=breakduration*60;
         breakinterval=setInterval(function(){
          if(breakdurationinseconds===0){
            audio.play();
            clearInterval(breakinterval);
          }
          timer(breakdurationinseconds);
          breakdurationinseconds=breakdurationinseconds-1;
           },1000);
         },parseInt($("#session-length").html())*60*1000+1000);
    });
    
    //following method is used to show session or break countdown
    function timer(timelength){
          if(timelength%60>=10){
            $("#countdown-timer").html(Math.floor(timelength/60)+":"+timelength%60);
            }
            else{
            $("#countdown-timer").html(Math.floor(timelength/60)+":"+"0"+timelength%60);
           }
       }
      
      //Following method is used to reset the clock
      $("#reset").click(function(){
        console.log("Session: "+clockstatus.insession);
        console.log("Break: "+clockstatus.inbreak);
        if(clockstatus.insession){
          clearInterval(sessioninterval);
        }
        else if(clockstatus.inbreak){
             clearInterval(breakinterval);
           }
        $("#increase-break-length,#decrease-break-length,#increase-session-length,#decrease-session-length,#start").prop("disabled",false);
        $("#break-length").html("5");
        $("#session-length").html("25");
        $("#countdown-text").html("Session");
        $("#countdown-timer").html("25:00");
        audio.stop();
      });
      
      $("#increase-break-length").click(function() {
        $("#break-length").html(parseInt($("#break-length").html())+1);
      });
      
      $("#decrease-break-length").click(function() {
        if (parseInt($("#break-length").html()) > 1) {
          $("#break-length").html(parseInt($("#break-length").html())-1);
        }
      });
    
      $("#increase-session-length").click(function() {
        $("#session-length").html(parseInt($("#session-length").html())+1);
        $("#countdown-timer").html(parseInt($("#session-length").html()) + ":00");
      });
      
      $("#decrease-session-length").click(function() {
        if (parseInt($("#session-length").html()) > 1) {
          $("#session-length").html(parseInt($("#session-length").html())-1);
          $("#countdown-timer").html(parseInt($("#session-length").html())+ ":00");
        }
      });
    });
    
