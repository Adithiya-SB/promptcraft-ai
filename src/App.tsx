import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Studio } from './pages/Studio';
import { TemplatesPage } from './pages/TemplatesPage';
import { AboutPage } from './pages/AboutPage';
import { ManualPage } from './pages/ManualPage';
import { Layout } from './components/Layout/Layout';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAppStore } from './store';

function App() {
    const { theme } = useAppStore();

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/studio" element={<Studio />} />

                {/* Authenticated/App Routes */}
                <Route element={<Layout />}>
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>

                <Route path="/about" element={<AboutPage />} />
                <Route path="/manual" element={<ManualPage />} />
            </Routes>
        </Router>
    );
}

export default App;
