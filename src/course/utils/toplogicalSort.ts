export class TopologicalSort {
  courses = {
    userId: '30ecc27b-9df7-4dd3-b52f-d001e79bd035',
    courses: [
      {
        desiredCourse: 'PortfolioConstruction',
        requiredCourse: 'PortfolioTheories',
      },
      {
        desiredCourse: 'InvestmentManagement',
        requiredCourse: 'Investment',
      },
      {
        desiredCourse: 'Investment',
        requiredCourse: 'Finance',
      },
      {
        desiredCourse: 'PortfolioTheories',
        requiredCourse: 'Investment',
      },
      {
        desiredCourse: 'InvestmentStyle',
        requiredCourse: 'InvestmentManagement',
      },
    ],
  };
  nodes = new Map<string, { edges: Set<string>; visited?: boolean }>();
  orderNodes: Record<string, number> = {};
  orderedNodes = [];

  createEdgeRelation() {
    for (const node of this.courses.courses) {
      const requiredNode = this.nodes.get(node.requiredCourse);
      if (requiredNode) {
        this.nodes.set(node.requiredCourse, {
          edges: new Set([...requiredNode.edges, node.desiredCourse]),
        });
      } else {
        this.nodes.set(node.requiredCourse, {
          edges: new Set([node.desiredCourse]),
        });
      }

      if (!this.nodes.get(node.desiredCourse)) {
        this.nodes.set(node.desiredCourse, { edges: new Set([]) });
      }
    }
    return this.nodes;
  }

  setNodePosition(
    node: { edges: Set<string>; visited?: boolean },
    position: number,
    nodeName: string,
  ) {
    node.visited = true;
    for (const edge of node.edges) {
      if (this.nodes.get(edge) && !this.nodes.get(edge).visited) {
        position = this.setNodePosition(this.nodes.get(edge), position, edge);
      }
    }
    this.orderNodes[nodeName] = position;
    this.orderedNodes.unshift(nodeName);
    return position - 1;
  }

  addNodesWithoutEdges(position: number) {
    for (const [nodeName, nodeValue] of this.nodes) {
      if (nodeValue.edges.size === 0) {
        nodeValue.visited = true;
        this.orderedNodes.unshift(nodeName);
        this.orderNodes[nodeName] = position;
        position = position - 1;
      }
    }
    return position;
  }

  startTopologicalSort() {
    let position = this.nodes.size - 1;
    position = this.addNodesWithoutEdges(position);
    for (const [nodeName, nodeValue] of this.nodes) {
      if (!nodeValue.visited)
        position = this.setNodePosition(nodeValue, position, nodeName);
    }
  }
}
