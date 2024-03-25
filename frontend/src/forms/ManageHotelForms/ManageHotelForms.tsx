import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

const ManageHotelForms = () => {
    const FormMethods = useForm<HotelFormData>();
    const { handleSubmit } = FormMethods;

    const onSubmit = handleSubmit((formData : HotelFormData)=>{console.log(formData)})
  return (
    <FormProvider {...FormMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestSection />
            <ImagesSection />
            <span className="flex justify-end">
              <button type="submit" className="bg-blue-600 text-white p-2 font-bold cursor-pointer text-xl hover:bg-blue-500">Save</button>
            </span>
        </form>
    </FormProvider>
  )
}

export default ManageHotelForms