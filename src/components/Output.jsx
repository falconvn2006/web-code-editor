import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { executeCode } from "../api";
import { useState } from "react";

const Output = ({editorRef, language, inputEditorRef}) => {
    const toast = useToast()
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        const sourceInp = inputEditorRef.current.getValue();
        if (!sourceCode) return;

        try{
            setIsLoading(true)
            const {data:result} = await executeCode(language, sourceCode, sourceInp)
            setOutput(result["stdout"].split("\n"))

            if(result["status"]["id"] != 3 && result["status"]["id"] != 5)
            {
                setIsError(true)
                result["stderr"] ? setOutput(result["stderr"]) : "There is something wrong with your code"
            }
            else if(result["status"]["id"] == 5)
            {
                setIsError(true)
                toast({
                    title: "Time Limit Exceeded.",
                    description: "Your code ran longer than our time limit",
                    status: "error",
                    isClosable: true,
                    duration: 6000
                })
            }
            if(result["status"]["id"] == 3)
            {
                setIsError(false)
                toast({
                    title: "Finished running code",
                    description: "Your code has been successfully executed",
                    status: "success",
                    isClosable: true,
                    duration: 2000
                })
            }
        }
        catch(error){
            console.log(error);
            toast({
                title: "An error occured.",
                description: error.message || "Unable to run code.",
                status: "error",
                isClosable: true,
                duration: 6000
            })
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">Output</Text>
            <Button
                variant='outline'
                colorScheme="green"
                mb={4}
                onClick={runCode}
                isLoading={isLoading}
            >
                Run
            </Button>
            <Box
                height='75vh'
                p={2}
                color={
                    isError ? "red.400" : ""
                }
                border='1px solid'
                borderRadius={4}
                borderColor={
                    isError ? "red.500" : "#333"
                }
            >
                {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : "Click Run to execute the code"}
            </Box>
        </Box>
    )
}

export default Output;

