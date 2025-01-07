import ReactMarkdown from "react-markdown"


export default function Introduction() {
    const markdown = `
# **欢迎来到我们的世界**

## 接下来我将为您介绍我们做了什么以及我们能为您做些什么

### 1.为您展示趣味空间几何学课程上展示过的十三种数学模型


### 2.您可以通过方程式立体化的展示其相关三维模型


### 3.您可以通过大语言模型解答您有关空间几何学的相关知识

---

# **以下是我们课程中涉及到的十三种数学模型**

[圆柱](/cylinder)

[三棱柱](/triangularprism)

[圆锥](/cone)

[旋转椭球面](/rotationalellipsoid)

[圆环面](/torus)

[爱心曲面](/heartsurface)

[双叶旋转双曲面](/hyperboloidoftwosheets)

[椭球面](/ellipsoidalsurface)

[单页双曲面](/hyperboloidofonesheet)

[马鞍面](/saddlesurface)

[克莱因瓶](/Klein)

[海螺面](/seashell)

[莫比乌斯环](/mobiusstrip)

`;
    return(
        <>
            {/* <div style={{width: "100%", height: "100%"}}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div> */}
        </>
    )
}