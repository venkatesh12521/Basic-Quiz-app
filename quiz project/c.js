const quizdata=[
    {
    question:'what is the correct way to declare a variable in JavaScript',
    options:['var name="John";','const name="John";','let name="John";','All of the above'],
    answer:'All of the above',
    },
    {
        question:'What is the output of "typeof null"?',
        options:['"object"','"null"','"undefined"','"string"'],
        answer:'"object"',
    },
    {
        question:'What will be the following code output:"console.log(2+"2"-2)"',
        options:['22','"22"','0','20'],
        answer:'0',
    },
    {
        question:'What is the result of "3 === 3"',
        options:['true','false','undefined','null'],
        answer:'true',
    },
    {
        question:'What does the following expression return: "5 > 3 > 1"?',
        options:['true','false','undefined','null'],
        answer:'false',
    },
    {
        question:'What will be the output of "typeof NaN"?',
        options:['"number"','"NaN"','"undefined"','"string"'],
        answer:'"number"',
    },
    {
        question:'What will be the reason of "0.1 + 0.2 === 0.3"?',
        options:['true','false','undefined','null'],
        answer:'false',
    },
    {
        question:'What is the result of "typeof([])"?',
        options:['"object"','"array"','"undefined"','"null"'],
        answer:'"object"',
    },
    {
        question:'What will be the output of "2 + 3 + "7""?',
        options:['12','"57"','"12"','"237"'],
        answer:'"57"',
    },
    {
        question:'What is the result of "Boolean([])"?',
        options:['true','false','undefined','null'],
        answer:'true',
    },
];
 
const quizcontainer=document.getElementById('quiz');
const resultcontainer=document.getElementById('result');
const submitbutton=document.getElementById('submit');
const retrybutton=document.getElementById('retry');
const showanswerbutton=document.getElementById('showanswer');

let currentquestion=0;
let score=0;
let incorrectanswers=[];

function shufflearray(array){
    for(let i = array.length - 1;i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}
function displayquestion(){
    const questiondata=quizdata[currentquestion];

    const questionelement=document.createElement('div');
    questionelement.className='question';
    questionelement.innerHTML=questiondata.question;

    const optionselement=document.createElement('div');
    optionselement.className='options';

    const shuffledoptions=[...questiondata.options];
    shufflearray(shuffledoptions);

    for(let i = 0;i < shuffledoptions.length; i++){
        const option = document.createElement('label');
        option.className='option';

        

        const radio=document.createElement('input');
        radio.type='radio';
        radio.name='quiz';
        radio.value=shuffledoptions[i];

        const optionText=document.createTextNode(shuffledoptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionselement.appendChild(option);

    }

    quizcontainer.innerHTML='';
    quizcontainer.appendChild(questionelement);
    quizcontainer.appendChild(optionselement)

     retrybutton.style.display='none';
     showanswerbutton.style.display='none'
}

function checkanswer(){
    const selectedoption=document.querySelector('input[name="quiz"]:checked');
    if (selectedoption){
        const answer=selectedoption.value;
        if(answer===quizdata[currentquestion].answer){
           score++;    
        }else{
            incorrectanswers.push({
                question:quizdata[currentquestion].question,
                incorrectanswers:answer,
                correctanswer:quizdata[currentquestion].answer,
            });
        }
        currentquestion++;
        selectedoption.checked=false;
        if(currentquestion<quizdata.length){
            displayquestion();
        }else{
            displayresult();
        }

    }
}


function displayresult(){
    quizcontainer.style.display='none';
    submitbutton.style.display='none';
    retrybutton.style.display='inline-block';
    showanswerbutton.style.display='inline-block';
    resultcontainer.innerHTML=`You scored ${score} out of ${quizdata.length}!`;
}


function retryquiz(){
    currentquestion=0;
    score=0;
    incorrectanswers=[];
    quizcontainer.style.display='block';
    submitbutton.style.display='inline-block';
    retrybutton.style.display='none';
    showanswerbutton.style.display='none';
    resultcontainer.innerHTML='';
    displayquestion();
}

function showanswer(){
    quizcontainer.style.display='none';
    submitbutton.style.display='none';
    retrybutton.style.display='inline-block';
    showanswerbutton.style.display='none';



let incorrectanswersHtml='';
for(let i=0;i<incorrectanswers.length;i++){
    incorrectanswersHtml +=`
    <p>
    <strong>Question:</strong>${incorrectanswers[i].question}<br>
    <strong>Your Answer:</strong>${incorrectanswers[i].incorrectanswer}<br>
    <strong>Correct Answer:</strong>${incorrectanswers[i].correctanswer}
    </p>`;
  }
   

  resultcontainer.innerHTML=`
  <p>You scored ${score} out of${quizdata.length}!</p>
  <p>Incorrect Answers:</p>
  ${incorrectanswersHtml}`;
}


submitbutton.addEventListener('click',checkanswer);
retrybutton.addEventListener('click',retryquiz);
showanswerbutton.addEventListener('click',showanswer);

displayquestion();