import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";


const DetailsSection = () => {

    const {register, formState : {errors} } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
          Name
          <input
            type="text" className="border rounded w-full py-1 px-2 font-normal"
            {...register("name", { required: "This field is required" })}
          ></input>
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
    </div>
  )
}

export default DetailsSection
