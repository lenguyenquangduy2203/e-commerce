/** @jsxImportSource preact */
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  balance: number;
}

const UserProfileIsland: FunctionalComponent = () => {
  const [user, setUser] = useState<User>({
    name: "Trương Hồng Quân",
    email: "quantruong0307@gmail.com",
    avatarUrl: "https://i.pravatar.cc/100?img=3",
    balance: 15200,
  });

  return (
    <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-10 text-center">
      <img
        src={user.avatarUrl}
        alt="User avatar"
        class="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
      />
      <h2 class="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
      <p class="text-gray-500 text-sm">{user.email}</p>
      <div class="mt-6 bg-gray-100 p-4 rounded-xl">
        <p class="text-sm text-gray-600">Account Balance</p>
        <p class="text-2xl font-semibold text-green-600">${user.balance.toLocaleString()}</p>
      </div>
      <button
        onClick={() => setUser({ ...user, balance: user.balance + 100 })}
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        💰 Add $100
      </button>
    </div>
  );
};

export default UserProfileIsland;
