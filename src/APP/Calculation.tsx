import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import Input from 'antd/es/input/Input';
import { Button, Flex } from 'antd';
import { create, all } from 'mathjs';

const math = create(all);

interface SurfaceProps {
  equation: (x: number, y: number) => number;
}

function Surface({ equation }: SurfaceProps) {
  const vertices = [];
  const size = 20;
  const segments = 64;

  for (let xi = 0; xi <= segments; xi++) {
    for (let yi = 0; yi <= segments; yi++) {
      const x = (xi / segments - 0.5) * size;
      const y = (yi / segments - 0.5) * size;
      const z = equation(x, y);
      vertices.push(x, y, z);
    }
  }

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color="hotpink" wireframe />
    </mesh>
  );
}

function Axes() {
  const length = 100;
  return (
    <>
      {/* X轴 */}
      <Line points={[[-length, 0, 0], [length, 0, 0]]} color="red" lineWidth={2} />
      {/* Y轴 */}
      <Line points={[[0, -length, 0], [0, length, 0]]} color="green" lineWidth={2} />
      {/* Z轴 */}
      <Line points={[[0, 0, -length], [0, 0, length]]} color="blue" lineWidth={2} />
    </>
  );
}

export default function Calculation() {
  const [equationString, setEquationString] = useState('');
  const [parsedEquation, setParsedEquation] = useState<(x: number, y: number) => number>();
  const [clearModel, setClearModel] = useState(false); // 新增状态控制是否清空模型

  // 处理用户输入并解析方程
  const onClick = () => {
    try {
      const parsed = math.parse(equationString); // 解析输入的方程字符串
      // 创建一个能够计算z值的函数
      const equation = (x: number, y: number) => {
        const scope = { x, y }; // 为方程提供x, y的值
        return parsed.evaluate(scope); // 计算并返回z值
      };
      setParsedEquation(() => equation); // 更新状态，设置新的方程
      setClearModel(true); // 清空模型
      setTimeout(() => setClearModel(false), 50); // 过短时间后重置清空状态
    } catch (error) {
      console.error("解析方程时出错:", error);
      alert("方程解析失败，请检查输入");
    }

    // try {
    //   const parsed = math.parse(equationString); // 解析输入的方程字符串
    //   // 创建一个能够计算z值的函数
    //   const equation = (x: number, y: number) => {
    //     const scope = { x, y }; // 为方程提供x, y的值
    //     return parsed.evaluate(scope); // 计算并返回z值
    //   };
      
    //   // 只有在没有出现错误的情况下才设置新的方程和清空模型
    //   setParsedEquation(equation);
    //   setClearModel(true);
    //   setTimeout(() => setClearModel(false), 50);
    // } catch (error) {
    //   console.error("解析方程时出错:", error);
    //   alert("方程解析失败，请检查输入");
    //   // 如果解析失败，我们不做任何状态更新以保持当前的模型不变
    // }
  };


  // const onClick = () => {
  //   // 简单的正则表达式，用于验证输入是否为可能的数学表达式
  //   const validMathExpRegex = /^[0-9\+\-\*\/$$\.\^\sxXyY\s]*$/;
  
  //   if (!validMathExpRegex.test(equationString)) {
  //     alert("请输入有效的数学表达式");
  //     return;
  //   }
  
  //   try {
  //     const parsed = math.parse(equationString); // 解析输入的方程字符串
  //     // 创建一个能够计算z值的函数
  //     const equation = (x: number, y: number) => {
  //       const scope = { x, y }; // 为方程提供x, y的值
  //       return parsed.evaluate(scope); // 计算并返回z值
  //     };
      
  //     // 只有在成功解析方程后才设置新的方程和清空模型
  //     setParsedEquation(equation);
  //     setClearModel(true);
  //     setTimeout(() => setClearModel(false), 50);
  //   } catch (error) {
  //     console.error("解析方程时出错:", error);
  //     alert("方程解析失败，请检查输入");
  //     // 如果解析失败，我们不做任何状态更新以保持当前的模型不变
  //   }
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick(); // 按下 Enter 键时触发按钮点击事件
    }
  };
  return (
    <>
      <div style={{ width: "100%", height: "20%" }}>
        <Flex gap={"2em"}>
          <Input
            placeholder="输入方程,例如:x^2 + y^2"
            value={equationString}
            onChange={(e) => setEquationString(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={onClick}>确定</Button>
        </Flex>
      </div>
      <div style={{ width: "100%", height: "80%" }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* 如果方程已被解析且模型需要清空，则渲染新模型 */}
          {clearModel ? null : parsedEquation && <Surface equation={parsedEquation} />}
          <Axes />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
