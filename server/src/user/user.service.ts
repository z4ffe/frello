import {ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {InjectRepository} from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import {Repository} from 'typeorm'
import {CreateUserDto} from './dto/createUserDto'
import {DeleteUserDto} from './dto/deleteUserDto'
import {UpdateUserDto} from './dto/updateUserDto'
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
	private readonly logger = new Logger('UserService')

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly ConfigService: ConfigService) {
	}

	async getAllUsers() {
		return await this.userRepository.find({
			select: {
				id: true,
				username: true,
				createdAt: true,
			},
		})
	}

	async createUser({username, password}: CreateUserDto) {
		const isUserExist = await this.findUserByUserName(username)
		if (isUserExist) {
			throw new ConflictException('User already exist')
		}
		const hashedPassword = await this.hashPassword(password)
		const user = {
			username: username,
			password: hashedPassword,
		}
		const newUser = this.userRepository.create(user)
		return await this.userRepository.save(newUser)
	}

	async updateUserPassword(body: UpdateUserDto) {
		const {username, password, newPassword} = body
		const user = await this.findUserByUserName(username)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const passwordCorrect = await user.validatePassword(password)
		if (!passwordCorrect) {
			throw new UnauthorizedException('Password incorrect')
		}
		const hashedPassword = await this.hashPassword(newPassword)
		return await this.userRepository.update({username: username}, {password: hashedPassword})
	}

	async removeUser(body: DeleteUserDto) {
		const {username, password} = body
		const user = await this.findUserByUserName(username)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const isPasswordValid = await user.validatePassword(password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Password incorrect')
		}
		return await this.userRepository.delete({username: username})
	}

	async findUserByUserName(username: string) {
		return await this.userRepository.findOneBy({username})
	}

	async hashPassword(password: string) {
		return await bcrypt.hash(password, +this.ConfigService.getOrThrow('SALT_ROUNDS'))
	}
}
