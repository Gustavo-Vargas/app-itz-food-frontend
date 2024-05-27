import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinessSection from "./CuisinessSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
	.object({
		restauranteName: z.string({
			required_error: "El nombre del restaurante es requerido",
		}),
		city: z.string({
			required_error: "El nombre de la ciudad es requerido",
		}),
		country: z.string({
			required_error: "El nombre del pais es requerido",
		}),
		deliveryPrice: z.coerce.number({
			required_error: "El precio de entrega es requerido",
			invalid_type_error:
				"El tipo estimado de entrega debe ser un número valido",
		}),

		estimatedDeliveryTime: z.coerce.number({
			required_error: "El tiempo estimado de enterga es requerido",
			invalid_type_error:
				"El tiempo estimado de entrega debe ser un número valido",
		}),

		cuisines: z.array(z.string()).nonempty({
			message: "Por favor selecciona un item de cocina",
		}),

		menuItems: z.array(
			z.object({
				name: z.string().min(1, "nombre es requerido"),
				price: z.coerce.number().min(1, "precio es requerido"),
			})
		),
		imageUrl: z.string().optional(),
		imageFile: z
			.instanceof(File, { message: "Imagen es requerida" })
			.optional(),
	}).refine( (data) => 
		data.imageUrl || data.imageFile, 
		{
			message: "Se debe proporcionar un archivo de imagen o la URL de la imagen",
			path: ["imageFile"],
		}
	
); // FIn de formSchema

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
	restaurant?: Restaurant;
	onSave: (restaurantFormData: FormData) => void;
	isLoading: boolean;
};

export default function ManageRestaurantForm({
	onSave,
	isLoading,
	restaurant,
}: Props) {
	const form = useForm<RestaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: "", price: 0 }],
		},
	});

	useEffect(() => {
		if (!restaurant) return;

		// Cargamos los precios y los formateamos a numerico
		// toFixed se utiliza para asignar dos decimales al valor numérico
		const deliveryPriceFormatted = parseInt(
			restaurant.deliveryPrice.toFixed(2)
		);

		// Damos formato a los menuItems
		const menuItemsFormatted = restaurant.menuItems.map((item) => ({
			...item,
			price: item.price,
		}));

		// Cargamos los datos restantes extaidos del backend de la
		// variable restaurant en updatedRestaurant y los complementos
		// con los datos formateados
		const updatedRestaurant = {
			...restaurant,
			deliveryPrice: deliveryPriceFormatted,
			menuItems: menuItemsFormatted,
		};

		// Asignamos los datos del restaurante cargado en udpatedRestaurant
		// al formulario
		form.reset(updatedRestaurant);
	}, [form, restaurant]); // FIn de useEffect

	const onSubmit = (formDataJson: RestaurantFormData) => {
		// Convertimos los datos del formulario a un objeto formData
		console.log(formDataJson);
		const formData = new FormData();

		formData.append("restauranteName", formDataJson.restauranteName);

		formData.append("city", formDataJson.city);
		formData.append("country", formDataJson.country);
		formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
		formData.append(
			"estimatedDeliveryTime",
			formDataJson.estimatedDeliveryTime.toString()
		);

		formDataJson.cuisines.forEach((cuisine, index) => {
			formData.append(`cuisines[${index}]`, cuisine);
		});

		formDataJson.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name);
			formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
		});

		// Verificamos que exista l aimagen para nuevo resaturante
		if (formDataJson.imageFile) {
			formData.append("imageFile", formDataJson.imageFile);
		}

		onSave(formData);
	}; // FIn de onSubmit

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 bg-gray-50 p-10 rounded-lg"
			>
				<DetailsSection />
				<Separator />
				<CuisinessSection />
				<Separator />
				<MenuSection />
				<Separator />
				<ImageSection />
				{isLoading ? <LoadingButton /> : <Button type="submit">Guardar</Button>}
			</form>
		</Form>
	);
}
