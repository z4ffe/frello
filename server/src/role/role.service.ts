import {BadRequestException, Injectable, Logger} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateRoleDto} from './dto/CreateRoleDto'
import {Role} from './entities/role.entity'

@Injectable()
export class RoleService {
	private readonly logger = new Logger('RoleService')

	constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
	}

	async create({name}: CreateRoleDto) {
		const isRoleExist = await this.roleRepository.findOneBy({name})
		if (isRoleExist) {
			throw new BadRequestException('Role already exist')
		}
		const role = await this.roleRepository.save({name: name})
		return {message: `Role ${name} created`}
	}
}