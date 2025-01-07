import "babel-polyfill"

import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TorusKnotGeometry from './Component/TorusKnotGeometry';
import Klein from './Component/Klein';
import NotFound from './APP/NotFound';
import Main from './APP/Main';
import Introduction from './Component/Introduction';
import Cylinder from './Component/Cylinder';
import Test from './APP/Test';
import Calculation from './APP/Calculation';
import Torus from './Component/Torus';
import Cone from './Component/Cone';
import MobiusStrip from './Component/MobiusStrip';
import Seashell from './Component/Seashell';
import TriangularPrism from './Component/TriangularPrism';
import RotationalEllipsoid from './Component/RotationalEllipsoid';
import HeartSurface from './Component/HeartSurface';
import Hyperboloidoftwosheets from './Component/Hyperboloidoftwosheets';
import EllipsoidalSurface from './Component/EllipsoidalSurface';
import Hyperboloidofonesheet from './Component/Hyperboloidofonesheet';
import Saddlesurface from './Component/Saddlesurface';
import Chat from './APP/Chat';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router >
    <Routes>
      <Route path="/" element={<Main Main_Content={<Introduction/>} />} />
      <Route path='/cylinder' element={<Main Main_Content={<Cylinder/>} />} />
      <Route path='/cone' element={<Main Main_Content={<Cone/>} />} />
      <Route path='/torus' element={<Main Main_Content={<Torus/>} />} />
      <Route path='/Klein' element={<Main Main_Content={<Klein/>}></Main>} />
      <Route path='/mobiusstrip' element={<Main Main_Content={<MobiusStrip/>}></Main>}/>
      <Route path='/seashell' element={<Main Main_Content={<Seashell/>}></Main>}/>
      <Route path="/torusKnotGeometry" element={<TorusKnotGeometry/>} />
      <Route path='/triangularprism' element={<Main Main_Content={<TriangularPrism/>}></Main>}/>
      <Route path='/rotationalellipsoid' element={<Main Main_Content={<RotationalEllipsoid/>}></Main>}/>
      <Route path='/heartsurface' element={<Main Main_Content={<HeartSurface/>}></Main>}/>
      <Route path='/calculation' element={<Main Main_Content={<Calculation/>}></Main>} />
      <Route path='/hyperboloidoftwosheets' element={<Main Main_Content={<Hyperboloidoftwosheets/>}></Main>}/>
      <Route path='/ellipsoidalsurface' element={<Main Main_Content={<EllipsoidalSurface/>}></Main>}/>
      <Route path='/saddlesurface' element={<Main Main_Content={<Saddlesurface/>}></Main>}/>
      <Route path='/hyperboloidofonesheet' element={<Main Main_Content={<Hyperboloidofonesheet/>}></Main>}/>
      <Route path="/test" element={<Test/>} />
      <Route path='/chat' element={<Main Main_Content={<Chat></Chat>}></Main>}/>
      <Route path='*' element={<NotFound/>} />
    </Routes>
  </Router>
)

