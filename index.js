let table = 6;
let i = 1;
let msg = '';


//<script src="/jquery-1.11.0.js"></script>

$(function() {
    let $newOperatorButton = $('button');
       
    $newOperatorButton.on('click',  function math(){
            let msgOperator = '';
            let expression;
            let operator = $(this).attr("value");
             console.log(operator);
            if(operator === '+'){
                msgOperator = ' + ';
                expression = (table + i);
                while(i < 11){
                    msg += table + msgOperator + i + ' = ' + (table + i) + '<br />';
                    i++; 
                }
            } else if (operator === '-') {
                msgOperator = ' - ';
                expression = (table - i);
                while(i < 11){
                    msg += table + msgOperator + i + ' = ' + (table - i) + '<br />';
                    i++; 
                }
            } else if (operator === 'x') {
                msgOperator = ' x ';
                expression = (table * i);
                while(i < 11){
                    msg += table + msgOperator + i + ' = ' + (table * i) + '<br />';
                    i++; 
                }
            } else if (operator === '/') {
                msgOperator = ' / ';
        
                while(i < 11){
                    if(i < table){
                        let remainder = table % i;
                        if(remainder === 0){
                            msg += table + msgOperator + i + ' = ' + (table / i).toPrecision(1) + '<br />';
                            
                        } else {
                            msg += table + msgOperator + i + ' = ' + Math.floor((table / i).toPrecision(2)) + ' remainder ' + remainder + '<br />';
                       }
                        i++;
                    } else {
                        let remainder = i / table;
                        if(remainder === 0){
                            msg += table + msgOperator + i + ' = ' + (table / i).toPrecision(1) + '<br />';
                        } else {
                            msg += table + msgOperator + i + ' = ' + (table / i).toPrecision(2) + '<br />';
                       }
                        i++; 
                    }
                }
                
            }
            
            //var el = document.getElementById('blackboard');
            //el.innerHTML = msg;
        
        $("#blackboard").html(msg); //jquery equivalent of above expression
     
        if (i == 11) {
            i = 1;
            msg = "";
        }
        }
    );
});

