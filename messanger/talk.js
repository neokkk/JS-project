$('#send').on('click', sendMessage);

function sendMessage(){
    
    let $myChat = $('textarea').val();
    const inputMyChat = '<div class="my-bubble bubble">' + $myChat + '</div>';
    
    if($myChat !== ''){
        $('.chatbox').append(inputMyChat);
    }
    $('textarea').val('');
}