import { conectedDatabase } from "../authenticat";
import { User } from "../models/user";

export const userRepository = conectedDatabase.getRepository(User)