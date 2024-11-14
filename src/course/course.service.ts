import { Injectable } from '@nestjs/common';
import { TopologicalSort } from './utils/toplogicalSort';

@Injectable()
export class CourseService {
  getCourses() {
    const topologicalSort = new TopologicalSort();
    topologicalSort.createEdgeRelation();
    topologicalSort.startTopologicalSort();
    return topologicalSort.orderedNodes;
  }
}
