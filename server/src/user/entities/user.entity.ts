import * as bcrypt from 'bcrypt'
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IUser} from '../interfaces/user.interface'

enum ERoles {
	Admin = 'admin',
	User = 'user'
}

@Entity()
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	login: string

	@Column()
	password: string

	@Column({default: ERoles.User})
	role: ERoles

	@Column({
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP(3)',
	})
	created_at: Date

	@Column({
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP(3)',
		onUpdate: 'CURRENT_TIMESTAMP(3)',
	})
	updated_at: Date

	async validatePassword(password: string) {
		return await bcrypt.compare(password, this.password)
	}
}
