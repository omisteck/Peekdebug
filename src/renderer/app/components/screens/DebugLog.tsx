import ActionToolbar from "../layouts/ActionToolbar";
import LogEntry from "./log-screen/LogEntry";
import { useEffect, useState } from "react";
import { PeekPayloadSchema } from '../../../../shared/types/log-entry.schema';
import { z } from "zod";
import Confetti from "../shared/Confetti";
import TipsSection from "./TipsSection";

interface Tab {
  id: string;
  isActive: boolean;
  logs: z.infer<typeof PeekPayloadSchema>[];
}

const CONFETTI_DURATION = 4000;
const CONFETTI_COLORS = ['#C2EB2C', '#0C2501', '#90EE90', '#4CAF50'];

function DebugLog() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchResults, setSearchResults] = useState<z.infer<typeof PeekPayloadSchema>[]>([]);

  const [tabs, setTabs] = useState<Tab[]>([
    { id: `tab-${Date.now()}`, isActive: true, logs: [] }
  ]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    const handleNewLog = (log: z.infer<typeof PeekPayloadSchema>) => {

      if (log.payloads.find(payload => payload.type === 'confetti')) {
        setShowConfetti(true);
      }

      setTabs(prevTabs => {
        if (prevTabs.length === 0) {
          return [{ id: `tab-${Date.now()}`, isActive: true, logs: [log] }];
        }

        const activeTab = prevTabs.find(tab => tab.isActive);
        if (!activeTab) {
          return [...prevTabs, { id: `tab-${Date.now()}`, isActive: true, logs: [log] }];
        }

        return prevTabs.map(tab => 
          tab.id === activeTab.id 
            ? { ...tab, logs: [...tab.logs, log] }
            : tab
        );
      });
    };

    window.api.on('new-log', handleNewLog);
    
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, CONFETTI_DURATION);

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);


  
  const tipsData = {
    tips: [
      "In PHP, you can use `peek()` to debug variables",
      "Debug your models with `peek()->model($user)`",
      "Need to monitor events? Use `peek()->showEvents()`"
    ],
    linkText: "Read the",
    links: [
      { text: "docs", url: "https://omisio.gitbook.io/peek" },
      { text: "0.0.1 release notes", url: "https://omisio.gitbook.io/peek" }
    ]
  };



  return (
    <ActionToolbar 
      tabs={tabs} 
      setTabs={setTabs} 
      activeTabIndex={activeTabIndex} 
      setActiveTabIndex={setActiveTabIndex}
      setSearchResults={setSearchResults}
    >
      <div className="h-[calc(100vh-theme(spacing.16))] !font-mono w-full overflow-auto p-6">
        {showConfetti && <Confetti colors={CONFETTI_COLORS} />}
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            className={`h-full max-w-5xl mx-auto ${tab.isActive ? 'block' : 'hidden'}`}
          >
            {tab.isActive && searchResults.length > 0 && (
              <div className="space-y-6">
                {searchResults.map((log) => (
                  log.payloads.map((payload, index) => (
                    <LogEntry key={`${log.uuid}-${index}`} {...payload} />
                  ))
                ))}
              </div>
            )}

            {searchResults.length === 0 && tab.logs?.length > 0 && (
              <div className="space-y-6">
                {tab.logs.map(log => 
                  log.payloads.map((payload, index) => (
                    <LogEntry key={`${log.uuid}-${index}`} {...payload} />
                  ))
                )}
              </div>
            )}

            {searchResults.length === 0 && (tab.isActive && tab.logs.length === 0) && (
              <div className="h-full flex items-center justify-center px-10">
                <TipsSection {...tipsData} buyMeCoffeeUrl="https://buymeacoffee.com/omisio" />
              </div>
            )}
          </div>
        ))}
      </div>
    </ActionToolbar>
  );
}

export default DebugLog;
