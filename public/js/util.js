function isValidInput( name ) { // username + roomname
  return /^[0-9a-zA-Z_.-]+$/.test( name ); 
};

/* args: callback, input, url, feedback, click */
function startInput( callback, input, url, feedback, click ) {

  var typingTimer;                
  var doneTypingInterval = 750;  
  var inputIsValid = false;
  var validInput = '';

  //on keyup, start the countdown
  input.keyup( function( e ){
    clearTimeout( typingTimer );

    if( e.keyCode == 13 || e.which == 13 ) {
      if( inputIsValid ) {
        callback( validInput );
      }
    }

    click.click( function() {
      if( inputIsValid ) {
        callback( validInput );
      }
    });

    if( $( this ).val && $( this ).val().length > 2 ) {
      desiredInput= $( this ).val().toLowerCase();
      typingTimer = setTimeout( function() {
        if( isValidInput( desiredInput ) ) {
          if( desiredInput.length < 18 ) {
            $.get( url+desiredInput, function( valid ) {
              if( valid ) {
                inputIsValid = true;
                feedback( 'valid' );
                validInput = desiredInput;
              } else {
                inputIsValid = false;
                feedback( 'taken' );
              }
            });
          } else {
            inputIsValid = false;
            feedback( 'too_long' );
          }
        } else {
          inputIsValid = false;
          feedback( 'invalid' );
        }
      }, doneTypingInterval);
    }
  });
};
