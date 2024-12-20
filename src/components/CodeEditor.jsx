import { Box, HStack } from "@chakra-ui/react";
import { TabList, Tab, Tabs, TabPanel, TabPanels } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";

import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

import { STARTER_CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {

    const editorRef = useRef();
    const inpEditorRef = useRef();

    const [value, setValue] = useState("")
    const [inpValue, setInpValue] = useState("")
    const [language, setLanguage] = useState("python")

    

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
                                <LanguageSelector language={language} onSelect={onSelect} />
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