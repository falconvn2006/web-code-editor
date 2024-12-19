import axios from "axios"
import { LANGUAGE_CODE_NUMBER } from "./constants";

export const executeCode = async (language, sourceCode) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'false',
          wait: 'true',
          fields: '*'
        },
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_JUDGE_ZERO_KEY,
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          language_id: LANGUAGE_CODE_NUMBER(language),
          "source_code": sourceCode,
          "stdin": ""
        }
    };

    const response = axios.request(options)
    return response
}