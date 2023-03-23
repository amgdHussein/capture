import { Environment } from './environment';

const configs = {
	apiKey: 'AIzaSyDv3tJ3J2JITNY-A62tdZUR3yiftJg4Noc',
	authDomain: 'capture-2112.firebaseapp.com',
	projectId: 'capture-2112',
	storageBucket: 'capture-2112.appspot.com',
	messagingSenderId: '57217416469',
	appId: '1:57217416469:web:80fb0201c74fd368393d1c',
	measurementId: 'G-SHKFNEH5F4',
};

export const environment = new Environment(true, configs);
