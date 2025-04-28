import { useState, useEffect } from "react";
import { Input } from "../../component/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../component/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../component/ui/table";
import Pagination from "../../component/ui/pagination";
import axios from "../../helper/axios";
import { FunnelPlus } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  dateCreated: string;
  status: string;
}
const AllLease = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // customize as needed

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("api/v1/all_users");

        const formattedUsers = response.data.map((user: any) => ({
          name: user.username ?? "No Name",
          email: user.email ?? "No Email",
          role: user.user_type ?? "Unknown Role",
          dateCreated: user.created_at
            ? new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Invalid Date",
          status: user.status ?? "Active",
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filtered Users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Slice for current page
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="p-6">
        {/* Search + Visual Dropdowns */}
        <div className="flex gap-4 mb-6 bg-[#fcfcfc] p-5 rounded-xl">
          <Input
            type="text"
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-4xl border-gray-300"
          />
          <button
            className="flex items-center  bg-[#F3F4F6] hover:bg-[#e2e5ff] text-black py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
            aria-label="logout"
          >
            <span className="font-medium">mm/dd/yyyy</span>
          </button>

          <Select>
            <SelectTrigger className="w-[180px] border-gray-300 cursor-not-allowed">
              <SelectValue placeholder="Lease Type" />
            </SelectTrigger>
            <SelectContent className="border-gray-300">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          <button
            className="flex items-center  bg-[#F3F4F6] hover:bg-[#e2e5ff] text-black py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
            aria-label="logout"
          >
            <FunnelPlus size={16} className="m-1" />
            <span className="font-medium">More filter</span>
          </button>
        </div>

        {/* Table */}
        <Table className="rounded-b-xl">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#fcfcfc]">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="p-2">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm ${
                        user.role === "Super Admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{user.dateCreated}</TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-full px-3 py-1 text-sm bg-green-100 text-green-700">
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-purple-600 hover:text-purple-700">
                      Edit
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* ✅ Pagination Component with logic */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
          onPageChange={handlePageChange}
        />

        {/* Page navigation logic */}
        <div className="hidden">
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllLease;
