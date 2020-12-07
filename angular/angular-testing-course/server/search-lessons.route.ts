import { Request, Response } from 'express';
import { LESSONS } from './db-data';
import { setTimeout } from 'timers';

export function searchLessons(req: Request, res: Response) {
  const courseId: number = +req.query.courseId,
    filter = req.query.filter || '',
    sortOrder = req.query.sortOrder,
    pageNumber: number = +req.query.pageNumber || 0,
    pageSize: number = +req.query.pageSize;

  let lessons = Object.values(LESSONS)
    .filter(lesson => lesson.courseId == courseId)
    .sort((l1, l2) => l1.id - l2.id);

  if (filter) {
    lessons = lessons.filter(
      lesson =>
        lesson.description
          .trim()
          .toLowerCase()
          .search(filter.toString().toLowerCase()) >= 0
    );
  }

  if (sortOrder == 'desc') {
    lessons = lessons.reverse();
  }

  const initialPos = pageNumber * pageSize;

  const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

  setTimeout(() => {
    res.status(200).json({ payload: lessonsPage });
  }, 1000);
}
