import {InertiaLink} from "@inertiajs/inertia-react";

export default function Subheader() {
    return (<nav
    >
        <div className="flow-root">
            <div className="float-left">
                <div className="container-fluid px-6">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Doors</h2>
                </div>
            </div>
            <div className="float-right">
                <InertiaLink href={route("doors.create")} type="button"
                             className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Add
                </InertiaLink>
            </div>
        </div>
    </nav>)}
