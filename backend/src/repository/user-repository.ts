import { Sequelize } from 'sequelize';
import { User } from '../models/user';

export class UserRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async findOneByEmail(email: string) {
    const result = await this.sequelize.models.User.findOne({ where: { email } })
    return result ? result.get() as User : null
  }
}