import { Box, Button, HStack } from "@chakra-ui/react";
import { TabList, Tab, Tabs, TabPanel, TabPanels } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";

import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

import { LANGUAGE_EXTENSION, STARTER_CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {

    const editorRef = useRef();
    const inpEditorRef = useRef();

    const [language, setLanguage] = useState("python")
    const [inpValue, setInpValue] = useState("")
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
        setValue(
            STARTER_CODE_SNIPPETS[language]
        )
    }

    const saveFile = async (blob, name, extension) => {
        const a = document.createElement('a');
        a.download = name + extension;
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
          setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
      };

    return (
        <Box>
            <HStack spacing={4}>
                <Box w="50%">
                    <Tabs>
                        <TabList>
                            <Tab>Code Editor</Tab>
                            <Tab>Input Editor</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <HStack spacing={4}>
                                    <Box ml={2} mb={4} w="50%">
                                        <LanguageSelector language={language} onSelect={onSelect} />
                                    </Box>
                                    <Box w="50%">
                                        <Button onClick={() => {
                                            const data = new Blob([value], {type: "application/plaintext"})
                                            saveFile(data, "code", LANGUAGE_EXTENSION[language])
                                        }}>
                                            Download
                                        </Button>
                                    </Box>
                                </HStack>
                                <Editor
                                    height='75vh'
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
                                <Editor
                                    height='75vh'
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