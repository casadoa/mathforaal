let table = 6;
let i = 1;
let msg = '';
 

//<script src="/jquery-1.11.0.js"></script>


$(function() {
    let $newOperatorButton = $('.math:button');
    let $minMaxOption = $('#choices');
    let $minText = $('input#min');
    let $maxText = $('input#max');
    let temp = 0;

    console.log($minText);
    console.log($maxText);
    $minMaxOption.on('input', function(e){
        e.preventDefault();
        let minText = $minText.val();
        
        let maxText = $maxText.val();
        if(minText > maxText){  //make sure min bound is always smaller than max even if min entered is larger than max bound
            temp = minText;
            minText = maxText;
            maxText = temp;
            
        }
        
        console.log('min ' + minText);
        console.log('max ' + maxText);
        if(minText.length > 3){
            console.log('hi');
        }
        
    });

    let $tens = $('.num:button');
    //console.log($tens);
    $newOperatorButton.on('click',  function math(){
            let msgOperator = '';
            let expression;
            let operatorArr = ['+', '-', 'x', '/'];
            let operatorRand = Math.floor(Math.random() * 4);
            let operator = $(this).attr("value");
             console.log(operator);
             console.log(operatorArr[operatorRand]);
            if(operator === 'random'){
                operator = operatorArr[operatorRand];
                table = Math.floor(Math.random() * 10 + 1);
            }
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

