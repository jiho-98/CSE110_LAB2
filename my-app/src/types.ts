export enum Label {
    personal = "personal",
    work = "work",
    study = "study",
    other = "other",
  }

  export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    liked: boolean;
  };