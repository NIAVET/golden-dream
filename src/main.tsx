
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MobileStatusIndicator from '@/components/mobile/MobileStatusIndicator'

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <MobileStatusIndicator />
  </>
);
