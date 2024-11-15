import { CourseDto } from '../course.dto';

export class TopologicalSort {
  courses: CourseDto[] = [];

  constructor(courses: CourseDto[]) {
    this.courses = courses;
  }

  nodes = new Map<string, { edges: Set<string>; visited?: boolean }>();
  orderedNodes = [];

  createEdgeRelation() {
    for (const node of this.courses) {
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
    this.orderedNodes.unshift(nodeName);
    return position - 1;
  }

  addNodesWithoutEdges(position: number) {
    for (const [nodeName, nodeValue] of this.nodes) {
      if (nodeValue.edges.size === 0) {
        nodeValue.visited = true;
        this.orderedNodes.unshift(nodeName);
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
