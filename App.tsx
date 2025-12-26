
import React, { useState } from 'react';
import { Screen } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './screens/DashboardView';
import ImportView from './screens/ImportView';
import ResultsView from './screens/ResultsView';
import EngineView from './screens/EngineView';
import SettingsView from './screens/SettingsView';
import DesignSystemView from './screens/DesignSystemView';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <DashboardView />;
      case 'import': return <ImportView />;
      case 'results': return <ResultsView />;
      case 'engine': return <EngineView />;
      case 'settings': return <SettingsView />;
      case 'design-system': return <DesignSystemView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-200">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default App;
