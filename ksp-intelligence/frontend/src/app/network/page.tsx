"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { BrainCircuit, Info, AlertTriangle } from "lucide-react";
import type cytoscape from "cytoscape";

const CytoscapeComponent = dynamic(() => import("react-cytoscapejs"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-muted-foreground text-sm">Loading network graph...</div>
    </div>
  ),
});

export default function NetworkPage() {
  const [selectedEdge, setSelectedEdge] = useState<Record<string, unknown> | null>(null);

  const elements = useMemo(() => [
    // Nodes
    { data: { id: 'c1', label: 'Suspect A', type: 'Suspect' }, classes: 'suspect' },
    { data: { id: 'v1', label: 'Vehicle B', type: 'Vehicle' }, classes: 'vehicle' },
    { data: { id: 'case1', label: 'Case C (Theft)', type: 'Case' }, classes: 'case' },
    { data: { id: 'p1', label: 'Phone D', type: 'Phone' }, classes: 'phone' },
    { data: { id: 'g1', label: 'Gang E', type: 'Gang' }, classes: 'gang' },
    
    // Edges
    { data: { source: 'c1', target: 'v1', label: 'Owns', id: 'e1', hidden: false } },
    { data: { source: 'v1', target: 'case1', label: 'Spotted at scene', id: 'e2', hidden: false } },
    { data: { source: 'case1', target: 'p1', label: 'Pinged near scene', id: 'e3', hidden: false } },
    { data: { source: 'p1', target: 'g1', label: 'Registered to', id: 'e4', hidden: false } },
    
    // AI Hidden Link
    { data: { source: 'c1', target: 'g1', label: 'AI Discovered Link', id: 'hidden1', isHiddenLink: true }, classes: 'ai-link' },
  ], []);

  // Prevent Cytoscape animation frames from outliving a React dev-mode remount.
  const layout = useMemo(() => ({ name: 'circle', padding: 50, animate: false }), []);

  const stylesheet = useMemo<cytoscape.Stylesheet[]>(() => [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-margin-y': 5,
        'color': '#fff',
        'font-size': '12px',
      }
    },
    { selector: '.suspect', style: { 'background-color': '#ef4444' } },
    { selector: '.vehicle', style: { 'background-color': '#8b5cf6', 'shape': 'rectangle' } },
    { selector: '.case', style: { 'background-color': '#3b82f6', 'shape': 'hexagon' } },
    { selector: '.phone', style: { 'background-color': '#10b981', 'shape': 'diamond' } },
    { selector: '.gang', style: { 'background-color': '#f59e0b', 'shape': 'star' } },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#475569',
        'target-arrow-color': '#475569',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': '10px',
        'color': '#94a3b8',
        'text-rotation': 'autorotate',
        'text-margin-y': -10
      }
    },
    {
      selector: '.ai-link',
      style: {
        'line-color': '#f43f5e',
        'target-arrow-color': '#f43f5e',
        'line-style': 'dashed',
        'width': 3,
        'color': '#f43f5e',
        'font-weight': 'bold'
      }
    }
  ], []);

  const handleEdgeTap = useCallback((evt: cytoscape.EventObject) => {
    if (evt.target.data('isHiddenLink')) setSelectedEdge(evt.target.data());
  }, []);

  const initializeGraph = useCallback((cy: cytoscape.Core) => {
    cy.off('tap', 'edge', handleEdgeTap);
    cy.on('tap', 'edge', handleEdgeTap);
  }, [handleEdgeTap]);


  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 flex flex-col space-y-6 min-h-[600px]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-primary" /> Hidden Connection Discovery
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered multi-hop relationship extraction from Neo4j.</p>
        </div>

        <div className="flex-1 bg-[#0f172a] border border-border rounded-xl shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-destructive/20 border border-destructive text-destructive px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-3 h-3" /> Indirect Connection Found
            </div>
          </div>
          
          <div className="flex-1 w-full h-full">
            <CytoscapeComponent 
              elements={elements} 
              layout={layout} 
              stylesheet={stylesheet}
              style={{ width: '100%', height: '100%' }} 
              cy={initializeGraph}
            />
          </div>
        </div>
      </div>

      {/* AI Explanation Sidebar */}
      <div className="w-full lg:w-96 bg-card border border-border rounded-xl shadow-sm p-6 overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Explainable Intelligence</h3>
        </div>

        {!selectedEdge ? (
          <div className="text-center text-muted-foreground mt-12 space-y-4">
            <BrainCircuit className="w-12 h-12 mx-auto opacity-50" />
            <p>Click on the dashed red <span className="text-destructive font-bold">AI Discovered Link</span> in the graph to view the reasoning logic.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Discovery Path</h4>
              <p className="font-medium text-lg leading-tight">
                Suspect A <span className="text-muted-foreground text-sm font-normal">indirectly tied to</span> Gang E
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <h4 className="font-bold text-sm mb-3">Multi-Hop Reasoning</h4>
              <ol className="relative border-l border-border ml-2 space-y-4">
                <li className="pl-4 relative">
                  <div className="w-2 h-2 bg-primary rounded-full absolute -left-[5px] top-1.5"></div>
                  <span className="text-sm">Suspect A owns Vehicle B (KA-01-XX).</span>
                </li>
                <li className="pl-4 relative">
                  <div className="w-2 h-2 bg-primary rounded-full absolute -left-[5px] top-1.5"></div>
                  <span className="text-sm">Vehicle B was spotted by CCTV near Case C.</span>
                </li>
                <li className="pl-4 relative">
                  <div className="w-2 h-2 bg-primary rounded-full absolute -left-[5px] top-1.5"></div>
                  <span className="text-sm">Phone D pinged the cell tower at Case C exactly at the time of the incident.</span>
                </li>
                <li className="pl-4 relative">
                  <div className="w-2 h-2 bg-primary rounded-full absolute -left-[5px] top-1.5"></div>
                  <span className="text-sm">Phone D is officially registered to a known frontman for Gang E.</span>
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-between bg-background border border-border rounded-lg p-4">
              <span className="font-bold">AI Confidence</span>
              <span className="text-2xl font-black text-orange-500">74%</span>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
              Generate Intelligence Dossier
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



