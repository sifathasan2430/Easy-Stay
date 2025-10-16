"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Home, Info, InfoIcon } from "lucide-react";
import { FaInfo } from "react-icons/fa";

export default function ApproveHosts() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await axios.get("/api/host-applications");
            setApplications(res.data.data || []);
        } catch (error) {
            toast.error("Failed to load host applications");
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const res = await axios.patch(`/api/host-applications/${id}`, { status });
            toast.success(res.data.message);
            fetchApplications();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const pending = applications.filter((a) => a.status === "pending");
    const approved = applications.filter((a) => a.status === "approved");
    const rejected = applications.filter((a) => a.status === "rejected");

    const renderSection = (title, data, color) => (
        <div className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${color}`}>{title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.length > 0 ? (
                    data.map((app) => (
                        <Card
                            key={app._id}
                            className="border border-gray-200 shadow-md hover:shadow-lg transition rounded-xl overflow-hidden"
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold text-gray-800">
                                    {app.fullName}
                                </CardTitle>
                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                    <Mail size={16} /> {app.email}
                                </p>
                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                    <Phone size={16} /> {app.phone}
                                </p>
                                <p className="text-gray-700 flex items-center gap-2 text-sm mt-1">
                                    <Home size={16} /> <b>{app.propertyType}</b>
                                </p>
                                <div className="flex flex-col justify-between h-40 ">
                                    <p className="text-gray-700 flex items-center mb-2 gap-2 text-sm mt-1">
                                        <FaInfo size={16} /> <b>Additional Info</b>
                                    </p>
                                    <div className="flex-1 overflow-y-auto p-2 bg-gray-50 rounded-md border border-gray-100 text-gray-700 text-sm leading-relaxed custom-scrollbar">
                                        {app.message ? (
                                            <p>{app.message}</p>
                                        ) : (
                                            <p className="italic text-gray-400">
                                                No additional message provided.
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-3">
                                        {app.status === "pending" && (
                                            <div className="grid grid-cols-2 gap-2 mt-3">
                                                <Button
                                                    onClick={() => handleStatusChange(app._id, "approved")}
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    onClick={() => handleStatusChange(app._id, "rejected")}
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        )}

                                        {app.status === "approved" && (
                                            <span className="text-green-600 font-semibold block text-center mt-2">
                                                ✅ Approved
                                            </span>
                                        )}

                                        {app.status === "rejected" && (
                                            <span className="text-red-600 font-semibold block text-center mt-2">
                                                ❌ Rejected
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm italic">
                        No {title.toLowerCase()} applications.
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Host Application Approvals
            </h1>

            {renderSection("Pending Applications", pending, "text-blue-600")}
            {renderSection("Approved Applications", approved, "text-green-600")}
            {renderSection("Rejected Applications", rejected, "text-red-600")}
        </div>
    );
}
