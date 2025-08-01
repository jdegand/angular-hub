export type CallForPapers = {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  logo: string | null;
  location: string | null;
  callForPapersUrl: string;
}

export type EventCallForPapers = CallForPapers & {
  date: string;
  callForPapersDueDate: string | null;
  isRemote: boolean;
  isOnsite: boolean;
};
