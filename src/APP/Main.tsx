import  { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  BarChartOutlined,
  FileOutlined,
  MessageFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavigationType, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function Main(props:{Main_Content:JSX.Element}) {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const [selectedKey, setSelectedKey] = useState('1');
    const handleClick = (e: any) => {
        setSelectedKey(e.key);
        switch (e.key) {
            case '1':
                navigate('/');
                break;
            case '1-1-1':
                navigate('/cylinder');
                break;
            case '1-1-2':
                navigate('/triangularprism');
                break;
            case '1-2-1':
                navigate('/cone');
                break;
            case '1-3-1':
                navigate('/rotationalellipsoid');
                break;
            case '1-3-2':
                navigate('/torus');
                break;
            case '1-3-3':
                navigate('/heartsurface');
                break;
            case '1-3-4':
                navigate('/hyperboloidoftwosheets');
                break;
            case '1-4-1':
                navigate('/ellipsoidalsurface');
                break;
            case '1-4-2':
                navigate('/hyperboloidofonesheet');
                break;
            case '1-4-3':
                navigate('/saddlesurface');
                break;
            case '1-5-1':
                navigate('/Klein')
                break;

            case '1-5-2':
                navigate('/seashell');
                break;

            case '1-5-3':
                navigate('/mobiusstrip');
                break;
            case '3':
                navigate('/calculation');
                break;
            case '4':
                navigate('/chat');
                break;

        }
    }

    return(
        <>
            <div id='main-container' style={{ width: '100vw', height: '100vh' }}>
                <Layout style={{ height: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={collapsed} width={"20em"} style={{overflowY: 'auto',maxHeight: '100vh'}}>
                        <div className="demo-logo-vertical" />
                            <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[selectedKey]}
                            onClick={handleClick}
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <FileOutlined />,
                                    label: '文档介绍',
                                },
                                {
                                key: '2',
                                icon: <UserOutlined />,
                                label: '三维模型展示',
                                children:[
                                    {
                                        key: '1-1',
                                        label:'柱面',
                                        children:[
                                            {
                                                key:'1-1-1',
                                                label:'圆柱',
                                            },{
                                                key:'1-1-2',
                                                label:'三棱柱'
                                            }
                                        ]
                                    },{
                                        key: '1-2',
                                        label:'锥面',
                                        children:[{
                                            key:'1-2-1',
                                            label:'圆锥'
                                        }]
                                    },{
                                        key: '1-3',
                                        label:'旋转曲面',
                                        children:[{
                                            key:'1-3-1',
                                            label:'旋转椭球面'
                                        },{
                                            key:'1-3-2',
                                            label:'圆环面'
                                        },{
                                            key:'1-3-3',
                                            label:'爱心曲面'
                                        },{
                                            key:'1-3-4',
                                            label:'双叶旋转双曲面'
                                        }
                                        ]
                                    },{
                                        key: '1-4',
                                        label:'二次曲面',
                                        children:[{
                                            key:'1-4-1',
                                            label:'椭球面'
                                        },{
                                            key:'1-4-2',
                                            label:'单页双曲面'
                                        },{
                                            key:'1-4-3',
                                            label:'马鞍面'
                                        }
                                        ]
                                    },{
                                        key: '1-5',
                                        label:'异性曲面',
                                        children:[{
                                            key:'1-5-1',
                                            label:'克莱因瓶'
                                        },{
                                            key:'1-5-2',
                                            label:'海螺面',
                                        },{
                                            key:'1-5-3',
                                            label:'莫比乌斯环'
                                        }]
                                    }
                                    
                                ]},
                                {
                                key: '3',
                                icon: <BarChartOutlined />,
                                label: '旋转体计算三维展示',
                                },
                                {
                                key: '4',
                                icon:<MessageFilled />,
                                label: 'LLM 问答',
                                },
                            ]}
                            />
                        </Sider>
                        <Layout>
                            <Header style={{ padding: 0, background: colorBgContainer }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                }}
                            />
                            </Header>
                            <Content
                            style={{
                                overflowY: 'auto',maxHeight: '100vh',
                                margin: '24px 16px',
                                padding: 40,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                            >
                                {props.Main_Content}
                            </Content>
                        </Layout>
                </Layout>
            </div>
        </>
    )
}