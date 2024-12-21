import { useEffect, useState } from "react";
import AddPet from "../components/addPet";
import axiosInstance from "../util/axiosInstance";

const Pets = () => {

    const [pets, setPates] = useState([]);

    useEffect(() => {

        getPets()



    }, [])
    const getPets = async () => {
        const res = await axiosInstance.get("pets");
        setPates(res.data || []);
    }
    const [showAddModal, setShowAddModal] = useState(false)
    return (
        <div className="shadow-md dark:bg-gray-800">
            <section className="bg-gray-50 dark:bg-gray-900 items-center ">
                <div className="max-w-screen-xl w-full">
                    <div className="relative bg-white">
                        <div className="flex flex-col items-center  justify-end p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">

                            <button
                                onClick={() => setShowAddModal(true)}
                                id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bread
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => {
                            return (
                                <tr key={pet.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pet.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pet.category?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pet.breed?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pet.age}
                                        {pet.isDanger == 1 && <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Danger</span>}
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
            {showAddModal &&
                <AddPet handleClose={(reload) => {
                    if (reload) {
                        getPets()
                    }
                    setShowAddModal(false);

                }} />}

        </div>

    )
}

export default Pets;