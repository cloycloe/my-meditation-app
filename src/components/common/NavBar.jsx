import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Music, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          <Link 
            to="/home" 
            className={`flex flex-col items-center justify-center min-w-[64px] ${currentPath === '/home' ? 'bg-[#E8F3F3] rounded-lg' : ''}`}
          >
            <div className="p-2">
              <Home className="w-6 h-6 text-gray-600" />
            </div>
          </Link>
          
          <Link 
            to="/relaxation" 
            className={`flex flex-col items-center justify-center min-w-[64px] ${currentPath === '/relaxation' ? 'bg-[#E8F3F3] rounded-lg' : ''}`}
          >
            <div className="p-2">
              <Music className="w-6 h-6 text-gray-600" />
            </div>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center justify-center min-w-[64px] ${currentPath === '/profile' ? 'bg-[#E8F3F3] rounded-lg' : ''}`}
          >
            <div className="p-2">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
