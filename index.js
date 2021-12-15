let table;
let i = 1;
let msg = '';
 

//<script src="/jquery-1.11.0.js"></script>
/*
function math(operator, table){
    let msgOperator = '';
    let expression;
    let operatorArr = ['+', '-', 'x', '/'];
    let operatorRand = Math.floor(Math.random() * 4);
    operator = $(this).attr("value");
     console.log(operator);
     console.log(operatorArr[operatorRand]);
    if(operator === null){
        operator = 'random';
    }
    if(table === null){
        table = 1;
    }
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
*/
$(function() {
    let $newOperatorButton = $('.math:button');
    let $option = $('#choices');
    let $minText = $('input#min');
    let $maxText = $('input#max');
    let $ownNum = $('input#ownNum');
    let $arrowButton = $('.arrow:button');
    console.log($minText);
    console.log($maxText);
    console.log($ownNum);
    console.log($arrowButton);
    
    $option.on('input', function(e){
        e.preventDefault();
        let temp = 0;               //temp  value just in case min > max bounds

        let ownText = $ownNum.val();
        let minText = $minText.val();
        
        let maxText = $maxText.val();
        if(minText > maxText){  //make sure min bound is always smaller than max even if min entered is larger than max bound
            temp = minText;
            minText = maxText;
            maxText = temp;
            
        }
        table = ownText;
        console.log('own num ' + ownText);
        console.log('min ' + minText);
        console.log('max ' + maxText);
        if(minText.length > 3 || maxText.length > 3){
            console.log('hi');
            let a = parseInt(minText);
            //maxText.toPrecision(2);
            console.log('min text ' + a);

        }
        // add a for loop 10times so the table value changes ten times? in between those values
        //table = Math.floor(Math.random() * (maxText - minText) + minText); //This value now becomes table to ensure table is between these two numbers
    });

    let $tens = $('.num:button');
    console.log($tens);

    $tens.mouseover(function(){
        let randomColor = Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
        
        let invert = invertColor(randomColor);

        function invertColor(hex) {
            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }
            // convert 3-digit hex to 6-digits.
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            if (hex.length !== 6) {
                
                throw new Error('Invalid HEX color.');
                
            }
            // invert color components
            var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
                g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
                b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
            // pad each with zeros and return
            return '#' + padZero(r) + padZero(g) + padZero(b);
        }
        function padZero(str, len) {
            len = len || 2;
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
        }
        $(this).css({
            'background-color': '#' + randomColor,
            'color':  invert
        });  
    });

    $tens.each(function() {
        let temp = 0;
        let nums = this.value;
        console.log(nums);
        //$(this).prepend(temp);
         
        $(this).append(nums);
    });
    //console.log($tens);
    $newOperatorButton.on('click',  function math(){
            let msgOperator = '';
            let expression;
            let operatorArr = ['+', '-', 'x', '/'];
            let operatorRand = Math.floor(Math.random() * 4);
            let operator = $(this).attr("value");
             console.log(operator);
             console.log(operatorArr[operatorRand]);
             console.log('table in operator button ' + table);
            if(operator === 'random'){
                operator = operatorArr[operatorRand];
                table = Math.floor(Math.random() * 50 + 1);
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
                    if(table > 9){
                        if(i < table){
                            let remainder = table % i;
                            if(remainder === 0){
                                msg += table + msgOperator + i + ' = ' + (table / i).toPrecision(2) + '<br />';
                                
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
                    } else {
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

