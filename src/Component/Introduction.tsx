import ReactMarkdown from "react-markdown"


export default function Introduction() {
    const markdown = `
# **欢迎来到我们的世界**

接下来我将为您介绍我们做了什么以及我们能为您做些什么

`;
    return<ReactMarkdown>{markdown}</ReactMarkdown>
}