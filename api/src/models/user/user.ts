export class User {
  // Mandatory fields
  displayName: string;
  email: string;
  roles: string;

  // Optional fields
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
