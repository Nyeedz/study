import { Request, Response } from 'express';
import { LESSONS } from './db-data';
import { setTimeout } from 'timers';

export function searchLessons(req: Request, res: Response) {
  const courseId: number = +req.query.courseId;

  res.status(200).json({
    payload: Object.values(LESSONS).filter(
      lesson => lesson.courseId === courseId
    )
  });
}
