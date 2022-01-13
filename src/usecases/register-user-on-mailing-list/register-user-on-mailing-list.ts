import { User, UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { UseCase } from '@/usecases/ports'

export class RegisterUserOnMailingList implements UseCase {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async perform (user: User): Promise<UserData> {
    const userData = { name: user.name.value, email: user.email.value }
    if (!(await this.userRepo.exists(userData))) {
      await this.userRepo.add(userData)
    }

    return userData
  }
}
