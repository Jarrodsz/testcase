import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Radio,
  Stack,
  Button,
  Alert,
  AlertIcon,
  Flex,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Card, CardBody, Progress, CardHeader
} from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";
import { Tabs } from "@chakra-ui/tabs";

export function Questionnaire({ questions }) {
  // State for tracking the current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for storing the answers given by the user
  const [answers, setAnswers] = useState(Array(questions.length).fill(-1));

  // State for tracking the time left for each question
  const [timeLeft, setTimeLeft] = useState(30);

  // Get the current question object based on the current index
  const currentQuestion = questions[currentIndex];

  // Function for saving an answer given by the user
  function saveAnswer(answerIndex) {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answerIndex;
    setAnswers(newAnswers);
    localStorage.setItem("answers", JSON.stringify(newAnswers));
    localStorage.setItem("timeLeft", timeLeft);
  }

  // Function for displaying the next question, if there are any
  function showNextQuestion() {
    // Check if all questions have been answered
    const allQuestionsAnswered = answers.every(
      (answerIndex) => answerIndex !== -1
    );

    // If all questions have been answered, don't move to the next question
    if (allQuestionsAnswered) {
      return;
    }

    // If not, move to the next question
    setCurrentIndex(currentIndex + 1);

    const storedTimeLeft = localStorage.getItem("timeLeft");

    setTimeLeft(storedTimeLeft !== null ? parseInt(storedTimeLeft) : 30); // <-- update this line
  }

  // Function for displaying the summary of answers at the end of the quiz
  function showSummary() {
    const answersFromStorage = JSON.parse(localStorage.getItem("answers"));

    // Initialize arrays for storing the correct, incorrect and all answers
    const correctAnswers = [];
    const incorrectAnswers = [];
    const allAnswers = [];

    // Loop through all the questions
    questions.forEach((question, index) => {
      const answerIndex = answersFromStorage[index];
      const answerText =
        answerIndex === -1
          ? "Not answered"
          : question.answers[answerIndex].text;

      // Create a new stack for each question and its answers
      allAnswers.push(
        <Stack key={index} mt={4}>
          <Alert
            status={
              answerIndex === -1
                ? "warning"
                : question.answers[answerIndex].score === 1
                  ? "success"
                  : "error"
            }
          >
            <AlertIcon />
            {question.question}
          </Alert>

          <Stack ml={4}>
            {question.answers.map((answer, idx) => (
              <Text
                key={idx}
                color={answer.score === 1 ? "green.500" : "red.500"}
              >
                {`${answer.text}${
                  answer.score === 1 ? " (correct)" : ""
                }`}
              </Text>
            ))}
          </Stack>
        </Stack>
      );

      // Check if the answer was not answered, correct or incorrect
      if (answerIndex === -1) {
        incorrectAnswers.push(
          <Stack key={index} mt={4}>
            <Alert status="warning">
              <AlertIcon />
              {question.question}: Not Answered
            </Alert>
          </Stack>
        );
      } else if (question.answers[answerIndex].score === 1) {
        correctAnswers.push(
          <Stack key={index} mt={4}>
            <Alert status="success">
              <AlertIcon />
              {question.question}:
            </Alert>
            <Text ml={4}>{question.answers[answerIndex].text}</Text>
          </Stack>
        );
      } else {
        incorrectAnswers.push(
          <Stack key={index} mt={4}>
            <Alert status="error">
              <AlertIcon />
              {question.question}:
            </Alert>
            <Text ml={4}>{question.answers[answerIndex].text}</Text>
          </Stack>
        );
      }
    });

    // Render the summary in tabs
    return (
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Correct Answers ({correctAnswers.length})</Tab>
          <Tab>Incorrect Answers ({incorrectAnswers.length})</Tab>
          <Tab>All Answers ({allAnswers.length})</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {correctAnswers.length > 0 ? (
              correctAnswers
            ) : (
              <Box mt={4}>
                <Alert status="info">
                  <AlertIcon />
                  No correct answers
                </Alert>
              </Box>
            )}
          </TabPanel>

          <TabPanel>
            {incorrectAnswers.length > 0 ? (
              incorrectAnswers
            ) : (
              <Box mt={4}>
                <Alert status="info">
                  <AlertIcon />
                  No incorrect answers
                </Alert>
              </Box>
            )}
          </TabPanel>

          <TabPanel>
            {allAnswers.length > 0 ? (
              allAnswers
            ) : (
              <Box mt={4}>
                <Alert status="info">
                  <AlertIcon />
                  No answers
                </Alert>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }

  // Effect hook for loading the initial state and time left on page refresh
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("answers"));
    const storedTimeLeft = localStorage.getItem("timeLeft");

    const initialTimeLeft = storedTimeLeft !== null ? parseInt(storedTimeLeft) : 30;
    setTimeLeft(initialTimeLeft);

    setAnswers(storedAnswers !== null ? storedAnswers : Array(questions.length).fill(-1));

    // Timer for counting down the time left for each question
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const currentTimeLeft = prevTimeLeft - 1;

        localStorage.setItem("timeLeft", currentTimeLeft);

        // If the time runs out for a question, treat it as not answered and move to the next one
        if (currentTimeLeft === 0) {
          saveAnswer(-1);
          showNextQuestion();
        }

        return currentTimeLeft;
      });
    }, 1000);

    // Clear the timer on unmounting
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Render either the current question or the summary, depending on the current index
  return (
    <>

      {currentIndex === questions.length - 1 ? (
        showSummary()
      ) : (
        <>

          <Card mb={"2"}>
            <CardBody>
              <Flex justify="space-between">
                <Flex>
                  <BiTimeFive size="20px" />
                  Time left:
                </Flex>
                <Text fontWeight="bold">
                  {`00:${timeLeft.toString().padStart(2, '0')}`}
                </Text>

              </Flex>

              <Progress
                w="full"
                mt={2}
                mb={2}
                size={"xs"}
                value={(timeLeft / 30) * 100}
              />


            </CardBody>
          </Card>

          <Card>
            <CardHeader
              bg={"gray.100"}
              borderColor={"gray.100"}
              borderBottom={2}
            >
              <Heading textColor={"gray.500"} size="md">
                {/*Question {data.question.question_id} of {data.questionsTotal}*/}
                {currentQuestion.question}
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack>

                {currentQuestion.imageUrl && (
                  <Box mb={4}>
                    <Image src={currentQuestion.imageUrl} />
                  </Box>
                )}

                {currentQuestion.answers.map((answer, index) => (
                  <Radio
                    key={answer.text}
                    isChecked={answers[currentIndex] === index}
                    onChange={() => saveAnswer(index)}
                    value={index}
                  >
                    {answer.text}
                  </Radio>
                ))}
              </Stack>

              <Box mt={4}>
                <Button
                  mr={4}
                  onClick={showNextQuestion}
                  disabled={answers[currentIndex] === -1}
                >
                  {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default Questionnaire;
