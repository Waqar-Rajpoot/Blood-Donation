import AdminNavbar from "@/components/adminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar is fixed on the left */}
      <AdminNavbar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 w-full">
        {children}
      </main>
    </div>
  );
}