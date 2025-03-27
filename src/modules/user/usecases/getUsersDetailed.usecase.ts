export type FindDetailedUsersResponse = {
	id: string;
	email: string;
	profileImage?: string;
	role: {
		id: string;
		name: string;
		accessLevel: number;
	}[];
	boards: {
		id: string;
		name: string;
	}[];
}[];
