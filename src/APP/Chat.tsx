import { Button, Flex } from "antd";
import Input from "antd/es/input/Input";

export default function Chat(){

    async function get(){
        const res= await fetch("http://localhost:8080/element/answer",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        return res
    }
    
    const test=()=>{
        const res=get().then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
    }

    return (
        <>
            <div id="chat" style={{width: "100%",height:"90%",border:"1px solid #ccc",marginBottom:"3em"}}></div>
            <Flex gap={"2em"}>
                <Input placeholder="输入你的疑问"></Input>
                <Button onClick={test}>测试</Button>
            </Flex>
        </>
    )
}