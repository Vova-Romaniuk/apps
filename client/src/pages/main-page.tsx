import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import type { User } from "../components/UserCard";

export default function MainPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=3");
      const data = await res.json();

      const formattedUsers: User[] = data.results.map((u: any) => ({
        name: `${u.name.first} ${u.name.last}`,
        gender: u.gender,
        email: u.email,
        location: {
          city: u.location.city,
          country: u.location.country,
          coordinates: {
            latitude: u.location.coordinates.latitude,
            longitude: u.location.coordinates.longitude,
          },
        },
        picture: u.picture.large,
      }));

      setUsers((prev) => [...prev, ...formattedUsers]);
    } catch (err) {
      console.error("Error loading users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (user: User) => {
    try {
      const response = await fetch("https://apps-yxib.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Save failed:", errorData);
        alert("Failed to save user");
        return;
      }

      alert("User saved successfully!");
    } catch (err) {
      console.error("Error saving user", err);
      alert("Error saving user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {users.map((user, index) => (
          <UserCard key={index} user={user} onSave={handleSave} />
        ))}
      </div>

      {loading && (
        <div className='flex justify-center my-6'>
          <div className='w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}

      <div className='flex justify-center mt-6'>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className={`px-6 py-2 rounded-lg transition text-white cursor-pointer ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
