import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, InertiaLink, useForm, usePage} from '@inertiajs/inertia-react';
import Subheader from "@/Pages/Door/Partials/Subheader";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import SelectInput from "@/Components/SelectInput";


export default function Edit({auth}) {
    const door = usePage().props.door;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm({
        name: door.name,
        type: door.type,
    });

    function handleSubmit(e) {
        e.preventDefault();
        patch(route("doors.update", door.id));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={Subheader()}
        >
            <Head title="Doors"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Door Information</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create door.
                                </p>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel for="name" value="Unique name"/>

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        handleChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name}/>
                                </div>
                                <div>
                                    <InputLabel for="type" value="Type"/>

                                    <SelectInput
                                        id="type"
                                        className="mt-1 block w-full"
                                        value={data.type}
                                        handleChange={(e) => setData('type', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="type"
                                    >
                                        <option value="exit">Exit</option>
                                        <option value="entrance">Entrance</option>
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.type}/>
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
