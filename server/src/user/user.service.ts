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

	async findAll() {
		return await this.userRepository.find({
			select: {
				id: true,
				username: true,
				createdAt: true,
			},
		})
	}

	async create({username, password, firstName, lastName, avatar, country}: CreateUserDto) {
		const isUserExist = await this.findByName(username)
		if (isUserExist) {
			throw new ConflictException('User already exist')
		}
		const hashedPassword = await bcrypt.hash(password, +this.ConfigService.getOrThrow('SALT_ROUNDS'))
		const user = {
			username: username.trim(),
			password: hashedPassword,
			firstName, lastName, avatar, country,
		}
		const newUser = this.userRepository.create(user)
		await this.userRepository.save(newUser)
		return {message: 'User created'}
	}

	async updatePassword(body: UpdateUserDto) {
		const {username, password, newPassword} = body
		const user = await this.findByName(username)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const passwordCorrect = await user.validatePassword(password)
		if (!passwordCorrect) {
			throw new UnauthorizedException('Password incorrect')
		}
		const hashedPassword = await bcrypt.hash(password, +this.ConfigService.getOrThrow('SALT_ROUNDS'))
		return await this.userRepository.update({username: username}, {password: hashedPassword})
	}

	async remove(body: DeleteUserDto) {
		const {username, password} = body
		const user = await this.findByName(username)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const isPasswordValid = await user.validatePassword(password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Password incorrect')
		}
		return await this.userRepository.delete({username: username})
	}

	async findByName(username: string) {
		return await this.userRepository.findOneBy({username})
	}
}
