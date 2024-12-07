import { Flex } from "antd"
import { Typography as Text } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound(){
    const navigate= useNavigate();
    
    return(
        <>  
            <Flex vertical justify="center" align="center" style={{marginTop:"10%"}}>
                <Text.Text style={{fontSize:"10em"}} strong>
                    404
                </Text.Text>
                <Text.Text style={{fontSize:"2em"}} strong >
                    Not Found
                </Text.Text>
                <Text.Text>
                    Oops! The page you're looking for cannot be found.
                </Text.Text>
                <Text.Text onClick={(()=>{navigate("/")})} style={{cursor:"pointer"}} strong underline>
                    返回首页
                </Text.Text>
            </Flex>
        </>
    )
}