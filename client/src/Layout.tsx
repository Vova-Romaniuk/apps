import { Outlet } from "react-router-dom";
import CustomLink from "./components/CustomLink";

export default function Layout() {
  return (
    <div className='flex flex-col w-full min-h-screen h-full animated-green-bg'>
      <header className='p-4 gap-4 bg-black/30 shadow-md flex items-center justify-end text-white'>
        <CustomLink to='/'>Users</CustomLink>
        <CustomLink to='/saved'>Saved</CustomLink>
      </header>

      <main className='p-4 flex-1'>
        <Outlet />
      </main>

      <footer className='p-4 bg-green-950 text-white '>
        <p className='text-center'>© 2025 Volodymyr Romaniuk</p>{" "}
      </footer>
    </div>
  );
}
