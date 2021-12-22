
//<script src="/jquery-1.11.0.js"></script>

function math2(operator, table){
    console.log(operator.toString() + ' random')
    let i = 1;
    let msg = '';
    let msgOperator = '';
    let expression;
    let operatorArr = ['+', '-', 'x', '/'];
    let operatorRand = Math.floor(Math.random() * 4);
    //operator = $(this).attr("value");
    //operator = operatorArr[operatorRand];
    if(operator === null){
        operator = 'random';
    }
    if(table === null){
        table = 1;
    }
    console.log('table ' + table);
    if(operator === 'random'){
        operator = operatorArr[operatorRand];
    }
    if(operator === '+'){
        msgOperator = String.fromCodePoint(0x002B);
        console.log('inside + in math2')
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
    $("#blackboard").html(msg); 
    if (i == 11) {
        i = 1;
        msg = "";
    }
}
let correct = [];
let wrong = [];
let p = 0;
 let r = 0;


$(function() {
    var table = 1;
    let i = 1;
    let msg = '';
    let $newOperatorButton = $('.math:button');     //rand, +, -, *, / buttons
    let $option = $('#choices');                    //rand, min, max, ownNum, practice button
    let $minText = $('input#min');                  //min input 
    let $maxText = $('input#max');                  //max input
    let $ownNum = $('input#ownNum');                //own number input
    let $arrowButton = $('.arrow:button');          //left and right arrow
    let $practiceButton = $('#practice');           //practice button
    $('.num1:button').hide();                       //hide ones buttons since we don't know which tens will be clicked
    $('#page2').hide();

    $('#return').on('click', function(){
        $('#page1').toggle();
        $('#operator').toggle();
        $('#test').toggle();
        $('#page2').toggle();
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
                math2('+', table);
                break;
            case 'more':
                table++;
                console.log(table);
                $leftRight = $('.after');
                $('.before').empty().append(table);
                math2('+', table);
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
        if(ownText){
            table = ownText;
        }
        else if(minText > maxText){  //make sure min bound is always smaller than max even if min entered is larger than max bound
            temp = minText;
            minText = maxText;
            maxText = temp;
            table = Math.floor(Math.random() * (maxText - minText) + minText); //This value now becomes table to ensure table is between these two numbers
        }
        
        console.log('own num in option ' + ownText);
        console.log('min ' + minText);
        console.log('max ' + maxText);
        //table = ownText;
        if(minText.length > 3 || maxText.length > 3){
            console.log('hi');
            let a = parseInt(minText);
            //maxText.toPrecision(2);
            console.log('min text ' + a);
        }
        
            $('.tens').show("slow");
            $($ownNum).show("slow");
            $($arrowButton).show("slow");
            $($ownNum).show("slow");
        
        math2('random', table);
    });

    let $tens = $('.num:button');
    $tens.on('click', function ten(){
        $('.num1').show();
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
        table = tenClicked;
        math2('+', tenClicked);

        //table = Math.floor(Math.random() * (maxText - minText) + minText); //This value now becomes table to ensure table is between these two numbers

        let ten = $(this).attr("value");        //get the 10's button
        $(this).empty().html(ten);              //making the value the html for the tens button

        let ind = $('.num').index(this);        //finding index so i can see if 1 or the 10,20,30... is clicked
        //console.log('trying to get index ' + ind);
        let $ones = $('.num1:button');
        $ones.on('click', function(){
            let oneClicked = $(this).text();
            $(this).css({
                'background-color': '#' + randomColor,
                'color':  invert
            });  
            table = oneClicked;
            math2('+', table);
        }).each(function(index) {
            let t = ++table;
            let num = $(this).empty().html(t);
            if(ind === 0){
                $('.num1:eq(8)').hide();
                $('.ones').css({
                    'padding-top': '49px'
                });
            } else {
                $('.num1:eq(8)').show();
                $('.ones').css({
                    'padding-top': '22px'
                });
            }
        });
    }).each( function() {
        let ten = $(this).attr("value");
        $(this).empty().html(ten);
    });

    $newOperatorButton.on('click',  function(){
        $('.tens').show("slow");
        $($ownNum).show("slow");
        $($arrowButton).show("slow");
        $($ownNum).show("slow");
        
        let msgOperator = '';
        let expression;
        let operatorArr = ['+', '-', 'x', '/'];
        let operatorRand = Math.floor(Math.random() * 4);
        let operator = $(this).attr("value");
        console.log(operator + ' in newoperatorButton ' + table + ' table');
        if(operator === 'random'){
            operator = operatorArr[operatorRand];
            table = Math.floor(Math.random() * 50 + 1);
        }
        if(operator === '+'){
        //math2('+', table);
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
        $("#blackboard").html(msg); 
        if (i == 11) {
            i = 1;
            msg = "";
        }
    });


    let answerArr = [];
    let practicemsg = '';
    let correctCounter = 0;
function m(){
    
}
    $($practiceButton).on('click', function(){                //once practice is clicked a bunch of hides so we can just get an empty blackboard view
        $('#page1').toggle();
        $('#operator').toggle();
        $('#test').toggle();
        $('#page2').toggle();
        if(correctCounter > 0){
            correctCounter = 0;
        }

        let operatorArr = ['+', '-', 'x', '/'];

        let expression1 = function(left, right){return +left + +right};
        let expression2 = function(left, right){return +left - +right};
        let expression3 = function(left, right){return +left * +right};
        let expression4 = function(left, right){return +left / +right};
        let mg = '';

        for(let i = 0; i < 10; i++){
            answerArr.pop();
        }
        while(i < 11){
           let left = Math.floor(Math.random() *10 + 1);
           let right = Math.floor(Math.random() *10 + 1);
           let operatorRand = Math.floor(Math.random() * 4);
            
           switch(operatorArr[operatorRand]){
               case '+':
                   answerArr.push(expression1(left, right));
                   break;
               case '-':
                   while(Math.sign(left - right) === -1 || (left - right) === 0){
                    left = Math.floor(Math.random() *10 + 1);
                    right = Math.floor(Math.random() *10 + 1);
                   }
                   answerArr.push(expression2(left, right));
                   break;
               case 'x':
                   answerArr.push(expression3(left, right));
                   break;
               case '/':
                   while((left % right) != 0){
                       left = Math.floor(Math.random() *10 + 1);
                       right = Math.floor(Math.random() *10 + 1);
                   }
                   answerArr.push(expression4(left, right));
                   break;
           }
          practicemsg += left + operatorArr[operatorRand] + right + ' = ' + '<br />';
          i++;          
        }
        
        console.log(answerArr);
        let $answer = $('input.answerInput');  
        //let $a1 = $('input#1');                  
        let $a2 = $('input#2');                  
        let $a3 = $('input#3');
        let $a4 = $('input#4');                  
        let $a5 = $('input#5');                  
        let $a6 = $('input#6'); 
        let $a7 = $('input#7');                  
        let $a8 = $('input#8');                  
        let $a9 = $('input#9'); 
        let $a10 = $('input#10'); 
        let aArr = [];
        $('#answer').on('input', function(e){
           e.preventDefault();
           let an1 = $('input#1').val();
           let an2 = $a2.val();
           let an3 = $a3.val();
           let an4 = $a4.val();
           let an5 = $a5.val();
           let an6 = $a6.val();
           let an7 = $a7.val();
           let an8 = $a8.val();
           let an9 = $a9.val();
           let an10 = $a10.val();
           aArr = [an1, an2, an3, an4, an5, an6, an7, an8, an9, an10];
        });

        $('#check').on('click', function compare2(){
            if(correctCounter > 0){
                correctCounter = 0;
            }
            console.log('correct in check ' + correctCounter);
            for(let index = 0; index < 10; index++){
                if(aArr[index] == answerArr[index]){
                    correct.push(aArr);
                    correctCounter++;      
                }
                else{
                    wrong.push(answerArr);
                }
            }
            console.log('answer correct ' + (correctCounter/10)*100 + '%');
            $('#answer').toggle();
            $('#question').html(""); 
            let letter = '';
         
            if((correctCounter/10)*100 == 100){
                letter = 'A+'
            } else if((correctCounter/10)*100 > 89){
                letter = 'A-';
            } else if((correctCounter/10)*100 > 84){
                letter = 'B+';
            } else if((correctCounter/10)*100 > 79){
                letter = 'B-';
            } else if((correctCounter/10)*100 > 74){
                letter = 'C+';
            } else if((correctCounter/10)*100 > 69){
                letter = 'C-'
            } else {
                letter = 'Keep Trying';
            }
            $('#question').html('<h1 class="done">' + (correctCounter/10)*100 + '%' + '<br />' + '<h2 class="saying">' + letter + '</h2>' +  '</h1>');
        });
     $("#question").html(practicemsg); 
        if (i == 11) {
            i = 1;
            practicemsg = "";
        }
     });
});
//var el = document.getElementById('blackboard');
            //el.innerHTML = msg;
