import { faker } from "@faker-js/faker";
import type { User } from "../types/types";

export const generateUsers = (count: number): User[] => {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(["Admin", "User", "Editor", "Viewer"]),
      createdAt: faker.date.past(),
      password: faker.internet.password(),
      active: faker.datatype.boolean(),
      latitude: faker.address.latitude(), // parseFloat gerekmez, zaten number döner
      longitude: faker.address.longitude(), // parseFloat gerekmez
    });
  }

  return users;
};
