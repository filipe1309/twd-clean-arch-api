import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { UserData } from '@/entities'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (exists) {
      throw new Error('User already exists')
    }

    this.repository.push(user)
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const user = this.repository.find(user => user.email === email)
    return user || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    if (await this.findUserByEmail(user.email) === null) {
      return null
    }
    return true
  }
}
