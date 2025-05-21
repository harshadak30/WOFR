import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import countries from "world-countries";

interface FormData {
  name: string;
  organization: string;
  Industry_Sector: string;
  Tax_ID: string;
  Address: string;
  Country: { label: string; value: string } | null;
  Postal_Code: string;
  Date_of_Incorporation?: string;
}

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

const CompanyProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {};

  return (
    <div className="bg-cover bg-center flex items-center justify-center">
      <div className="flex-1 w-full max-w-3xl px-0">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full mx-auto my-10">
          <h2 className="text-3xl font-medium text-gray-800 text-center mb-8">
            Company Details Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Organization name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <input
                  {...register("organization", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="organization Type"
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm">
                    {errors.organization.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Sector
                </label>
                <input
                  {...register("Industry_Sector", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Industry_Sector Name"
                />
                {errors.Industry_Sector && (
                  <p className="text-red-500 text-sm">
                    {errors.Industry_Sector.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Incorporation
                </label>
                <input
                  type="date"
                  {...register("Date_of_Incorporation")}
                  className="w-full px-4 py-4 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Date of incorportation"
                />
              </div>
            </div>

            <div className="pt-8 pb-4">
              <button
                type="submit"
                className="w-full sm:w-3/5 mx-auto block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition duration-300 text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
