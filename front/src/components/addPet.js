

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedsById } from '../store/slices/petSlice';

const AddPet = () => {


    const { categories, breeds } = useSelector((state) => state.pet);
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");

    const initialValues = {
        category: '',
        breed: '',
        name: '',
        gender: '',
        age: '',
        knowAge: '',
        dob: {
            month: "1",
            year: "2020",
            day: "1"
        }

    };

    const validationSchemas = [
        Yup.object({
            category: Yup.string().required('Category is required'),
        }),
        Yup.object({
            breed: Yup.string().required('Breed is required'),
            name: Yup.string().required('Name is required'),
            gender: Yup.string().required('Gender is required'),
        }),
        Yup.object({
            age: Yup.number()
                .required('Age is required')
                .min(0, 'Age must be greater than or equal to 0'),
        }),
    ];

    const handleNext = (values) => {
        if (step === 1) {
            const category = categories.find((item) => item.id == values.category);
            setSelectedCategory(category.name);
            dispatch(getBreedsById(values.category))
        }
        if (step < 3) setStep(step + 1);
        else console.log('Final Values:', values); // Submit form values
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };


    const renderStep = (values, setValues) => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <Field
                            name="category"
                            as="select"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Category</option>
                            {categories.map((item) => {
                                return <option value={item.id}>{item.name}</option>
                            })}
                        </Field>
                        <ErrorMessage
                            name="category"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>
                );
            case 2:
                return (
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mt-4"> What is your {selectedCategory} Name</label>
                        <Field
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />


                        <label className="block text-sm font-medium text-gray-700">What is your {selectedCategory} Breed</label>
                        <Field
                            name="breed"
                            as="select"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Breed</option>
                            {breeds.map((item) => {
                                return <option value={item.id}>{item.name}</option>
                            })}
                        </Field>
                        <ErrorMessage
                            name="breed"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />


                        <label className="block text-sm font-medium text-gray-700 mt-4">Gender</label>


                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                onClick={() => { setValues({ ...values,'gender': 'Male' }) }}
                                type="button" className={(values.gender === "Male" ? "text-white bg-blue-500" : "text-gray-900 bg-white") + " px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white "}>
                                Male
                            </button>

                            <button
                                onClick={() => { setValues({ ...values, 'gender': 'Female' }) }}
                                type="button" className={(values.gender === "Female" ? "text-white bg-blue-500" : "text-gray-900 bg-white") + " px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:border-gray-700 dark:text-white"}>
                                Female
                            </button>
                        </div>


                        <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Did you know their date of birth?</label>

                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                onClick={() => { setValues({ ...values, 'knowAge': 'Yes' }) }}
                                type="button" className={(values.knowAge === "Yes" ? "text-white bg-blue-500" : "text-gray-900 bg-white") + " px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white "}>
                                Yes
                            </button>

                            <button
                                onClick={() => { setValues({ ...values, 'knowAge': 'No' }) }}
                                type="button" className={(values.knowAge === "No" ? "text-white bg-blue-500" : "text-gray-900 bg-white") + " px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:border-gray-700 dark:text-white"}>
                                No
                            </button>
                        </div>

                        {values.knowAge === "No" && <>
                            <label className="block text-sm font-medium text-gray-700">Age</label>

                            <Field
                                name="age"
                                type="number"
                                placeholder="Enter age"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            />

                            <ErrorMessage
                                name="age"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </>
                        }

                        {values.knowAge === "Yes" && <>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>

                            <div class="flex gap-4">
                                <div class="flex-1 text-center">
                                    <Field
                                        name="dob.month"
                                        type="number"
                                        placeholder="Month"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div class="flex-1 text-center">
                                    <Field
                                        name="dob.day"
                                        type="number"
                                        placeholder="Day"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div class="flex-1 text-center">
                                    <Field
                                        name="dob.year"
                                        type="number"
                                        placeholder="Year"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            </div>





                            <ErrorMessage
                                name="age"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </>
                        }


                        <label className="block text-sm font-medium text-gray-700">Is Dangerous animal?</label>

                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                onClick={() => { setValues({ ...values, 'dangerous': 'Yes' }) }}
                                type="button" className={(values.dangerous === "Yes" ? "text-white bg-blue-500" : "text-gray-900 bg-white") + " px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white "}>
                                Yes
                            </button>

                            <button
                                onClick={() => { setValues({ ...values, 'dangerous': 'No' }) }}
                                type="button" className={(values.dangerous === "No" ? "text-white bg-blue-500" : "text-gray-900 bg-white") + " px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:border-gray-700 dark:text-white"}>
                                No
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div id="readProductModal" tabindex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <h1 className="text-xl font-bold text-center mb-4">Create New Pet</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchemas[step - 1]}
                        onSubmit={handleNext}
                    >
                        {({ values, setValues }) => (
                            <Form>
                                {renderStep(values, setValues)}

                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        disabled={step === 1}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                                    >
                                        {step === 1 ? 'Close' : 'Previous'}
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        {step === 3 ? 'Submit' : 'Next'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddPet;