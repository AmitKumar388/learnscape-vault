import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Moon, Sun, Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavigationProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  activeCategory: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const categories = [
  { id: "all", label: "All Resources", icon: BookOpen },
  { id: "notes", label: "Notes", icon: BookOpen },
  { id: "pyqs", label: "PYQs", icon: BookOpen },
  { id: "placement", label: "Placement", icon: BookOpen },
  { id: "resources", label: "Resources", icon: BookOpen }
];

export const Navigation = ({ 
  onSearch, 
  onCategoryFilter, 
  activeCategory, 
  isDarkMode, 
  toggleTheme 
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <a href="/"><div>
              <h1 className="text-xl font-bold gradient-text">Education Hub</h1>
              <p className="text-xs text-muted-foreground">One Stop </p>
            </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                onClick={() => onCategoryFilter(category.id)}
                className="transition-all duration-300 hover:bg-primary/10"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 w-64 glass-card border-border/50 focus:border-primary/50"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="glass-card hover:bg-primary/10"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-4 glass-card p-4 rounded-lg"
          >
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 w-full glass border-border/50"
              />
            </div>

            {/* Mobile Categories */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => {
                    onCategoryFilter(category.id);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="w-full justify-start"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};