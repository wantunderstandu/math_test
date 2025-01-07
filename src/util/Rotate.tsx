import { useEffect, useState } from "react";

export default function Rotate(){
    const [rotateX, setRotateX]=useState<number>(0);

    useEffect(() => {
        const animate = () => {
            setRotateX(prev => prev + 0.01); // 逐帧增加rotateX的值
            requestAnimationFrame(animate); // 请求下一个动画帧
        };
        animate(); // 开始动画
    }, []);
    return rotateX;
  } 