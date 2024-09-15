interface UserProfile {
    userId: string
    race: string
    salary: number
    jobTitle: string
    company: string
    yearsOfExperience: number
  }
  
  let users: UserProfile[] = [];
  
  export function readUsers(): UserProfile[] {
    return users;
  }
  
  export function writeUsers(data: UserProfile[]): void {
    users = data;
  }
  
  export function updateOrCreateUser(newUserData: UserProfile): UserProfile {
    try {
      console.log('Updating or creating user:', newUserData);
      const existingUserIndex = users.findIndex(user => user.userId === newUserData.userId);
  
      if (existingUserIndex !== -1) {
        users[existingUserIndex] = newUserData;
      } else {
        users.push(newUserData);
      }
  
      console.log('User updated successfully');
      return newUserData;
    } catch (error) {
      console.error('Error updating or creating user:', error);
      throw error;
    }
  }