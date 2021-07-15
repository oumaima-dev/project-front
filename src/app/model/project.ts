export class Project{
    id: string;
    name: string;
    description: string;
    shortIdea: string;
    fundGoal: number;
    creationDate: Date;
    endDate: Date;
    category: string;
    imgUrl: string;
    announcement: Announcement[];
    projectOwner: string;
}

export class Announcement{
  id: string;
  message: string;
  annCreationDate: Date;
}
export enum Category {
  Business,
  Charity}
