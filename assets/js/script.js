// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
     

 //Click Save and Set task to local storage
    
    function saveTask(){
            $('.saveBtn').on("click", function(){
            
            var taskHr = $(this).parent().attr('id');
            var description = $(this).siblings('.description').val();
            localStorage.setItem(taskHr, description);
            //console.log('clicked')
            ;})
            ;}


// Get task and print in corresponding time block
          $('.time-block').each(function() {
          var idVal = $(this).attr('id');
          var taskVal = localStorage.getItem(idVal);
          $(this).children('.description').val(taskVal);
          });
      

    
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
   
    var currentHour = dayjs().format('H');
    console.log(currentHour);

    // On Load Time Block Color 
    function onLoadColor(){
    $('.time-block' ).each(function( index ) {
       var timeID = parseInt(this.id);
        var past = timeID < currentHour;
        var present = timeID == currentHour;
        //var future = timeID > currentHour;    <-- default if does not meet criteria for other two options
       
        if (present){
            $(this).addClass('present');
        }
        else if (past){
            $(this).addClass('past');
        }
        else {
            $(this).addClass('future');
        }
        console.log (present)
        console.log( index + ": " +  parseInt(this.id));
      });
    }
    //Update Time Block Colors
    function updateColor(){
        $('.time-block' ).each(function( index ) {
           var timeID = parseInt(this.id);
            var past = timeID < currentHour;
            var present = timeID == currentHour;
         // var future = timeID > currentHour;   <-- if still in future, does not need to update
           
            if (present){
                $(this).removeClass('future').addClass('present');
            }
            else if (past){
                $(this).removeClass('present').addClass('past');
            }
           
          });
        }

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    // TODO: Add code to display the current date in the header of the page.
    var currentDay = dayjs().format('MMM D, YYYY');
    $('#currentDay').text(currentDay)

    onLoadColor();
    updateColor();
    saveTask();


  });