import React, { FormEvent, useState } from "react";
import "./App.css";
import axiosInstance from "./utils/axiosSetup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import apiContants from "./constants/api";

function App() {
  const [file, setFile] = useState<FileList | null | undefined>();
  const [filePath, setFilePath] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    if (file && file?.length > 0)
      axiosInstance
        .post(
          apiContants.UPLOAD_FILE,
          { file: file[0] },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.data.path) {
            setLoader(false);
            setFilePath(res.data.data.path);
            setError("");
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log(err.response.data.message);
          if (err.response.data.message) setError(err.response.data.message);
        });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            File Upload Task
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          // bg={useColorModeValue('white', 'gray.700')}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={error ? true : false} id="file">
                <FormLabel>File</FormLabel>
                <Input
                  type={"file"}
                  placeholder="Basic usage"
                  placeItems={"center"}
                  onChange={(e) => setFile(e.target.files)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  gap={6}
                >
                  File Upload {loader && <Spinner />}
                </Button>
              </Stack>
            </form>
            {filePath && (
              <Stack spacing={10} pt={2}>
                <Link
                  textDecoration={"none"}
                  href={`${apiContants.SERVER_URL}${apiContants.DOWNLOAD_FILE}?file=${filePath}`}
                >
                  <Button>Download</Button>
                </Link>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default App;
