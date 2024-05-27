import {
	useCreateRestaurant,
	useGetRestaurante,
	useUpdateRestaurant,
} from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
	const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant();
	const { restaurant } = useGetRestaurante();
	const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant();

	const isEditting = !!restaurant;

	return (
		<ManageRestaurantForm
			restaurant={restaurant}
			onSave={isEditting? updateRestaurant : createRestaurant}
			isLoading={isCreateLoading || isUpdateLoading}
		/>
	);
}
