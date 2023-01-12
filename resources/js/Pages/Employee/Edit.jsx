import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, InertiaLink, useForm, usePage} from '@inertiajs/inertia-react';
import Subheader from "@/Pages/Employee/Partials/Subheader";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import SelectInput from "@/Components/SelectInput";
import AllowanceInput from "@/Pages/Door/Partials/AllowanceInput";
import {useState} from "react";


export default function Edit({auth}) {
    const employee = usePage().props.employee;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        ranges: [],
        entry_allowance: employee.entry_allowance ?? [],
        exit_allowance: employee.exit_allowance ?? [],
    });

    function addentry_allowance() {
        let nextId = data.entry_allowance.length + 1
        setData('entry_allowance', [...data.entry_allowance, {
            'id': nextId,
            "min": "00:00",
            "max": "23:59"
        }])
    }

    function setentry_allowance(id, type, newValue) {

        let objIndex = data.entry_allowance.findIndex((obj => obj.id === id));
        let array = data.entry_allowance;
        array[objIndex][type] = newValue;
        setData('entry_allowance', array)
    }

    function addexit_allowance() {
        let nextId = data.exit_allowance.length + 1
        setData('exit_allowance', [...data.exit_allowance, {
            'id': nextId,
            "min": "00:00",
            "max": "23:59"
        }])
    }

    function setexit_allowance(id, type, newValue) {

        let objIndex = data.exit_allowance.findIndex((obj => obj.id === id));
        let array = data.exit_allowance;
        array[objIndex][type] = newValue;
        setData('exit_allowance', array)
    }

    function handleSubmit(e) {
        e.preventDefault();
        patch(route("employees.update", employee.id));
    }

    console.log(errors)

    let allowance_inputs = data.entry_allowance.map((item) => {
        return (<div key={item.id} className="columns-2">
                <div key={"min_"}>
                    <TextInput key={"min_" + item.id}
                               type="time"
                               id="ranges"
                               name="ranges[]"
                               value={item['min'] ?? "00:00"}
                               className="mt-1 block w-full"
                               handleChange={(e) => setentry_allowance(item.id, 'min', e.target.value)}
                               required
                               isFocused
                               autoComplete="ranges"
                    />

                    <InputError className="mt-2" message={errors.ranges}/>
                </div>
                <div key={"max_" + item.id}>
                    <TextInput key={"max_"}
                               type="time"
                               id="ranges"
                               name="ranges[]"
                               value={item['max'] ?? "23:59"}
                               className="mt-1 block w-full"
                               handleChange={(e) => setentry_allowance(item.id, 'max', e.target.value)}
                               required
                               isFocused
                               autoComplete="ranges"
                    />

                    <InputError className="mt-2" message={errors.ranges}/>
                </div>
            </div>

        )
    })
    let allowance_exit_inputs = data.exit_allowance.map((item) => {
        return (<div key={item.id} className="columns-2">
                <div key={"min_"}>
                    <TextInput key={"min_" + item.id}
                               type="time"
                               id="ranges"
                               name="ranges[]"
                               value={item['min'] ?? "00:00"}
                               className="mt-1 block w-full"
                               handleChange={(e) => setexit_allowance(item.id, 'min', e.target.value)}
                               required
                               isFocused
                               autoComplete="ranges"
                    />

                    <InputError className="mt-2" message={errors.ranges}/>
                </div>
                <div key={"max_" + item.id}>
                    <TextInput key={"max_"}
                               type="time"
                               id="ranges"
                               name="ranges[]"
                               value={item['max'] ?? "23:59"}
                               className="mt-1 block w-full"
                               handleChange={(e) => setexit_allowance(item.id, 'max', e.target.value)}
                               required
                               isFocused
                               autoComplete="ranges"
                    />

                    <InputError className="mt-2" message={errors.ranges}/>
                </div>
            </div>

        )
    })

    return (
        <AuthenticatedLayout
            auth={auth}
            header={Subheader()}
        >
            <Head title="Employee"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Employee Information</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Edit Employee.
                                </p>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel for="first_name" value="First name"/>

                                    <TextInput
                                        id="first_name"
                                        className="mt-1 block w-full"
                                        value={data.first_name ?? ""}
                                        handleChange={(e) => setData('first_name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="first_name"
                                    />

                                    <InputError className="mt-2" message={errors.first_name}/>
                                </div>
                                <div>
                                    <InputLabel for="last_name" value="Last name"/>

                                    <TextInput
                                        id="last_name"
                                        className="mt-1 block w-full"
                                        value={data.last_name ?? ""}
                                        handleChange={(e) => setData('last_name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="last_name"
                                    />

                                    <InputError className="mt-2" message={errors.first_name}/>
                                </div>
                            </form>
                        </section>

                    </div>
                </div>
            </div>
            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Entry allowance</h2>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <button onClick={addentry_allowance} type="button"
                                            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Add entry allowance
                                    </button>
                                </div>
                                <div>
                                    {allowance_inputs}
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Exit allowance</h2>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <button onClick={addexit_allowance} type="button"
                                            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Add exit allowance
                                    </button>
                                </div>
                                <div>
                                    {allowance_exit_inputs}
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
