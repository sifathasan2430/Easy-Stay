// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { IconUser, IconShield, IconCreditCard, IconBell, IconCheck } from "@tabler/icons-react";

// export default function ProfilePage() {
//   const { data: session } = useSession();
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("personal");

//   useEffect(() => {
//     if (!session?.user) return;
//     axios.get(`/api/users/${session.user.id}`).then((res) => setUser(res.data));
//   }, [session]);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Header */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-8 flex items-center space-x-6">
//         <div className="relative">
//           <img
//             src={user.avatar || "/avatars/default.png"}
//             alt={user.name}
//             className="w-24 h-24 rounded-full object-cover"
//           />
//           <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
//             <IconUser className="w-4 h-4" />
//           </span>
//         </div>
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold">{user.name}</h1>
//           <p className="text-sm text-gray-500">@{user.username}</p>
//           <p className="text-gray-600 dark:text-gray-300 mt-2">{user.email}</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
//         <nav className="max-w-6xl mx-auto flex space-x-6 px-6">
//           {[
//             { id: "personal", label: "Personal Info", icon: IconUser },
//             { id: "security", label: "Security", icon: IconShield },
//             { id: "payments", label: "Payments", icon: IconCreditCard },
//             { id: "notifications", label: "Notifications", icon: IconBell },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
//                 activeTab === tab.id ? "border-rose-500 text-rose-600" : "border-transparent text-gray-500"
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Content */}
//       <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           {activeTab === "personal" && <PersonalTab user={user} />}
//           {activeTab === "security" && <SecurityTab user={user} />}
//           {activeTab === "payments" && <PaymentsTab user={user} />}
//           {activeTab === "notifications" && <NotificationsTab />}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
//             <h3 className="font-semibold mb-2">Account Status</h3>
//             <p className="text-sm">{user.isVerified ? "Verified ✅" : "Not Verified ❌"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Example tab component
// function PersonalTab({ user }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Role:</strong> {user.role}</p>
//     </div>
//   );
// }

// function SecurityTab({ user }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Login & Security</h2>
//       <p>Email Verified: {user.isVerified ? "✅" : "❌"}</p>
//     </div>
//   );
// }

// function PaymentsTab({ user }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Payments</h2>
//       {user.paymentMethods?.length ? (
//         user.paymentMethods.map((p, i) => (
//           <div key={i}>
//             <p>{p.type}: {p.details}</p>
//           </div>
//         ))
//       ) : (
//         <p>No payment methods added</p>
//       )}
//     </div>
//   );
// }

// function NotificationsTab() {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Notifications</h2>
//       <p>Manage your notifications here</p>
//     </div>
//   );
// }
