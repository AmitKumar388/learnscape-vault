import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { DocumentCard } from "@/components/DocumentCard";
import { PDFViewer } from "@/components/PDFViewer";
import { Footer } from "@/components/Footer";
import { mockDocuments } from "@/data/mockDocuments";
import type { Document } from "@/components/DocumentCard";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { toast } = useToast();

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
    
    toast({
      title: `Switched to ${newTheme ? "Dark" : "Light"} Mode`,
      description: "Theme preference saved",
    });
  };

  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter((doc) => {
      const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Handle document view
  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
    toast({
      title: "Opening Document",
      description: document.title,
    });
  };

  // Handle document download
  const handleDownloadDocument = (document: Document) => {
    toast({
      title: "Download Started",
      description: `${document.title} - ${document.fileSize}`,
    });
    // In a real app, this would trigger the actual download
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    toast({
      title: "Filter Applied",
      description: `Showing ${category === "all" ? "all" : category} documents`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Navigation */}
      <Navigation 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        activeCategory={activeCategory}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Documents Grid Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Explore Resources</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our comprehensive collection of study materials, previous year questions, 
                and placement resources curated for your academic success.
              </p>
              
              {/* Results Count */}
              <div className="mt-6 glass-card inline-block px-6 py-3 rounded-full">
                <span className="text-sm font-medium">
                  {filteredDocuments.length} documents found
                  {searchQuery && (
                    <span className="text-primary ml-2">
                      for "{searchQuery}"
                    </span>
                  )}
                </span>
              </div>
            </motion.div>

            {/* Documents Grid */}
            {filteredDocuments.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredDocuments.map((document, index) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onView={handleViewDocument}
                    onDownload={handleDownloadDocument}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No documents found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or category filter
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* PDF Viewer Modal */}
      <PDFViewer 
        document={selectedDocument}
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setSelectedDocument(null);
        }}
        onDownload={handleDownloadDocument}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;