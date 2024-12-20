import { Box, Button, HStack, useToast, Input } from "@chakra-ui/react";
import { TabList, Tab, Tabs, TabPanel, TabPanels } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";

import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

import { LANGUAGE_EXTENSION, STARTER_CODE_SNIPPETS } from "../constants";
import { DownloadIcon } from "@chakra-ui/icons";

const CodeEditor = () => {

    const toast = useToast()

    const editorRef = useRef();
    const inpEditorRef = useRef();

    const [language, setLanguage] = useState("python")
    const [inpValue, setInpValue] = useState("")
    const [isFile, setIsFile] = useState(false)
    const [value, setValue] = useState(STARTER_CODE_SNIPPETS[language])

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const onInpMount = (editor) => {
        inpEditorRef.current = editor;
        editor.focus();
    }

    const onSelect = (language) => {
        setLanguage(language)
        if(!isFile)
            setValue(STARTER_CODE_SNIPPETS[language])
    }

    const saveFile = async (blob, name, extension) => {
        const a = document.createElement('a');
        a.download = name + extension;
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
          setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();

        toast({
            title: name + extension + " has successfully downloaded!",
            status: "success",
            isClosable: true,
            duration: 2000
        })
    };

    const handleCodeUpload = async (event) => {
        event.preventDefault();

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = (event.target.result);
            const name = (event.target);
            setValue(text);
            setIsFile(true);
            toast({
                title: "File has successfully imported.",
                description: "Please change the language to your file's programming languange (if necessary)",
                status: "success",
                isClosable: true,
                duration: 4000
            })  
        };

        reader.readAsText(event.target.files[0])
    }

    const handleInputUpload = async (event) => {
        event.preventDefault();

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = (event.target.result);
            const name = (event.target);
            setInpValue(text);
            toast({
                title: "File has successfully imported.",
                status: "success",
                isClosable: true,
                duration: 4000
            })  
        };

        reader.readAsText(event.target.files[0])
    }

    return (
        <Box>
            <HStack spacing={4}>
                <Box w="60%">
                    <Tabs>
                        <TabList>
                            <Tab>Code Editor</Tab>
                            <Tab>Input Editor</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <HStack spacing={4}>
                                    <Box w="100%" ml={2} mb={4}>
                                        <LanguageSelector language={language} onSelect={onSelect} />
                                    </Box>
                                    <Box w="50%" ml={2} mb={4}>
                                        <Button onClick={() => {
                                            const data = new Blob([value], {type: "application/plaintext"})
                                            saveFile(data, "code", LANGUAGE_EXTENSION[language])
                                        }}>
                                            <DownloadIcon />&nbsp;Download
                                        </Button>
                                        <Box mt={4}>
                                            <Input type="file" onChange={handleCodeUpload} />
                                        </Box>
                                    </Box>
                                </HStack>
                                <Editor
                                    height='70vh'
                                    theme="vs-dark"
                                    language={language}
                                    defaultValue={STARTER_CODE_SNIPPETS[language]}
                                    value={value}
                                    onMount={onMount}
                                    onChange={
                                        (value) => setValue(value)
                                    } 
                                />
                            </TabPanel>

                            <TabPanel>
                                <Box w={500} ml={2} mb={3}>
                                    <Button onClick={() => {
                                        const data = new Blob([inpValue], {type: "application/plaintext"})
                                        saveFile(data, "input", ".txt")
                                    }}>
                                        <DownloadIcon />&nbsp;Download
                                    </Button>
                                    <Input mt={3} type="file" onChange={handleInputUpload} />
                                </Box>
                                <Editor
                                    height='70vh'
                                    theme="vs-dark"
                                    language="plaintext"
                                    defaultValue=""
                                    value={inpValue}
                                    onMount={onInpMount}
                                    onChange={
                                        (val) => setInpValue(val)
                                    } 
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Output editorRef={editorRef} language={language} inputEditorRef={inpEditorRef} />
            </HStack>
        </Box>
    )
};

export default CodeEditor;