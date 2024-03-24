import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

export type HotelFormData = {
    name : string;
    city : string;
    country : string;
    description : string;
    type : string;
    pricePerNight : number;
    starRating:number;
    facilities: string[];
    imageFiles: FileList;
    adultCount : number;
    childCount : number;
}

const ManageHotelForms = () => {
    const FormMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...FormMethods}>
        <form>
            <DetailsSection />
        </form>
    </FormProvider>
  )
}

export default ManageHotelForms