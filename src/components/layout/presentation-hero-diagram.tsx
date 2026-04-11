// @file: src/components/layout/presentation-hero-diagram.tsx
type PresentationHeroDiagramProps = {
  nodes: string[];
};

const nodePositions = [
  "presentation-hero-node presentation-hero-node--top",
  "presentation-hero-node presentation-hero-node--right",
  "presentation-hero-node presentation-hero-node--bottom",
  "presentation-hero-node presentation-hero-node--left",
] as const;

export default function PresentationHeroDiagram({
  nodes,
}: PresentationHeroDiagramProps) {
  return (
    <div className="presentation-glass presentation-hero-shell">
      <div className="presentation-hero-diagram">
        <div className="presentation-hero-ring" />
        <div className="presentation-hero-grid-lines" />
        {nodes.slice(0, 4).map((node, index) => (
          <div key={node} className={nodePositions[index]}>
            {node}
          </div>
        ))}
        <div className="presentation-hero-core">
          <span>🔐</span>
        </div>
      </div>
    </div>
  );
}
