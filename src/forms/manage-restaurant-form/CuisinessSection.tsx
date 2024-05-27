import {
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";
import { cuisineList } from "@/config/restaurant-options-config";

export default function CuisinessSection() {
	const { control } = useFormContext();

	return (
		<div className="space-y-2">
			<div>
				<h2 className="text-2xl font-bold">Cocinas</h2>
				<FormDescription>
					Selecciona el tipo de cocina que el restaurante servirá
				</FormDescription>
			</div>
			<FormField
				control={control}
				name="cuisines"
				render={({ field }) => (
					<FormItem>
						<div className="grid md:grid-cols-5 gap-1">
							{cuisineList.map((cuisineItem) => (
								<CuisineCheckbox cuisine={cuisineItem} field={field} />
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
