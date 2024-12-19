export const LANGUAGE_VERSIONS = {
    python: "3.12.5",
    cpp: "GCC 14.1.0",
    java: "JDK 17.0.6",
    csharp: "Mono 6.6.0.161",
}

export const STARTER_CODE_SNIPPETS = {
    python: `print(\"Hello World!\")`,
    cpp: `#include<iostream>\n\nusing namespace std;\n\nint main(){\n\n\tcout << \"Hello World!\" << endl;\n\treturn 0;\n\n}`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
}

export const LANGUAGE_CODE_NUMBER = (language) => {
    switch (language) {
        case "python":
            return 100;
        case "cpp":
            return 105;
        case "java":
            return 91;
        case "csharp":
            return 51;
        default:
            break;
    }
}