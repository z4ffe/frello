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
				login: true,
				created_at: true,
			},
		})
	}

	async createUser({login, password}: CreateUserDto) {
		const isUserExist = await this.findUserByLogin(login)
		if (isUserExist) {
			throw new ConflictException('User already exist')
		}
		const hashedPassword = await this.hashPassword(password)
		const user = {
			login,
			password: hashedPassword,
		}
		const newUser = this.userRepository.create(user)
		return await this.userRepository.save(newUser)
	}

	async updateUserPassword(body: UpdateUserDto) {
		const {login, password, newPassword} = body
		const user = await this.findUserByLogin(login)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const passwordCorrect = await user.validatePassword(password)
		if (!passwordCorrect) {
			throw new UnauthorizedException('Password incorrect')
		}
		const hashedPassword = await this.hashPassword(newPassword)
		return await this.userRepository.update({login}, {password: hashedPassword})
	}

	async removeUserByLogin(body: DeleteUserDto) {
		const {login, password} = body
		const user = await this.findUserByLogin(login)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const isPasswordValid = await user.validatePassword(password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Password incorrect')
		}
		return await this.userRepository.delete({login})
	}

	async findUserByLogin(login: string) {
		return await this.userRepository.findOneBy({login})
	}

	async hashPassword(password: string) {
		return await bcrypt.hash(password, +this.ConfigService.getOrThrow('SALT_ROUNDS'))
	}
}
