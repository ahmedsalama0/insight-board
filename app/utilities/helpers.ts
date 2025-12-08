'use client';
import { Note } from '../tasks/models/types.model';
import { generateId } from '../tasks/page';

export function createNote(): Note {
  return {
    id: generateId(),
    content: 'untitled',
  };
}
