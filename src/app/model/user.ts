export class User {
  public userId!: string;
  public username: string;
  public password!: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public profileImageUrl!: string;
  public loginDateDisplay!: Date;
  public joinDate!: Date;
  public role: string;
  public authorities: [];
  public active: boolean;
  public notLocked: boolean;

  constructor() {
    this.username = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.role = '';
    this.authorities = [];
    this.active = false;
    this.notLocked = false;
  }
}
