jsdom = require ('jsdom');
// Create a fake DOM/jQuery for testing UI components
global.window = jsdom.jsdom().createWindow();
// create a fake DOM
global.document = window.document;
global.$ = require('jquery');

var assert = require("assert"),
  createStringAddMessage = require('./../public/javascripts/globals').createStringAddMessage;

describe('createString', function(){
  describe('#createStringAddMessage()', function(){
    it('should create the DOM to add correctly', function(){
      var domCreated= createStringAddMessage('userTest',"messageTest","12");
      var domExpected="<div class='post-it message userTest'>"+
             "<a class='deleteMessage' href='#' rel=12> x </a>"+
             "<p class='userName'><td>userTest:</td></p>"+
             "<p class='message'><td>messageTest</td></p>";
      // console.log(document);
      assert.equal(domCreated, domExpected);
    });
  });
});
