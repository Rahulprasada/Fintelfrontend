
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  BrainCircuit, 
  Briefcase, 
  Users, 
  Menu, 
  Search, 
  Bell, 
  User 
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-finance-blue shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-finance-blue dark:text-white" />
            <span className="font-bold text-xl hidden sm:inline text-finance-blue dark:text-white">
              FinIntel 
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/investment-reports" className="flex items-center gap-1 text-gray-600 hover:text-finance-blue dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Investment Reports</span>
            </Link>
            <Link to="/research-platform" className="flex items-center gap-1 text-gray-600 hover:text-finance-blue dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
              <BrainCircuit className="h-4 w-4" />
              <span>AI Research</span>
            </Link>
            <Link to="/advisory-services" className="flex items-center gap-1 text-gray-600 hover:text-finance-blue dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
              <Briefcase className="h-4 w-4" />
              <span>Advisory Services</span>
            </Link>
            <Link to="/community" className="flex items-center gap-1 text-gray-600 hover:text-finance-blue dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden text-gray-600 dark:text-gray-300" onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2 mt-2">
              <li>
                <Link to="/investment-reports" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
                  <BarChart3 className="h-5 w-5" />
                  <span>Investment Reports</span>
                </Link>
              </li>
              <li>
                <Link to="/research-platform" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
                  <BrainCircuit className="h-5 w-5" />
                  <span>AI Research</span>
                </Link>
              </li>
              <li>
                <Link to="/advisory-services" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
                  <Briefcase className="h-5 w-5" />
                  <span>Advisory Services</span>
                </Link>
              </li>
              <li>
                <Link to="/community" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
