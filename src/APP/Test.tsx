

// export default function Test() {

//     return (
//         <>
        
//         </>
//     )
// }

import React, { useState } from "react";
import { Button, Flex, Input } from "antd";

export default function Chat() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

    const onClick = async () => {
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            setResponse(data); // 更新状态显示响应
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div id="chat" style={{ width: "100%", height: "90%", border: "1px solid #ccc", marginBottom: "3em", overflowY: "auto" }}>
                {/* 显示聊天记录 */}
                {response && <p>{JSON.stringify(response)}</p>}
            </div>
            <Flex gap={"2em"}>
                <Input placeholder="输入你的疑问" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button onClick={onClick}>确定</Button>
            </Flex>
        </>
    );
}