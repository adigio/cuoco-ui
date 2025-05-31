'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();                
    router.push("/");   
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:text-red-200"
      title="Cerrar sesión"
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
}
