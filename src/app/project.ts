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
    announcement: Announcement;
}

export class Announcement{
  id: string;
  message: string;
}

enum Category {
    Business,
    Charity}
