
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
    var table = 71;
    let i = 1;
    let msg = '';
    let $newOperatorButton = $('.math:button');
    let $option = $('#choices');
    let $minText = $('input#min');
    let $maxText = $('input#max');
    let $ownNum = $('input#ownNum');
    let $arrowButton = $('.arrow:button');
    let $practiceButton = $('#practice');
    
    //console.log($minText);
    //console.log($maxText);
    //console.log($ownNum);
    //console.log($arrowButton);
    $practiceButton.on('click', function() {
        $($arrowButton).hide("slow");
        $('.tens').hide("slow");
        $('.test').hide("slow");

    });
    $arrowButton.on('click', function(e){
        e.preventDefault();
        let $leftRight;
        $($leftRight).text('');
        let arrowClick = $(this).attr("value"); 
        
        switch (arrowClick) {
            case 'less':
                table--;
                console.log(table);
                $leftRight = $('.before');
                $('.after').empty().append(table);
                break;
            case 'more':
                table++;
                console.log(table);
                $leftRight = $('.after');
                $('.before').empty().append(table);
                break;
        }
        $($leftRight).empty().html(table);
        
        
            
          }).mouseout(function() {
            $(this).find('p').text('');;
    });

    
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
    //console.log($tens);

    $tens.on('click', function ten(){
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
        let tenClicked = $(this).val();
        console.log('ten clicked ' + tenClicked);
        table = tenClicked;
        console.log('table in tens ' + table);

        let ind = $('.num').index(this);
        console.log('trying to get index ' + ind);

        //table = Math.floor(Math.random() * (maxText - minText) + minText); //This value now becomes table to ensure table is between these two numbers

        let ten = $(this).attr("value");

        $(this).empty().html(ten);

        let $ones = $('.num1:button');
        $ones.each(function(index) {
            let tren = $(this).attr("value");
            let nums = this.value;
            let t = ++table;
            console.log('t ' + table );
            let ap = $(this).empty().html(t);
            if(ind === 0){
                $('.num1:eq(8)').hide();
            } else {
                $('.num1:eq(8)').show();
            }
    
        });
    });

    let $ones = $('.num1:button');
    $tens.each( function() {
        let ten = $(this).attr("value");
        let nums = this.value;
        $(this).empty().html(ten);
    });

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
                table = Math.floor(Math.random() * 50 + 1);
            }
             console.log('table in operator button ' + table);
             if(operator === '+'){
                msgOperator = String.fromCodePoint(0x002B);
                expression = (+table + +i);
                while(i < 11){
                    msg += table + msgOperator + i + ' = ' + (+table + +i) + '<br />';
                    i++; 
                }
            } else if (operator === '-') {
                msgOperator = String.fromCodePoint(0x2212);
                expression = (table - i);
                while(i < 11){
                    msg += table + msgOperator + i + ' = ' + (table - i) + '<br />';
                    i++; 
                }
            } else if (operator === 'x') {
                msgOperator = String.fromCodePoint(0x00D7);
                expression = (table * i);
                while(i < 11){
                    msg += table + msgOperator + i + ' = ' + (table * i) + '<br />';
                    i++; 
                }
            } else if (operator === '/') {
                msgOperator = String.fromCodePoint(0x00F7);
        
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

