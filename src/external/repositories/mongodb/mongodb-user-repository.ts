import { UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { MongoHelper } from './helper'

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user)
    if (!exists) {
      const userClone = { ...user }
      await userCollection.insertOne(userClone)
    }
  }

  async exists (user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    return !!result
  }

  async findUserByEmail (email: string): Promise<any> {
    const userCollection = MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email: email })
    return user
  }

  async findAllUsers (): Promise<any[]> {
    return await MongoHelper.getCollection('users').find().toArray()
  }
}
