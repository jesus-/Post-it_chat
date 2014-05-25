//this variable keep the name of the CSS used
  var colorUsers;

// DOM Ready =============================================================
$(document).ready(function(){

    $('.addMessage').on('click', addMessage);
    $('.deleteMessage').on('click', deleteMessage);
    $('a#changeCSS').on('click',changeCSS);
    // var offsestLast = $('.message').last().offset().top;
    // console.log('offsetlast'+offsestLast);
    // console.log($("#showMessages")[0].scrollHeight);
    // $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);
    // $( "#target" ).scroll();

    $("div.message").addClass(function( index, currentClass ) {
            var name =$(this).find('p.userName').text();
            return name;
            });
    // Load the Users, have to be after naming the messages by class user
    loadUsers();
    if(document.getElementsByTagName('link').item(0).getAttribute('href') === '/stylesheets/postit.css'){
      $( ".post-it" ).each(function(i,element) {
        setRandomInclination(element);
      });
    }
    // window.scrollTo(0, $(".message").last().offset().top);


    // $('#selectUserName').on('change',function(){
    //     $(this).css("background", getColorFromUsuario(this.value));
    //     $('#inputMessage').css("background", getColorFromUsuario(this.value));
    // });
    // $('#selectUserName').on('change',function(){
    //     $(this).parent().css("background", getColorFromUsuario(this.value));
    // });
//    $('#selectUserName')[0].attr('selected', 'selected');
// var userSelect=$('#selectUserName').val();


    //-add rotation to post-it
    // nameCSS =document.getElementsByTagName('link').item(0).getAttribute('href');

    // if(nameCSS !== '/stylesheets/chat.css'){
    //   $( ".post-it" ).each(function(i,element) {
    //     andomInclination(element);
    //   });
    // }

});
// Functions =============================================================
// Delete Message
function deleteMessage(event) {

    event.preventDefault();
    var elementClicked = $(this);
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this message?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete hiding change it in the response...
    //    elementClicked.parent().hide();
        // If they did, do our delete calling the route
        $.ajax({
            type: 'DELETE',
            url: '/deletemessage/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                $("a[rel="+response._id+"]").parent().hide();

              //    elementClicked.parent().hide();
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
    var userName = $('#selectUserName').val();
    var message =$('#inputMessage').val();
          // If it is, compile all user info into one object
        var newMessage = {
            // 'username': $('#inputUserName').val(),
            // 'message': $('#inputMessage').val(),
            'username': userName,
            'message': message,
        };
    // If they did, do our delete
    $.ajax({
        type: 'POST',
        data: newMessage,
        url: '/addmessage'
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

          // colorUsers
        }
        else {
            alert('Error: ' + response.msg);
        }


    //   location.reload();


    });

}
function setRandomInclination(element){
  var numRand = Math.floor(Math.random()*15)-7;//number between -7:7
//  logo.style.webkitTransform = "rotate("+deg+"deg)";
  var rotation = "rotate("+numRand+"deg)";

  $(element).css( "-moz-transform", rotation );
  $(element).css( "-webkit-transform", rotation );
  $(element).css( "-o-transform", rotation );
  $(element).css( "-ms-transform", rotation );
  $(element).css( "transform", rotation );

}
function setZeroInclination(element){
//  logo.style.webkitTransform = "rotate("+deg+"deg)";
  var rotation = "rotate(0deg)";

  $(element).css( "-moz-transform", rotation );
  $(element).css( "-webkit-transform", rotation );
  $(element).css( "-o-transform", rotation );
  $(element).css( "-ms-transform", rotation );
  $(element).css( "transform", rotation );

}

function changeCSS(){
  if(document.getElementsByTagName('link').item(0).getAttribute('href') === '/stylesheets/chat.css'){
    document.getElementsByTagName('link').item(0).setAttribute('href','/stylesheets/postit.css');
    $( ".post-it" ).each(function(i,element) {
      setRandomInclination(element);
    });
    console.log($("#showMessages")[0].scrollHeight);
    $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);

  }else{
    document.getElementsByTagName('link').item(0).setAttribute('href','/stylesheets/chat.css');
    $( ".post-it" ).each(function(i,element) {
      setZeroInclination(element);
    });
    // console.log($("#showMessages")[0].scrollHeight);
    // $("#showMessages").scrollTop($("#showMessages")[0].scrollHeight);
var container = $('#showMessages'), scrollTo = $('.message').last();

container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());

  }
  //  nameCSS =document.getElementsByTagName('link').item(0).getAttribute('href');
}

function createStringAddMessage(user, message,_id){

    return "<div class='post-it message "+user+"'>"+
           "<a class='deleteMessage' href='#' rel="+_id+"> x </a>"+
           "<p class='userName'><td>"+user+":</td></p>"+
           "<p class='message'><td>"+message+":</td></p>";
}
function loadUsers(){

    // jQuery AJAX call for JSON
    $.getJSON( '/users', {format: "json"}).done(function( data ) {

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


        // Inject the whole content string into our existing HTML table
}
function getColorFromUsuario( user){
    for ( var key in colorUsers){
         var obj = colorUsers[key];
        if (obj.username === user)
          return obj.color;
    }

}
