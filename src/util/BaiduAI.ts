

async function BaiduAI(question: string) {
    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/api/proxy/invoke',
        'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ',
                'appid': '116683520'
        },
        data: JSON.stringify({
                "model": "ernie-4.0-8k-latest",
                "messages": [
                        {
                                "role": "user",
                                "content": question,
                        }
                ],
                "disable_search": false,
                "enable_citation": false
        })

    };

    const res=fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.data,
    }).then(response => console.log(response.json()))
    console.log(res)
}

export default BaiduAI;

