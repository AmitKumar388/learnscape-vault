import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Users, Download } from "lucide-react";

export const HeroSection = () => {
  const stats = [
    { icon: FileText, label: "Documents", value: "50+" },
    { icon: BookOpen, label: "Categories", value: "4" },
    { icon: Users, label: "Students", value: "100+" },
    { icon: Download, label: "Downloads", value: "1K+" }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-bg opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mouse-pointer">
              <span className="gradient-text">One Stop</span>
              <br />
              <span className="text-foreground">Education Hub</span>
            </h1>
            
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            Notes, PYQs, Placement Materials & Resources at your fingertips.
            <br />
            <span className="text-primary font-medium">Everything you need to excel in your studies.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:scale-105 transition-transform duration-300 shadow-hover text-white border-0"
            >
              Explore Resources
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a href="/categories">
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-card hover:bg-blue-500 border-primary/30"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              Browse Categories
            </Button>
            </a>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card p-6 rounded-xl text-center group"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:animate-glow">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};