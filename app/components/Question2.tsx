import { BiTimeFive } from "react-icons/bi";
import {
  Stack,
  Card,
  CardBody,
  Flex,
  Text,
  Progress,
  CardHeader,
  Heading, RadioGroup, Radio
} from "@chakra-ui/react";

export function Question({ data, full = false, timeLeft = 10, countdownProgress = 50 }) {
  return (
    <Stack>
      {full && (
        <Card>
          <CardBody>
            <Flex justify="space-between">
              <Flex>
                <BiTimeFive size="20px" />
                Time left:
              </Flex>
              <Text fontWeight="bold">{`00:${
                timeLeft < 10 ? `0${timeLeft}` : timeLeft
              }`}</Text>
            </Flex>

            <Progress
              w="full"
              mt={2}
              color={`linear-gradient(to right, green ${countdownProgress}%, red 0%)`}
              size={"xs"}
              value={countdownProgress}
            />

          </CardBody>
        </Card>
      )}
      <Card h={"350px"}>
        <CardHeader
          bg={"gray.100"}
          borderColor={"gray.100"}
          borderBottom={2}
        >
          <Heading textColor={"gray.500"} size="md">
            Question {data.question.question_id} of {data.questionsTotal}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack>
            <Heading textColor={"gray.500"} size="md" mb={"2"}>
              {data.question.title}
            </Heading>
            {full ? (
              <RadioGroup name="answerId" size={"lg"}>
                {data.question.answers.map((answer, index) => (
                  <Stack mt={2} mb={2}>
                    <Radio
                      key={answer.id}
                      isChecked={index === 0}
                      value={answer.id}
                    >
                      <Flex>
                        <Text mr={2} fontWeight={"bold"}>
                          {String.fromCharCode(answer.answer_id + 64).toUpperCase()}
                          .
                        </Text>
                        {answer.title}
                      </Flex>
                    </Radio>
                  </Stack>
                ))}
              </RadioGroup>
            ) : (
              <>
                {data.question.answers.map((answer, index) => (
                  <>
                    <Stack mt={2} mb={2}>
                      <Flex>
                        <Text mr={2} fontWeight={"bold"}>
                          {String.fromCharCode(answer.answer_id + 64).toUpperCase()}
                          .
                        </Text>
                        {answer.title}
                      </Flex>
                    </Stack>
                  </>
                ))}
              </>
            )}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
