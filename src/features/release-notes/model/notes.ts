export interface ReleaseNote {
  date: string;
  titleKey: string;
  contentKey: string;
}

export const releaseNotes: ReleaseNote[] = [
  {
    date: "2024-06-01",
    titleKey: "release_notes.notes.note_2024_06_01.title",
    contentKey: "release_notes.notes.note_2024_06_01.content",
  },
  {
    date: "2024-05-20",
    titleKey: "release_notes.notes.note_2024_05_20.title",
    contentKey: "release_notes.notes.note_2024_05_20.content",
  },
];
