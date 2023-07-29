const upload = document.getElementById("upload");
const container = document.getElementById("container");
const btnGenerate = document.getElementById("btn-generate-quiz");
const pdfPages = document.getElementById("pdf");
const headerSchoolName = document.getElementById("header-school-name");
const headerExamName = document.getElementById("header-exam-name");
const headerGradeName = document.getElementById("header-grade-name");
const headerSubjectName = document.getElementById("header-subject-name");
const programmeName = document.getElementById("header-programme-name");
const semesterName = document.getElementById("header-semester-name");
const numberOfQuestions = document.getElementById("number-of-questions");
const btnShowAnswerKey = document.getElementById("show-answer-keys");
const answerSheets = document.getElementById("answer-sheets");
const headerStudentInformation = document.getElementById(
  "header-student-information"
);
const btnDownloadQuiz = document.getElementById("download-quiz");
const testVersions = document.getElementById("versions");

let importedRawText = "";
let questionsJSON = {};
let processStatus = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: false,
  20: false,
  21: false,
  22: false,
  23: false,
  24: false,
  25: false,
  26: false,
  27: false,
  28: false,
  29: false,
  30: false,
  31: false,
  32: false,
  33: false,
  34: false,
  35: false,
  36: false,
  37: false,
  38: false,
  39: false,
  40: false,
  41: false,
  42: false,
  43: false,
  44: false,
  45: false,
  46: false,
  47: false,
  48: false,
  49: false,
  50: false,
};

const answerKeyCoordinates = {
  1: { top: -640, a: 114, b: 137, c: 160, d: 183 },
  2: { top: -608, a: 114, b: 137, c: 160, d: 183 },
  3: { top: -576, a: 114, b: 137, c: 160, d: 183 },
  4: { top: -545, a: 114, b: 137, c: 160, d: 183 },
  5: { top: -514, a: 114, b: 137, c: 160, d: 183 },
  6: { top: -483, a: 114, b: 137, c: 160, d: 183 },
  7: { top: -452, a: 114, b: 137, c: 160, d: 183 },
  8: { top: -421, a: 114, b: 137, c: 160, d: 183 },
  9: { top: -391, a: 114, b: 137, c: 160, d: 183 },
  10: { top: -339, a: 114, b: 137, c: 160, d: 183 },
  11: { top: -307, a: 114, b: 137, c: 160, d: 183 },
  12: { top: -275, a: 114, b: 137, c: 160, d: 183 },
  13: { top: -243, a: 114, b: 137, c: 160, d: 183 },
  14: { top: -213, a: 114, b: 137, c: 160, d: 183 },
  15: { top: -182, a: 114, b: 137, c: 160, d: 183 },
  16: { top: -151, a: 114, b: 137, c: 160, d: 183 },
  17: { top: -120, a: 114, b: 137, c: 160, d: 183 },
  18: { top: -640, a: 235, b: 258, c: 280, d: 303 },
  19: { top: -608, a: 235, b: 258, c: 280, d: 303 },
  20: { top: -576, a: 235, b: 258, c: 280, d: 303 },
  21: { top: -545, a: 235, b: 258, c: 280, d: 303 },
  22: { top: -514, a: 235, b: 258, c: 280, d: 303 },
  23: { top: -483, a: 235, b: 258, c: 280, d: 303 },
  24: { top: -452, a: 235, b: 258, c: 280, d: 303 },
  25: { top: -421, a: 235, b: 258, c: 280, d: 303 },
  26: { top: -391, a: 235, b: 258, c: 280, d: 303 },
  27: { top: -339, a: 235, b: 258, c: 280, d: 303 },
  28: { top: -307, a: 235, b: 258, c: 280, d: 303 },
  29: { top: -275, a: 235, b: 258, c: 280, d: 303 },
  30: { top: -243, a: 235, b: 258, c: 280, d: 303 },
  31: { top: -213, a: 235, b: 258, c: 280, d: 303 },
  32: { top: -182, a: 235, b: 258, c: 280, d: 303 },
  33: { top: -151, a: 235, b: 258, c: 280, d: 303 },
  34: { top: -640, a: 356, b: 379, c: 401, d: 424 },
  35: { top: -608, a: 356, b: 379, c: 401, d: 424 },
  36: { top: -576, a: 356, b: 379, c: 401, d: 424 },
  37: { top: -545, a: 356, b: 379, c: 401, d: 424 },
  38: { top: -514, a: 356, b: 379, c: 401, d: 424 },
  39: { top: -483, a: 356, b: 379, c: 401, d: 424 },
  40: { top: -452, a: 356, b: 379, c: 401, d: 424 },
};

const showQuestionAreaByStartingAndEndingPhrases = (
  bank,
  startingLine,
  endingLine
) => {
  let startingIndex = 0;
  let endingIndex = 0;
  let answerKeyStartingLine = 0;
  let answerKeyEndingLine = 0;

  for (let a = 0; a < bank.length; a++) {
    if (bank[a] === startingLine) {
      startingIndex = a;
      break;
    }
  }
  for (let a = 0; a < bank.length; a++) {
    if (bank[a] === endingLine) {
      endingIndex = a;
      answerKeyStartingLine = a + 2;
    }
  }

  for (let a = 0; a < bank.length; a++) {
    if (bank[a].includes("50\t") && a > answerKeyStartingLine) {
      answerKeyEndingLine = a + 2;
    }
  }

  return {
    start: startingIndex,
    end: endingIndex,
    answerKeyStart: answerKeyStartingLine,
    answerKeyEnd: answerKeyEndingLine,
  };
};

const splitQuestionsIntoJSON = (questArray) => {
  for (let a = 1; a <= 50; a++) {
    let keyWord = a + "\t";
    for (let b = 0; b < questArray.length; b++) {
      if (
        questArray[b].substring(0, keyWord.length) === keyWord ||
        //If you remove the code below, it won't register numbers if they have a new line on top
        questArray[b].substring(0, keyWord.length + 1) === "\f" + keyWord
      ) {
        questionsJSON[a] = {
          question: questArray[b].substring(keyWord.length),
          a: questArray[b + 1].substring(4),
          b: questArray[b + 2].substring(4),
          c: questArray[b + 3].substring(4),
          d: questArray[b + 4].substring(4),
        };
        processStatus[a] = true;
      }
    }
  }
};

const assignAnswerKeys = (ansArray) => {
  for (let b = 1; b <= 50; b++) {
    let keyWord = b + "\t";
    for (let a = 0; a < ansArray.length; a++) {
      if (ansArray[a].substring(0, keyWord.length) === keyWord) {
        try {
          questionsJSON[b].answerKey = ansArray[a].substring(
            keyWord.length,
            keyWord.length + 1
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};

// returns an array with each line
const isolateMCQQuestions = (arr, start, end) => {
  newArray = arr.slice(start - 1, end);
  newArray.join("\n");
  return newArray;
};

const loadTxtFile = () => {
  let fr = new FileReader();
  fr.readAsText(upload.files[0]);

  fr.onload = function () {
    importedRawText = fr.result;

    rawTextInLines = importedRawText.split(/\r\n|\n/);

    let questionStartingAndEngingIndexes =
      showQuestionAreaByStartingAndEndingPhrases(
        rawTextInLines,
        "Choose the best answer.",
        " 	  Total marks "
      );

    let questionsArray = isolateMCQQuestions(
      rawTextInLines,
      questionStartingAndEngingIndexes.start,
      questionStartingAndEngingIndexes.end
    );
    let answersArray = isolateMCQQuestions(
      rawTextInLines,
      questionStartingAndEngingIndexes.answerKeyStart,
      questionStartingAndEngingIndexes.answerKeyEnd
    );

    splitQuestionsIntoJSON(questionsArray);
    assignAnswerKeys(answersArray);

    let fileName = upload.files.item(0).name;
    fileName = fileName
      .split("_")
      .slice(1)
      .join(" ")
      .split(".")
      .slice(0, 1)
      .join(" ")
      .toUpperCase();
    headerExamName.value = fileName;
    document.title = fileName;
  };
};

//Generates header
const generateHeader = (
  schlName,
  exmName,
  prgrmName,
  smstrName,
  stdInfo,
  version,
  subject,
  grade,
  points
) => {
  const examHeader = document.createElement("div");
  const lineBreaker = document.createElement("br");
  examHeader.classList.add("exam-header");
  examHeader.classList.add("text-center");
  examHeader.id = "exam-header";

  const schoolLogo = document.createElement("img");
  schoolLogo.src = "img/logo.png";
  schoolLogo.classList.add("exam-logo");
  examHeader.append(lineBreaker);

  const headerLine1 = document.createElement("p");
  headerLine1.innerText = schlName;
  examHeader.appendChild(schoolLogo);
  examHeader.append(headerLine1);

  const headerLine2 = document.createElement("div");
  headerLine2.classList.add("single-line");

  let r1 = document.createElement("p");
  r1.innerText = exmName;

  let r2 = document.createElement("p");
  r2.innerText = version;

  let r3 = document.createElement("p");
  r3.innerText = smstrName;

  headerLine2.append(r1);
  headerLine2.append(r2);
  headerLine2.append(r3);
  examHeader.appendChild(headerLine2);

  const headerLine3 = document.createElement("div");
  headerLine3.classList.add("single-line");
  let l3r1 = document.createElement("p");
  let l3r2 = document.createElement("p");
  let l3r3 = document.createElement("p");

  l3r1.innerText = version;

  l3r1.classList.add("highlighted");
  l3r2.innerText = subject;
  l3r3.innerText = grade;

  headerLine3.appendChild(l3r1);
  headerLine3.appendChild(l3r2);
  headerLine3.appendChild(l3r3);

  // examHeader.appendChild(headerLine3);
  // const headerLine4 = document.createElement("p");
  // headerLine4.innerText = stdInfo;
  // examHeader.appendChild(headerLine4);

  pdfPages.appendChild(examHeader);
  // pdfPages.appendChild(paper);
};

// Generating Questions starts from here

const pickRandomQuestionsFromRange = (l) => {
  let randomOrder = [];

  while (randomOrder.length < l) {
    let rand = Math.round(Math.random() * 50);
    if (!randomOrder.includes(rand) && rand >= 1) {
      randomOrder.push(rand);
    }
  }
  return randomOrder;
};

const assembleQuestions = () => {
  randomQuestions = pickRandomQuestionsFromRange(numberOfQuestions.value);

  const pdfQuestions = document.createElement("div");
  pdfQuestions.classList.add("column-2");

  const oderedList = document.createElement("ol");
  oderedList.id = "questions";
  pdfQuestions.appendChild(oderedList);

  for (let a = 0; a < randomQuestions.length; a++) {
    let tempQuestion = questionsJSON[randomQuestions[a]];
    let tempOLTag = document.createElement("li");
    tempOLTag.classList.add("question-box");

    let questionType;
    if (randomQuestions[a] <= 10) {
      questionType = "S";
    } else if (randomQuestions[a] > 10 && randomQuestions[a] <= 20) {
      questionType = "Ch";
    } else if (randomQuestions[a] > 20 && randomQuestions[a] <= 30) {
      questionType = "D";
    } else if (randomQuestions[a] > 30 && randomQuestions[a] <= 40) {
      questionType = "V";
    } else {
      questionType = "P";
    }

    if (tempQuestion) {
      tempOLTag.innerText = tempQuestion.question;

      let optionsList = document.createElement("ol");
      optionsList.classList.add("order-abc");
      optionsList.type = "a";

      let optionA = document.createElement("li");
      let optionB = document.createElement("li");
      let optionC = document.createElement("li");
      let optionD = document.createElement("li");

      optionA.innerText = tempQuestion.a;
      optionB.innerText = tempQuestion.b;
      optionC.innerText = tempQuestion.c;
      optionD.innerText = tempQuestion.d;

      optionsList.appendChild(optionA);
      optionsList.appendChild(optionB);
      optionsList.appendChild(optionC);
      optionsList.appendChild(optionD);

      const questionTypeText = document.createElement("sup");
      questionTypeText.innerText = questionType;
      questionTypeText.classList.add("question-type");
      tempOLTag.appendChild(questionTypeText);

      tempOLTag.appendChild(optionsList);
      oderedList.appendChild(tempOLTag);
    }
  }

  // const instructions = `

  // `;

  // pdfQuestions.appendChild(instructions);

  pdfPages.appendChild(pdfQuestions);

  const pageBreaker = document.createElement("h3");

  pageBreaker.classList.add("page-breaker");
  pdfPages.appendChild(pageBreaker);
};

const generateAnswerKey = (qLength, testV) => {
  let answerSheet = document.createElement("div");
  answerSheet.classList.add("answer-sheet");
  answerSheet.id = "answer-sheet-" + testV;
  let answerSheetImg = document.createElement("IMG");
  answerSheetImg.src = "img/Answer-sheet.png";
  answerSheetImg.classList.add("answer-sheet-img");

  answerSheet.appendChild(answerSheetImg);

  for (let i = 1; i <= qLength; i++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.id = "bubble-" + [i];
    answerSheet.appendChild(bubble);
    let ans;
    if (randomQuestions[i - 1] !== 0 || randomQuestions[i - 1] !== 51) {
      ans = questionsJSON[randomQuestions[i - 1]].answerKey;
    }

    bubble.style.marginTop = answerKeyCoordinates[i].top + "px";
    bubble.style.marginLeft = answerKeyCoordinates[i][ans] + "px";
  }
  answerSheets.appendChild(answerSheet);
};

//Event Listeners

upload.addEventListener("change", loadTxtFile);

btnGenerate.addEventListener("click", () => {
  const paper = document.createElement("div");
  paper.id = "paper-1";
  paper.classList.add("paper");

  let versionKeys = testVersions.value;
  for (let i = 0; i < versionKeys.length; i++) {
    generateHeader(
      headerSchoolName.value,
      headerExamName.value,
      programmeName.value,
      semesterName.value,
      headerStudentInformation.value,
      "Version " + versionKeys[i],
      headerSubjectName.value,
      headerGradeName.value,
      "30 points"
    );
    document.title = document.title + " - " + versionKeys[i];
    assembleQuestions();
    generateAnswerKey(numberOfQuestions.value, versionKeys[i]);
  }
});

btnShowAnswerKey.addEventListener("click", () => {
  answerSheets.style.visibility = "visible";
});

btnDownloadQuiz.addEventListener("click", () => {
  window.print();
});
