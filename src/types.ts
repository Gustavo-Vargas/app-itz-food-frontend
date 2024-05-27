export type MenuItem = {
	_id: string;
	name: string;
	price: number;
};

export type Restaurant = {
	_id: string;
	user: string;
	restauranteName: string;
	city: string;
	country: string;
	deliveryPrice: number;
	estimatedDeliveryTime: number;
	cuisines: string[];
	menuItems: MenuItem[];
	imageUrl: string;
	lastUpdated: string;
};
