import React from "react";
import {
  Box,
  Text,
  Stack,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

export function Summary({ questions, answers }) {
  // Initialize arrays for storing the correct, incorrect and all answers
  const correctAnswers = [];
  const incorrectAnswers = [];
  const allAnswers = [];

  // Loop through all the questions
  questions.forEach((question, index) => {
    const answerIndex = answers[index];
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
              {`${answer.text}${answer.score === 1 ? " (correct)" : ""}`}
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

export default Summary;
