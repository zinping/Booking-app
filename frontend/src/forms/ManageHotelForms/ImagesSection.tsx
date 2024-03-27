import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: {errors} } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="rounded border p-4 flex flex-col g-4">
                <input type="file" multiple accept="file/*" className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;

                            if (totalLength === 0) {
                                return "At least one image should be added"
                            }
                            if (totalLength > 6) {
                                return "total number of image cannot be greater than 6"
                            }

                            return true;
                        }
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}
                </span>
            )}
        </div>
    )
}

export default ImagesSection