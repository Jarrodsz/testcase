import React from "react";
import { FiMenu } from "react-icons/fi";

import { Link } from "@remix-run/react";

import { Logo } from "./Logo";

import { Box, Button, ButtonGroup, Container, Flex, HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box as="section" pb={{ base: "10", md: "10" }}>
      <Box as="nav" bg="bg-surface">
        <Container py={{ base: "4", lg: "5" }}>
          <HStack justify="space-between" spacing="10">
            <Link to="/">
              Re-Data
            </Link>

              <Flex justify="space-between" flex="2">
                <ButtonGroup spacing="8" variant="link">
                  {/*start main nav*/}
                  {/*end main nav*/}
                  <HStack spacing="3">
                    <Link to={"/login"}>
                      <Button variant="ghost">Sign in</Button>
                    </Link>
                    <Link to={"/signup"}>
                      <Button variant="primary">Sign up</Button>
                    </Link>
                  </HStack>
                </ButtonGroup>
              </Flex>

          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
