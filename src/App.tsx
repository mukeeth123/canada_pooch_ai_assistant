import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { AiFitFinder } from './pages/AiFitFinder';
import { WhyThisSize } from './pages/WhyThisSize';
import { FitVisualization } from './pages/FitVisualization';
import { ProductRecommendations } from './pages/ProductRecommendations';
import { ReturnRiskPredictor } from './pages/ReturnRiskPredictor';
import { UserInteractions } from './pages/UserInteractions';
import { FutureRoadmap } from './pages/FutureRoadmap';
import { ExecutiveROI } from './pages/ExecutiveROI';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/fit-finder" element={<AiFitFinder />} />
            <Route path="/why-this-size" element={<WhyThisSize />} />
            <Route path="/fit-visualization" element={<FitVisualization />} />
            <Route path="/recommendations" element={<ProductRecommendations />} />
            <Route path="/return-risk" element={<ReturnRiskPredictor />} />
            <Route path="/interactions" element={<UserInteractions />} />
            <Route path="/roadmap" element={<FutureRoadmap />} />
            <Route path="/roi-dashboard" element={<ExecutiveROI />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
