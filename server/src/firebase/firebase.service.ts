import {Injectable} from '@nestjs/common'
import admin from 'firebase-admin'
import {getDownloadURL} from 'firebase-admin/storage'

@Injectable()
export class FirebaseService {
	private readonly storage: admin.storage.Storage
	private readonly avatarsFolder: string = 'avatars'
	private readonly docsFolder: string = 'docs'

	constructor() {
		if (!admin.apps.length) {
			const serviceAccount = require('../../firebase.json')
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
				storageBucket: 'frello-98d48.appspot.com',
			})
			this.storage = admin.storage()
		}
	}

	getStorageInstance() {
		return this.storage
	}

	async uploadAvatar(avatar: Express.Multer.File, username: string) {
		if (!avatar) {
			return ''
		}
		const extension = avatar.originalname.split('.').at(-1)
		const fileName = `${username}.${extension}`
		const FILE_PATH = `${this.avatarsFolder}/${fileName}`
		await this.storage.bucket().file(FILE_PATH).save(avatar.buffer, {
			resumable: true,
			metadata: {
				contentType: avatar.mimetype,
			},
		})
		const file = this.storage.bucket().file(FILE_PATH)
		return await getDownloadURL(file)
	}
}