// 确保安装了所需的类型定义，例如 @types/node 如果你在Node.js环境中运行
// npm install --save-dev @types/node

export async function GetBearer(): Promise<void> {
    const endpoint = "https://aip.baidubce.com";
    const params = new URLSearchParams({
        grant_type: 'client_credentials', // 这个参数通常是必需的
        client_id: "IFzXsaeEAw9oQXn9ZnfwIXF8",
        client_secret: "CkriZ4CKur6rMknFhT181417Mrjlcihh"
    });

    try {
        const response = await fetch(`${endpoint}/v1/BCE-BEARER/token?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("object: ", data);
    } catch (error) {
        console.error("error: ", error);
    }
}
