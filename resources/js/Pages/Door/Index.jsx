import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, InertiaLink} from '@inertiajs/inertia-react';
import Subheader from "@/Pages/Door/Partials/Subheader";
import {Inertia} from "@inertiajs/inertia";


export default function Index({auth, doors}) {
    function destroy(id) {
        if (confirm("Are you sure you want to delete this door?")) {
            Inertia.delete(route("doors.destroy", id));
        }
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
                        <table className="min-w-full">
                            <thead className="border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Type
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Slug
                                </th>
                                <th scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Temperature
                                </th>
                                <th scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {doors.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.type ?? '-'}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.slug ?? '-'}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.temperature ?? '-'}
                                    </td>
                                    <td className="space-x-3">
                                        <InertiaLink href={route("doors.edit", item.id)} type="button"
                                                     className="px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                            Edit
                                        </InertiaLink>

                                        <button onClick={() => destroy(item.id)} type="button"
                                                     className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
