$(function() {
    let table = 1;                                  //left side number
    let tableRight = 1;                             //right side number
    let i = 1, j = 0;
    let m = [];
    let msg = '';
    let $newOperatorButton = $('.math:button');     //rand, +, -, *, / buttons
    let $option = $('#choices');                    //rand, min, max, ownNum, practice button
    let $minText = $('input#min');                  //min input 
    let $maxText = $('input#max');                  //max input
    let $ownNum = $('input#ownNum');                //own number input
    let $arrowButton = $('.arrow:button');          //left and right arrow
    let $practiceButton = $('#practice');           //practice button
    let $ones = $('.num1:button');                  //single button
    let $tens = $('.num:button');                   //tens button left side
    let $tensRight = $('.rOperand');                //right side tens button to switch right side operand
    $('.num1:button').hide();                       //hide ones buttons since we don't know which tens will be clicked
    $('#page2').hide();
    $($ones).hide();
    let $rOperand = $('.num2:button');

    let correct = [];
    let wrong = [];
    let leftTable = [];
    let rightTable = [];
    let operatorChosen = [];
    let temp;
    let l, r;                                       //left and right side number
function math3(operator, left, right){
    let msg = '';
    let msgOperator = '';
    let expression;
    let operatorArr = ['+', '-', 'x', '/'];
    let operatorRand = Math.floor(Math.random() * 4);
    if(!m[0]){
        j = 0;
    }
    j = right;
    left = l;
    temper = j;
    operatorChosen.push(operator);
    console.log('operator chosen  ' + operatorChosen);


    if(operator === null){
        operator = 'random';
    }
    if(table === null){
        table = 1;
    }
    if(operator === 'random'){
        operator = operatorArr[operatorRand];
    }
    if(operator === '+'){
        msgOperator = String.fromCodePoint(0x002B);
        expression = (+table + +j);

        console.log(left + ' + ' + right + ' = ' + (+left+ +right));
        while(i < 11){
            msg += left + msgOperator + right + ' = ' + (+left + +right) + '<br />';
            right++; 
            i++
        }
    } else if (operator === '-') {
        msgOperator = String.fromCodePoint(0x2212);
        expression = (table - j);
        console.log(left + ' - ' + right + ' = ' + (left-right));
        while(i < 11){
            msg += left + msgOperator + right + ' = ' + (left - right) + '<br />';
            right++; 
            i++;
        }
    } else if (operator === 'x') {
        msgOperator = String.fromCodePoint(0x00D7);
        expression = (table * j);

        console.log(left + ' + ' + right + ' = ' + (left*right));
        while(i < 11){
            msg += left + msgOperator + right + ' = ' + (left * right) + '<br />';
            right++; 
            i++
        }
    } else if (operator === '/') {
        msgOperator = String.fromCodePoint(0x00F7);

        console.log(left + ' ' + right + ' ' + (left/right));
        while(i < 11){
            if(table > 9){
                if(j < table){
                    let remainder = table % j;
                    if(remainder === 0){
                        msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(2) + '<br />';
                        
                    } else {
                        msg += table + msgOperator + j + ' = ' + Math.floor((table / j).toPrecision(2)) + ' remainder ' + remainder + '<br />';
                   }
                } else {
                    let remainder = j / table;
                    if(remainder === 0){
                        msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(1) + '<br />';
                    } else {
                        msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(2) + '<br />';
                   }
                }
            } else {
                if(j < table){
                let remainder = table % j;
                if(remainder === 0){
                    msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(1) + '<br />';
                    
                } else {
                    msg += table + msgOperator + j + ' = ' + Math.floor((table / j).toPrecision(2)) + ' remainder ' + remainder + '<br />';
               }
            } else {
                let remainder = j / table;
                if(remainder === 0){
                    msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(1) + '<br />';
                } else {
                    msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(2) + '<br />';
               }
            }
            }
            j++
            i++;
        }
    }
    $("#blackboard").html(msg); 
    if (i == 11) {
        i = 1;
        msg = "";
    }
    operatorChosen.pop();
}
    $('#return').on('click', function(){
        $('#page1').toggle();
        $('#operator').toggle();
        $('#test').toggle();
        $('#page2').toggle();
    });
    /*
    $arrowButton.on('click', function(e){
        e.preventDefault();
        let $leftRight;
        $($leftRight).text('');
        let arrowClick = $(this).attr("value"); 
        console.log(j + ' j');
        switch (arrowClick) {
            case 'less':
                table--;
                console.log(table);
                $leftRight = $('.before');
                $('.after').empty().append(table);
                math2('+', table, j);
                break;
            case 'more':
                table++;
                console.log(table);
                $leftRight = $('.after');
                $('.before').empty().append(table);
                math2('+', table, j);
                break;
        }
        $($leftRight).empty().html(table);
    }).mouseout(function() {
            $(this).find('p').text('');;
    });
    */
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
        j = 0;
        math2('random', table);
    });
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
   
    $tens.on('click', function ten(){
        $($ones).show();
       
        let randomColor = Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
        
        let invert = invertColor(randomColor);
        $(this).css({
            'background-color': '#' + randomColor,
            'color':  invert
        });  
        let tenClicked = $(this).val();
        table = tenClicked;
        
        l = tenClicked;
        if(leftTable.length > 0){
            leftTable.pop();
        }
leftTable.push(l);
        if(!r){
    r = 0;
}
        let ten = $(this).attr("value");        //get the 10's button
        $(this).empty().html(ten);              //making the value the html for the tens button
        let tenIndex = $('.num').index(this);  
leftTable.push(l);
l = leftTable[0];

r = rightTable[0];
        //math3('/', l, r);
        if(leftTable.length > 0){
            leftTable.pop();
        }
        let ind = $('.num').index(this);        //finding index so i can see if 1 or the 10,20,30... is clicked
        
        $ones.on('click', function(){
            let oneClicked = $(this).text();
            $(this).css({
                'background-color': '#' + randomColor,
                'color':  invert
            });  
            table = oneClicked;
            r = rightTable[0];
            l = oneClicked;
            if(leftTable.length > 0){
                leftTable.pop();
            }
leftTable.push(l);
            l = leftTable[0];
            //math3('/', l, r);
        }).each(function() {
            let t = ++table;
            $(this).empty().text(t);
            if(ind === 0){
                $('.num1:eq(8)').hide();
                $('.ones').css({
                    'padding-top': '60px'
                });
            } else {
                $('.num1:eq(8)').show();
                $('.ones').css({
                    'padding-top': '22px'
                });
            }
        });
        
    }).each(function() {
        let ten = $(this).attr("value");
        $(this).empty().html(ten);
    });

    $rOperand.on('click', function(){

        let randomColor = Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
        
        let rightClicked = $(this).text();
        j = rightClicked;
        r = rightClicked;
    //    console.log('lllll' + l);
        if(!l)
{
    l = 1;
}   
    //    console.log('ll' + l);
        if(leftTable.length == 0){
            leftTable.push(1);
            //l = 1;
        }
        while(m.length > 0){
            m.pop();
        }
        m.push(j);
        let te = leftTable[0];
        if(rightTable.length > 0){
            rightTable.pop();
        }
rightTable.push(r);
        r = rightTable[0];
        l = leftTable[0]
      // console.log('left table in right operand ' + leftTable[0]);
      // console.log('m array   ' + m);
       // console.log(te);
        console.log('left ' + l + ' right ' + r);
        let o = operatorChosen[0];
        //math3('+', l, r);

        let invert = invertColor(randomColor);

        $(this).css({
            'background-color': '#' + randomColor,
            'color':  invert
        }); 
    });

    let mat = {
        add: function (left, right) {
            let result = NaN;
            if(!isNaN(left) && !isNaN(right)){
                result = +left + +right;
            }
            return result;
          },
        subtract: function (left, right) {
            let result = NaN;
            if(!isNaN(left) && !isNaN(right)){
                result = left - right;
            }
            return result;
          },
        multiply: function (left, right) {
            let result = NaN;
            if(!isNaN(left) && !isNaN(right)){
                result = left * right;
            }
            return result;
          },
        divide: function (left, right) {
            let result = NaN;
            let remainder = NaN;
            //if(right > left)
            console.log('left ' + left + ' right '  + right);
            if(!isNaN(left) && !isNaN(right)){
                if((left / right) < 10){
                    if(left % right === 0){
                        result = (left / right).toPrecision(1);
                    } else {
                        result = (left / right).toPrecision(1) + ' remainder ' + (left % right);
                    }
                } else {
                    if(left % right === 0){
                    result = (left / right).toPrecision(2);
                } else {
                    result = (left / right).toPrecision(2) + ' remainder ' + (left % right);
                }
            }
        }
            return result;
        }
    }
    function message(operator, left, right) {
        left = l;
        right = r;
        operator = operatorChosen[0];
        console.log('operator chosen   ' + operatorChosen);
        let mes;
        //console.log(`${left}${operator}${right}`);
        switch(operator){
            case '+':
                mes =  left + operator + right + ' = ' + mat.add(left,right);
                //console.log(`${left}${operator}${right}=${mat.add(left,right)}`);
                break;
            case '-':
                if((left - right) < 0){
                    mes = right + operator + left + ' = ' + mat.subtract(right, left);
                    console.log(`${right}${operator}${left}=${mat.subtract(right, left)}`);
                } else {
                    mes =  left + operator + right + ' = ' + mat.subtract(left,right);
                    console.log(`${left}${operator}${right}=${mat.subtract(left,right)}`);
                }
                //console.log(`${left}${operator}${right}=${mat.subtract(left,right)}`);
                break; 
            case 'x':
                mes =  left + operator + right + ' = ' + mat.multiply(left,right);
                //console.log(`${left}${operator}${right}=${mat.multiply(left,right)}`);
                break; 
            case '/':
                if(left < right){
                    mes =  right + String.fromCodePoint(0x00F7) + left + ' = ' + mat.divide(right,left);
                } else {
                    mes =  left + String.fromCodePoint(0x00F7) + right + ' = ' + mat.divide(left,right);
                }
                

                console.log(`${left}${operator}${right}=${mat.divide(left,right)}`);
        }
        //operatorChosen.pop();
        return mes;
      }

    $newOperatorButton.on('click',  function(){
        $('.tens').show("slow");
        $($ownNum).show("slow");
        $($arrowButton).show("slow");
        $($ownNum).show("slow");
        
        let msgOperator = '';
        let expression;
        //let operatorArr = ['+', '-', 'x', '/'];
        //let operatorRand = Math.floor(Math.random() * 4);

        let operatorArr = ['+', '-', 'x'];
        let operatorRand = Math.floor(Math.random() * 3);
        let operator = $(this).attr("value");
        let temp = j;
        //r = j;
        //l = leftTable[0];
        //r = rightTable[0];
        //operatorChosen.push(operator);
        if(!l && !r){
            l = Math.floor(Math.random() * 101);
            r = Math.floor(Math.random() * 101);
        } else if(!l){
            l = Math.floor(Math.random() * 101);
        } else if(!r){
            r = Math.floor(Math.random() * 101);
        }
        if(!operator){
            operator = operatorArr[operatorRand];
        }
   // console.log('left ' + l + '  operator  ' + operatorChosen[0] + ' right ' + r);
        
       /* if(operator === 'random'){
            operatorChosen.push(operatorArr[operatorRand]);
            while(i < 11){
                l = Math.floor(Math.random() * 101);
                r = Math.floor(Math.random() * 101);
                operator = operatorArr[operatorRand];
    console.log('left ' + l + '  operator  ' + operatorChosen[0] + ' right ' + r);
    console.log(operatorArr[operatorRand])
                msg += message(operator, l, r) + '<br />';
                i++;
                r++
            }
            operatorChosen.pop();
        }*/
        
       switch(operator){
           case 'random':
               while(i < 11){
                l = Math.floor(Math.random() * 101);
                r = Math.floor(Math.random() * 101);
                operatorRand = Math.floor(Math.random() * 3);
                operator = operatorArr[operatorRand];
                operatorChosen.push(operator);
                msg += message(operator, l, r) + '<br />';
                i++;
                r++
                operatorChosen.pop();
            }
           case '+':
               operatorChosen.push('+');
                while(i < 11){
                    msg += message('+', l, r) + '<br />';
                    i++;
                    r++
                }
                console.log(operatorChosen);
                break;
            case '-':
                operatorChosen.push('-')
                    while(i < 11){
                        msg += message('-', l, r) + '<br />';
                        i++;
                        r++
                    }
                operatorChosen.pop();
                break;
            case 'x':
                operatorChosen.push('x')
                while(i < 11){
                    msg += message('x', l, r) + '<br />';
                    i++;
                    r++
                }
                operatorChosen.pop();
                break;
            case '/':
                operatorChosen.push('/')
                if(l < r){
                    //let min = l;
                    //l = r;
                    //r = min;
                    while(i < 11){
                        msg += message('/', l, r) + '<br />';
                        i++;
                        l++;
                    }
                } else {
                    while(i < 11){
                        msg += message('-/', l, r) + '<br />';
                        i++;
                        r++
                    }
                }
                operatorChosen.pop();
                break;
       }
                console.log(operatorChosen);
        /*
        if(operator === 'random'){
            operator = operatorArr[operatorRand];
        }
        if(operator === '+'){
            msgOperator = String.fromCodePoint(0x002B);
            expression = (+table + +j);
            for(i; i < 11; i++){
                msg += table + msgOperator + j + ' = ' + (+table + +j) + '<br />';
                j++; 
            }
        } else if (operator === '-') {
            msgOperator = String.fromCodePoint(0x2212);
            expression = (table - j);
            if(j > table){
                for(i; i < 11; i++){
                    msg += j + msgOperator + table + ' = ' + (j - table) + '<br />';
                    j++; 
                }
            } else {
                for(i; i < 11; i++){
                    msg += table + msgOperator + j + ' = ' + (table - j) + '<br />';
                    j++; 
                }
            }
            
        } else if (operator === 'x') {
            msgOperator = String.fromCodePoint(0x00D7);
            expression = (table * j);
            for(i; i < 11; i++){
                msg += table + msgOperator + j + ' = ' + (table * j) + '<br />';
                j++; 
            }
        } else if (operator === '/') {
            msgOperator = String.fromCodePoint(0x00F7);
   
            for(i; i < 11; i++){
                if(table > 9){
                    if(j < table){
                        let remainder = table % j;
                        if(remainder === 0){
                            msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(2) + '<br />';
                            
                        } else {
                            msg += table + msgOperator + j + ' = ' + Math.floor((table / j).toPrecision(2)) + ' remainder ' + remainder + '<br />';
                       }
                        j++;
                    } else {
                        let remainder = j / table;
                        if(remainder === 0){
                            msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(1) + '<br />';
                        } else {
                            msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(2) + '<br />';
                       }
                        j++; 
                    }
                } else {
                    if(j < table){
                    let remainder = table % j;
                    if(remainder === 0){
                        msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(1) + '<br />';
                        
                    } else {
                        msg += table + msgOperator + j + ' = ' + Math.floor((table / j).toPrecision(2)) + ' remainder ' + remainder + '<br />';
                   }
                    j++;
                } else {
                    let remainder = j / table;
                    if(remainder === 0){
                        msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(1) + '<br />';
                    } else {
                        msg += table + msgOperator + j + ' = ' + (table / j).toPrecision(2) + '<br />';
                   }
                    j++; 
                }
                }
            }
        }*/
        $("#blackboard").html(msg); 
        if (i == 11) {
            i = 1;
            msg = "";
        }
        operatorChosen.pop();
    });
    let answerArr = [];
    let practicemsg = '';
    let correctCounter = 0;
    let $answer = $('input.answerInput');  
    let $a1 = $('input#1');                  
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
    let operatorArr = ['+', '-', 'x', '/'];
    let math = {
        add: function(left, right) {
            let result = NaN;
            if (!isNaN(left) && !isNaN(right)) {
            result = left + right;
        }
        return result;
    },
        subtract: function(left, right) {
            let result = NaN;
            if (!isNaN(left) && !isNaN(right)) {
                result = left - right;
            }
            return result;
    },
        multiply: function(left, right) {
            let result = NaN;
            if (!isNaN(left) && !isNaN(right)) {
                result = left * right;
            }
            return result;
    },
        divide: function(left, right) {
            let result = NaN;
            if (!isNaN(left) && !isNaN(right)) {
                result = left / right;
            }
            return result;
        }
    }
    function initPractice() {
        let left = Math.floor(Math.random() * 10 + 1);
        let right = Math.floor(Math.random() * 10 + 1);
        let operatorRand = Math.floor(Math.random() * 4);
        switch (operatorArr[operatorRand]) {
            case '+':
                answerArr.push(math.add(left, right));
                break;
            case '-':
                while (Math.sign(left - right) === -1 || (left - right) === 0) {
                left = Math.floor(Math.random() * 10 + 1);
                right = Math.floor(Math.random() * 10 + 1);
                }
                answerArr.push(math.subtract(left, right));
                break;
            case 'x':
                answerArr.push(math.multiply(left, right));
                break;
            case '/':
                while ((left % right) != 0) {
                left = Math.floor(Math.random() * 10 + 1);
                right = Math.floor(Math.random() * 10 + 1);
                }
                answerArr.push(math.divide(left, right));
                break;
        }
        let expressionReturned = "<div class='equation'>" + left  + operatorArr[operatorRand] +  right + ' = </div>';
        console.log(`${left} ${operatorArr[operatorRand]} ${right}`)
        return expressionReturned;
    }
    $($practiceButton).on('click', function() {
        $('#page1').toggle();
        $('#operator').toggle();
        $('#test').toggle();
        $('#page2').toggle();
        
        while(i < 11){
            practicemsg += initPractice();
            i++;
        }
        $("#question").html(practicemsg);
        console.log(answerArr);
        if (i == 11) {
            i = 1;
            practicemsg = "";
        }
    });
  
    $('.again').on('click', function() {
        if($('#answer').is(":hidden")){
            $('#answer').toggle();
        }
        if(answerArr.length > 0){
            for(let i = 0; i < 10; i++){
            answerArr.pop();
            }
        }
        if (practicemsg.length > 0) {
            practicemsg = "";
        }
        for (let i = 0; i < 10; i++) {
            practicemsg += initPractice();
        }
        console.log(answerArr);
        $("#question").html(practicemsg);
        $('input[type=text]').val("");
    });
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
        if(correct.length > 0 || wrong.length > 0){
            for(let i = 0; i < 10; i++){
                correct.pop();
                wrong.pop();
            }
        }    
        console.log('answers ' + aArr);
        for(let index = 0; index < 10; index++){
            if(aArr[index] == answerArr[index]){
                correct.push(aArr[index]);
                correctCounter++;      
            } else{
                wrong.push(answerArr[index]);
            }
        }
        console.log('correct in check ' + correctCounter);
        console.log('answer correct ' + (correctCounter/10)*100 + '%');
        console.log('correct arr ' + correct);
        console.log('wrong arr ' + wrong);
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
});