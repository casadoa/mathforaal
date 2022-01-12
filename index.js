$(function() {
    let table = 1;                                  //left side number
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
    $('#page2').hide();                             //hiding page two because that's for practice/test
    let $rOperand = $('.num2:button');

    let correct = [];
    let wrong = [];
    let leftTable = [];                             //keeps a consistent left #
    let rightTable = [];                            //keeps a consistent right #
    let operatorChosen = [];                        //which operator was chosen
    let temp;
    let l, r;                                       //left and right side number
    let lColor = [];
    let rColor = [];
      
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
        switch (arrowClick) {
            case 'less':
                table--;
                $leftRight = $('.before');
                $('.after').empty().append(table);
                math2('+', table, j);
                break;
            case 'more':
                table++;
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

        //let ownText = $ownNum.val();
        l = $minText.val();
        leftTable[0] = $minText.val();
        r = $maxText.val();
        rightTable[0] = $maxText.val();
        //table = Math.floor(Math.random() * (maxText - minText) + minText); //This value now becomes table to ensure table is between these two numbers
        if($minText.val() == "" || leftTable[0] == "null"){
            l = 1;
            leftTable[0] = l;
        } if($maxText.val() == "" || rightTable[0] == "null"){
            r = 0;
            rightTable[0] = 0;
        }
        $tens.css({
            'background-color': "",
            'color':  ""
        });
        $ones.css({
            'background-color': "",
            'color':  ""
        });
        $rOperand.css({
            'background-color': "",
            'color':  ""
        });
       
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
        
        
        if(leftTable.length > 0){
            leftTable.pop();
        }
        if(!r || rightTable[0] == "null"){
            r = 0;
            rightTable[0] = r;
        }
        let ten = $(this).attr("value");        //get the 10's button
        $(this).empty().html(ten);              //making the value the html for the tens button
        let tenIndex = $('.num').index(this); 
        leftTable[0] = ten;
        l = leftTable[0];
        r = rightTable[0];
        
        if(lColor[0] == $(this).html()){
            lColor.splice(1,1);
        } else {
            lColor.push($(this).html());
        }

        if(lColor.length == 1){
            $(this).css({
                'background-color': '#' + randomColor,
                'color':  invert
            }); 
        } else {
            if(lColor[1] != lColor[0]){
                $('.num').css({
                    'background-color': '',
                    'color':  ''
                });
                $(this).css({
                    'background-color': '#' + randomColor,
                    'color':  invert
                });
                lColor.splice(0, 1);
            }
        }

        $($ones).css({
            'background-color': '',
            'color': ''
        });
        let ind = $('.num').index(this);        //finding index so i can see if 1 or the 10,20,30... is clicked

        $ones.on('click', function(){
            let oneClicked = $(this).text();
            $(this).css({
                'background-color': '#' + randomColor,
                'color':  invert
            });  

            l = oneClicked;
            r = rightTable[0];
            if(leftTable.length > 0){
                leftTable.pop();
            }
            leftTable[0] = l;
            if(lColor[0] == $(this).html()){
                lColor.splice(1,1);
            } else {
                lColor.push($(this).html());
            }
            if(lColor[1] != lColor[0]){
                $('.num1').css({
                    'background-color': '',
                    'color':  ''
                });
                $(this).css({
                    'background-color': '#' + randomColor,
                    'color':  invert
                });
                lColor.splice(0, 1);
            }
            $($tens).css({
                'background-color': '',
                'color': ''
            });
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
        r = rightClicked;
        if(!l)
        {
            l = 1;
        }   
        if(leftTable.length == 0){
            leftTable.push(1);
        }
        if(rightTable.length > 0){
            rightTable.pop();
        }
        rightTable.push(r);
        r = rightTable[0];
        l = leftTable[0];
        
        let o = operatorChosen[0];

        let invert = invertColor(randomColor);

        if(rColor[0] == $(this).html()){
            rColor.splice(1,1);
        } else {
            rColor.push($(this).html());
        }

        if(rColor.length == 1){
            $(this).css({
                'background-color': '#' + randomColor,
                'color':  invert
            }); 
        } else {
            if(rColor[1] != rColor[0]){
                $('.num2').css({
                    'background-color': '',
                    'color':  ''
                });
                $(this).css({
                    'background-color': '#' + randomColor,
                    'color':  invert
                });
                rColor.splice(0, 1);
            }
        }
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
            
            if(!isNaN(left) && !isNaN(right)){
                if((left / right) < 10){
                    if(left % right === 0){
                        result = Math.floor((left / right)).toPrecision(1);
                    } else {
                        result = Math.floor((left / right)).toPrecision(1) + ' remainder ' + (left % right);
                    }
                } else {
                    if(left % right === 0){
                    result = Math.floor((left / right)).toPrecision(2);
                } else {
                    result = Math.floor((left / right)).toPrecision(2) + ' remainder ' + (left % right);
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
        let mes;
        switch(operator){
            case '+':
                mes =  left + operator + right + ' = ' + mat.add(left,right);
                break;
            case '-':
                if((left - right) < 0){
                    mes = right + operator + left + ' = ' + mat.subtract(right, left);
                } else {
                    mes =  left + operator + right + ' = ' + mat.subtract(left,right);
                }
                break; 
            case 'x':
                mes =  left + operator + right + ' = ' + mat.multiply(left,right);
                break; 
            case '/':
                if(left < right){
                    mes =  right + String.fromCodePoint(0x00F7) + left + ' = ' + mat.divide(right,left);
                } else {
                    mes =  left + String.fromCodePoint(0x00F7) + right + ' = ' + mat.divide(left,right);
                }
        }
        return mes;
      }

    $newOperatorButton.on('click',  function(){
        $('.tens').show("slow");
        $($ownNum).show("slow");
        $($arrowButton).show("slow");
        $($ownNum).show("slow");
        
        let msgOperator = '';
        let expression;

        let operatorArr = ['+', '-', 'x'];
        let operatorRand = Math.floor(Math.random() * 3);
        let operator = $(this).attr("value");

        l = leftTable[0];
        r = rightTable[0];
        if(!leftTable[0] && !rightTable[0]){
            l = Math.floor(Math.random() * 101);
            r = Math.floor(Math.random() * 101);
        }/* else if(!l){
            l = Math.floor(Math.random() * 101);
        } else if(!r){
            r = Math.floor(Math.random() * 101);
        }*/
        if(!operator){
            operator = operatorArr[operatorRand];
        }
        
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
                    while(i < 11){
                        msg += message('/', l, r) + '<br />';
                        i++;
                        l++;
                    }
                } else {
                    while(i < 11){
                        msg += message('-/', l, r) + '<br />';
                        i++;
                        r++;
                    }
                }
                operatorChosen.pop();
                break;
       }
      
        $("#blackboard").html(msg); 
        if (i == 11) {
            i = 1;
            msg = "";
        }
        operatorChosen.pop();
    });

    let answerArr = [];
    let equationArr = [];
    let inputCopyArr = [];
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
    let inputArr = [];
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
        let expressionReturned = '';
        switch (operatorArr[operatorRand]) {
            case '+':
                answerArr.push(math.add(left, right));
                equationArr.push(`${left} ${operatorArr[operatorRand]} ${right} = ${math.add(left,right)}`);
                break;
            case '-':
                while (Math.sign(left - right) === -1 || (left - right) === 0) {
                left = Math.floor(Math.random() * 10 + 1);
                right = Math.floor(Math.random() * 10 + 1);
                }
                answerArr.push(math.subtract(left, right));

                equationArr.push(`${left} ${operatorArr[operatorRand]} ${right} = ${math.subtract(left,right)}`);
                break;
            case 'x':
                answerArr.push(math.multiply(left, right));

                equationArr.push(`${left} ${operatorArr[operatorRand]} ${right} = ${math.multiply(left,right)}`);
                break;
            case '/':
                while ((left % right) != 0) {
                left = Math.floor(Math.random() * 10 + 1);
                right = Math.floor(Math.random() * 10 + 1);
                }
                answerArr.push(math.divide(left, right));

                equationArr.push(`${left} ${String.fromCodePoint(0x00F7)} ${right} = ${math.divide(left,right)}`);
                break;
        }
        if(operatorArr[operatorRand] == '/'){
            expressionReturned = "<div class='equation'>" + left  + String.fromCodePoint(0x00F7) +  right + ' = </div>';
        } else {
            expressionReturned = "<div class='equation'>" + left  + operatorArr[operatorRand] +  right + ' = </div>';
        }
        return expressionReturned;
    }
    $($practiceButton).on('click', function() {
        $('#page1').toggle();
        $('#operator').toggle();
        $('#test').toggle();
        $('#page2').toggle();

        $('#result').toggle();
        if(answerArr.length > 0 || equationArr.length > 0 || correct.length > 0 || wrong.length > 0){
            for(let i = 0; i < 10; i++){
            answerArr.pop();
            equationArr.pop();
            correct.pop();
            wrong.pop();
            }
            practicemsg = "";
        }
        while(i < 11){
            practicemsg += initPractice();
            i++;
        }
        $("#question").html(practicemsg);
        if (i == 11) {
            i = 1;
            practicemsg = "";
        }

    });
    $('.test').on('click', function() {
        $('#page1').toggle();
        $('#operator').toggle();
        $('#test').toggle();
        $('#page2').toggle();
        $('#result').toggle();
        if (practicemsg.length > 0) {
            practicemsg = "";
        }
        while(i < 11){
            practicemsg += initPractice();
            i++;
        }
        $("#question").html(practicemsg);
        if (i == 11) {
            i = 1;
            practicemsg = "";
        }
        $('.equation').css({
            'font-size': '25px;'
        });
    });
    $('.again').on('click', function() {
        if($('#answer').is(":hidden")){
            $('#answer').toggle();
        }
        if($('#result').is(":visible")){
            $('#result').toggle();
        }
        if($('.check').is(":hidden")){
            $('.check').show();
        } 
        if(answerArr.length > 0 || equationArr.length > 0 || correct.length > 0 || wrong.length > 0){
            for(let i = 0; i < 10; i++){
            answerArr.pop(i);
            equationArr.pop(i);
            correct.pop(i);
            wrong.pop(i);
            }
        }
        if (practicemsg.length > 0) {
            practicemsg = "";
        }
        for (let i = 0; i < 10; i++) {
            practicemsg += initPractice();
        }

        $("#question").html(practicemsg).css({
            'width': '',
            'font-size': '',
            'line-height': '',
            'text-align': '',
            'justify-content': '',
            'align-items': '',
            'color': ''
        });
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
        inputArr = [an1, an2, an3, an4, an5, an6, an7, an8, an9, an10];

        inputCopyArr = inputArr.map(x => x);     //copy of input Array to show what answer were input
    });
    $('#check').on('click', function compare2(){
        
       // $('#result').toggle();
        
        if (practicemsg.length > 0) {
            practicemsg = "";
        }
        for (let i = 0; i < 10; i++) {
            practicemsg += initPractice();
        }
        
        $("#question").html(practicemsg).css({
            'width': '',
            'font-size': '',
            'line-height': '',
            'text-align': '',
            'justify-content': '',
            'align-items': ''
        });
        $('input[type=text]').val("");
        if(correctCounter > 0){
            correctCounter = 0;
        }
        if(correct.length > 0 || wrong.length > 0){
            for(let i = 0; i < 10; i++){
                correct.pop();
                wrong.pop();
                equationArr.pop();
                inputCopyArr.pop();
            }
        }    
         $('#question').html(msg).css({
            'font-size': '2.3vw',
            'text-align': 'center',
            'width': '99%',
            'line-height': '1.8',
            'justify-content': 'center',
            'align-items': 'center',
            
        }); 
        for(let index = 0; index < 10; index++){
            if(inputArr[index] == answerArr[index]){
                correctCounter++;   
                correct.push(equationArr[index]);
                msg += equationArr[index]+  ' <br  />';

            } else{
                wrong.push(equationArr[index] + '  your answer was [' + inputArr[index] + ']');
                msg += equationArr[index]+ '  your answer was [' + inputArr[index] + ']' + ' <br  />';
            }
        }
       
       /*
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
   
       
        */
       $('#question').html(msg);
       msg = "";

    $('#result').toggle();
    
    if(correctCounter > 0){
        correctCounter = 0;
    }
    if(correct.length > 0 || wrong.length > 0){
        for(let i = 0; i < 10; i++){
            correct.pop();
            wrong.pop();
            equationArr.pop();
            inputCopyArr.pop();
        }
    }    
    
    for(let index = 0; index < 10; index++){
        if(inputArr[index] == answerArr[index]){
            correctCounter++;   
            correct.push(equationArr[index]);

        } else{
            wrong.push(equationArr[index] + ' your answer was [' + inputArr[index] + ']');
        }
    }
    $('#answer').toggle();
    
    if($('.check').is(":visible")){
        $('.check').hide();
    } 
    });
    $('#wrong').on('click', function(){
        while(j < wrong.length){
            msg += wrong[j] + "<br  />";
            j++;
        } 
        $('#question').html(msg).css({
            'font-size': '2.3vw',
            'text-align': 'center',
            'width': '99%',
            'line-height': '1.8',
        });
        if($('.check').is(":visible")){
            $('.check').hide();
        } 
        if (j > 0) {
            j = 0;
            msg = "";
        }
    });
    $('#correct').on('click', function(){
        while(j < correct.length){
            msg += correct[j] + "<br  />";
            j++;
        } 
        $('#question').html(msg).css({
            'font-size': '2.3vw',
            'text-align': 'center',
            'width': '99%',
            'line-height': '1.8',
        });
        if (j > 0) {
            j = 0;
            msg = "";
        }
    });
});