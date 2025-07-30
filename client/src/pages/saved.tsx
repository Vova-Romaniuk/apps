import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import type { User } from "../components/UserCard";

export default function Saved() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSavedUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://apps-yxib.onrender.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error loading saved users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://apps-yxib.onrender.com/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete failed:", errorData);
        alert("Failed to delete user");
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user", err);
      alert("Error deleting user");
    }
  };

  useEffect(() => {
    fetchSavedUsers();
  }, []);

  return (
    <div className='p-4'>
      {loading ? (
        <div className='flex justify-center my-6'>
          <div className='w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => handleDelete(user?.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
