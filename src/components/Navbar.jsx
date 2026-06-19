// "use client";

// import { authClient } from "@/lib/auth-client";
// import { Avatar, Button, Dropdown, Label } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import { BiLogOut } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import { MdDashboard } from "react-icons/md";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const pathname = usePathname()
//   if(pathname.includes('dashboard')){
//     return null;
//   }


//   const handleSignOut = async () => {
//     await authClient.signOut();
//   };
//   return (
//     <div>
//       <div className="bg-black p-1 text-white">
//         <marquee>
//           🎉 Avail Up to 4% Extra Discount with Bank Transfer | 💳 Cash on
//           Delivery Available | 🚚 Fast Delivery in 2–3 Days.
//         </marquee>
//       </div>

//       <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
//         <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
//           <div className="flex items-center gap-4">
//             <button
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//               aria-expanded={isMenuOpen}
//             >
//               <span className="sr-only">Menu</span>
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {isMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//             <Link href={'/'}>
//               <div className="flex items-center gap-3">
//                 <Image
//                   height={40}
//                   width={40}
//                   loading="eager"
//                   src="/logo.webp"
//                   alt="logo"
//                 />
//                 <p className="font-bold">Legal Ease</p>
//               </div>
//             </Link>
//           </div>
//           <ul className="hidden items-center gap-4 md:flex">
//             <li>
//               <Link
//                 href="/products"
//                 className="font-medium text-accent"
//                 aria-current="page"
//               >
//                 Browse Lawyer
//               </Link>
//             </li>
//             <li>
//               <Link href="/pricing">Dashboard</Link>
//             </li>
//           </ul>
//          {!user && (
//             <div className="hidden items-center gap-4 md:flex">
//               <Link href="/signin">Login</Link>
//               <Link href="/signup">
//                 <Button>Sign Up</Button>
//               </Link>
//             </div>
//           )}

//           {user && (
//             <div className="hidden items-center gap-4 md:flex">
//               <Dropdown>
//                 <Dropdown.Trigger className="rounded-full">
//                   <Avatar size="sm" aria-label="Menu">
//                     <Avatar.Image
//                       referrerPolicy="no-referrer"
//                       alt="John Doe"
//                       src={user?.image}
//                     />
//                     <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
//                   </Avatar>
//                 </Dropdown.Trigger>
//                 <Dropdown.Popover>
//                   <div className="px-3 pt-3 pb-1">
//                     <div className="flex items-center gap-2">
//                       <Avatar size="sm">
//                         <Avatar.Image alt={user?.name} src={user?.image} />
//                         <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
//                       </Avatar>
//                       <div className="flex flex-col gap-0">
//                         <p className="text-sm leading-5 font-medium">
//                           {user?.name}
//                         </p>
//                         <p className="text-xs leading-none text-muted">
//                           {user?.email}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <Dropdown.Menu
//                     onAction={(key) => console.log(`Selected: ${key}`)}
//                   >
//                     <Dropdown.Item id="new-file" textValue="New file">
//                       <Link
//                         className="flex items-center gap-2"
//                         href={`/dashboard/${user?.role}`}
//                       >
//                         <MdDashboard />
//                         <Label>Dashboard</Label>
//                       </Link>
//                     </Dropdown.Item>

//                     <Dropdown.Item id="copy-link" textValue="Copy link">
//                       <CgProfile />
//                       <Label>Profile</Label>
//                     </Dropdown.Item>

//                     <Dropdown.Item
//                       id="delete-file"
//                       textValue="Delete file"
//                       variant="danger"
//                       onClick={handleSignOut}
//                     >
//                       <BiLogOut />
//                       <Label>Logout</Label>
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown.Popover>
//               </Dropdown>
//             </div>
//           )}
//         </header>
//         {isMenuOpen && (
//           <div className="border-t border-separator md:hidden">
//             <ul className="flex flex-col gap-2 p-4">
//               <li>
//                 <Link href="#" className="block py-2">
//                   Features
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="block py-2 font-medium text-accent">
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="block py-2">
//                   Browse Lawyer
//                 </Link>
//               </li>
//               <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
//                 <Link href="#" className="block py-2">
//                   Login
//                 </Link>
//                 <Button className="w-full">Sign Up</Button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const router = useRouter();

  if (pathname.includes("dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const value = e.target.search.value.trim();

    if (!value) return;

    router.push(`/lawyers?search=${encodeURIComponent(value)}`);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-black p-1 text-white">
        <marquee>
          ⚖️ Find Trusted Lawyers | 🎯 Hire Legal Experts Easily | 🚀 Fast &
          Secure Legal Services
        </marquee>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.webp"
                  alt="LegalEase"
                  width={40}
                  height={40}
                />
                <span className="text-xl font-bold text-blue-700">
                  LegalEase
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <Link
                href="/"
                className={`font-medium transition ${
                  pathname === "/"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/lawyers"
                className={`font-medium transition ${
                  pathname === "/lawyers"
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Browse Lawyers
              </Link>
            </li>

            {/* {user && (
              <li>
                <Link
                  href={`/dashboard/${user?.role}`}
                  className={`font-medium transition ${
                    pathname.includes("/dashboard")
                      ? "text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )} */}
           {user && (
  <li className="relative group">
    <button className="font-medium hover:text-blue-600">
      Dashboard ▾
    </button>

    <div className="absolute left-0 top-full hidden min-w-[220px] rounded-lg border bg-white p-2 shadow-lg group-hover:block">
      
      {user?.role === "admin" && (
        <>
          <Link
            href="/dashboard/admin/manage-users"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Manage Users
          </Link>

          <Link
            href="/dashboard/admin/manage-lawyers"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Manage Lawyers
          </Link>

          <Link
            href="/dashboard/admin/manage-bookings"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Manage Bookings
          </Link>
        </>
      )}

      {user?.role === "lawyer" && (
        <>
          <Link
            href="/dashboard/lawyer/my-services"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            My Services
          </Link>

          <Link
            href="/dashboard/lawyer/appointments"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Appointments
          </Link>

          <Link
            href="/dashboard/lawyer/profile"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Profile
          </Link>
        </>
      )}

      {user?.role === "user" && (
        <>
          <Link
            href="/dashboard/user/my-bookings"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            My Bookings
          </Link>

          <Link
            href="/dashboard/user/favorites"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Favorites
          </Link>

          <Link
            href="/dashboard/user/profile"
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            Profile
          </Link>
        </>
      )}
       </div>
      </li>
      )}

          </ul>

          {/* Search Bar */}
          <div className="hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search lawyers..."
                className="w-64 rounded-lg border px-4 py-2 pr-10 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Side */}
          {!user ? (
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/signin">Login</Link>

              <Link href="/signup">
                <Button color="primary">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex">
              <Dropdown>
                <Dropdown.Trigger>
                  <div className="cursor-pointer">
                    <Avatar
                      src={user?.image}
                      name={user?.name}
                    />
                  </div>
                </Dropdown.Trigger>

                <Dropdown.Menu aria-label="User Menu">
                  <Dropdown.Item key="dashboard">
                    <Link
                      className="flex items-center gap-2"
                      href={`/dashboard/${user?.role}`}
                    >
                      <MdDashboard />
                      <Label>Dashboard</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item key="profile">
                    <div className="flex items-center gap-2">
                      <CgProfile />
                      <Label>Profile</Label>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="logout"
                    color="danger"
                    onClick={handleSignOut}
                  >
                    <div className="flex items-center gap-2 text-red-500">
                      <BiLogOut />
                      <Label>Logout</Label>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t md:hidden">
            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-4">
                <input
                  type="text"
                  name="search"
                  placeholder="Search lawyers..."
                  className="w-full rounded-lg border px-4 py-2 outline-none"
                />
              </form>

              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="/"
                    className={`block ${
                      pathname === "/" ? "text-blue-600" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/lawyers"
                    className={`block ${
                      pathname === "/lawyers"
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    Browse Lawyers
                  </Link>
                </li>

                {user && (
                  <li>
                    <Link
                      href={`/dashboard/${user?.role}`}
                      className="block"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {!user ? (
                  <>
                    <li>
                      <Link href="/signin">Login</Link>
                    </li>

                    <li>
                      <Link href="/signup">
                        <Button
                          color="primary"
                          className="w-full"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Button
                      color="danger"
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Logout
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;