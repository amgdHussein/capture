import { FirebaseConfiguration } from '../configurations';

export class Environment {
	constructor(
		public production: boolean,
		public firebaseConfigs: FirebaseConfiguration,
	) {}
}
