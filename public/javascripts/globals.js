//this variable keep the name of the CSS used
  var colorUsers;

// DOM Ready, addd information at the beginning=====================================================
$(document).ready(function(){
    loadMessages();
    // add event on click  addMessage to all the class .addMessage.
    $('.addMessage').on('click', addMessage);
    // add event on click deleteMessage to all the anchors of class deleteMessage
    $('a.deleteMessage').on('click', deleteMessage);
    // add event to changeCSS id anchor
    $('a#changeCSS').on('click',changeCSS);

});
// Functions =============================================================
// Delete Message
function deleteMessage(event) {

    event.preventDefault();
    //save the anchor
    var elementClicked = $(this);
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this message?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        $.ajax({
            type: 'DELETE',
            url: '/messages/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                $("a[rel="+response._id+"]").parent().hide();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });

    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }

}
function addMessage(event) {

    event.preventDefault();
    // get the insert elements
    var userName = $('#selectUserName').val();
    var message =$('#inputMessage').val();
    //create json variable with the data
    var newMessage = {
        'username': userName,
        'message': message,
    };
    $.ajax({
        type: 'POST',
        data: newMessage,
        url: '/messages'
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
          //append the new member
          $( "div#showMessages" ).append(createStringAddMessage(userName,message,response._id));
          //scroll down to end of div showMessages
          $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);
          //make ""input of messages nad focus
          $("#inputMessage").val("");
          $('#inputMessage').focus();
          //add event deleteMessage to the anchor
          $('.deleteMessage').last().on('click', deleteMessage);
          //add color to the new message
          var colornew = getColorFromUsuario(userName);
          $('div.message').last().css( "background", colornew);
      }
      else {
          alert('Error: ' + response.msg);
      }
    });

}
function setRandomInclination(element){

  //generate random number between -7:7
  var numRand = Math.floor(Math.random()*15)-7;
  var rotation = "rotate("+numRand+"deg)";
  //add properties
  $(element).css( "-moz-transform", rotation );
  $(element).css( "-webkit-transform", rotation );
  $(element).css( "-o-transform", rotation );
  $(element).css( "-ms-transform", rotation );
  $(element).css( "transform", rotation );

}

function setZeroInclination(element){
// set not rotation to properties
  var rotation = "rotate(0deg)";

  $(element).css( "-moz-transform", rotation );
  $(element).css( "-webkit-transform", rotation );
  $(element).css( "-o-transform", rotation );
  $(element).css( "-ms-transform", rotation );
  $(element).css( "transform", rotation );

}

function changeCSS(){

  //if we are at chat.css change to postit.css
  if(document.getElementsByTagName('link').item(0).getAttribute('href') === '/stylesheets/chat.css'){
    document.getElementsByTagName('link').item(0).setAttribute('href','/stylesheets/postit.css');
    $( ".post-it" ).each(function(i,element) {
      setRandomInclination(element);
    });
    // console.log($("#showMessages")[0].scrollHeight);
    // $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);

  }else{
    //if we are at postit.css change to chat.css
    document.getElementsByTagName('link').item(0).setAttribute('href','/stylesheets/chat.css');
    $( ".post-it" ).each(function(i,element) {
      setZeroInclination(element);
    });
    // console.log($("#showMessages")[0].scrollHeight);
    // $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);
  }

}

function createStringAddMessage(user, message,_id){
    //generate new HTML code for a new Message
    return "<div class='post-it message "+user+"'>"+
           "<a class='deleteMessage' href='#' rel="+_id+"> x </a>"+
           "<p class='userName'><td>"+user+":</td></p>"+
           "<p class='message'><td>"+message+"</td></p>";
}

function getColorFromUsuario( user){
//check in the json array which colour is related which a user
    for ( var key in colorUsers){
      var obj = colorUsers[key];
      if (obj.username === user)
         return obj.color;
    }

}
function loadUsers(){

    // jQuery AJAX call for JSON
    $.getJSON( '/users', {format: "json"}).done(function( data ) {
        //we save all the colors in an json arry
        colorUsers = data;
        // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
            $('#selectUserName').append("<option value="+this.username+">"+this.username+"</option>");

            $('div.'+this.username).css( "background", this.color);

      });//when finished select the 0

      $('#selectUserName').on('change',function(){
          var hola= this.value;
          var adios =getColorFromUsuario(this.value);
          $(this).parent().css("background", getColorFromUsuario(this.value));
      });

      $('#selectUserName option').eq(0).prop('selected', true);
      $("#selectUserName").trigger("change");

    });

}
function loadMessages(){

    // jQuery AJAX call for JSON
    $.getJSON( '/messages', {format: "json"}).done(function( data ) {
      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
          $( "div#showMessages" ).append(createStringAddMessage(this.username,this.message,this._id));
          //scroll down to end of div showMessages
      });
      // if the CSS we are using is postit, call to setRandomInclination()
      if(document.getElementsByTagName('link').item(0).getAttribute('href') === '/stylesheets/postit.css'){
        $( ".post-it" ).each(function(i,element) {
          setRandomInclination(element);
        });
      }
      // Load the Users, into the select, of select user
      loadUsers();
      $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);

    });

}
