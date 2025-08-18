import { motion } from "framer-motion";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-card border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">LearnScape</h2>
                <p className="text-xs text-muted-foreground">Education Hub</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering students with comprehensive study materials, previous year questions, 
              and placement resources for academic excellence.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/career" className="text-muted-foreground hover:text-primary transition-colors">Career</a></li>
              <li><a href="/team" className="text-muted-foreground hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Study Notes</span>
              </li>
              <li className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Previous Year Questions</span>
              </li>
              <li className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Placement Materials</span>
              </li>
              <li className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Research Papers</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@learnscape.edu</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Education St, Learning City</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="glass-card text-sm"
                />
                <Button size="sm" className="bg-gradient-primary text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} LearnScape Education Hub. All rights reserved. 
            <span className="ml-2">Made with ❤️ for students worldwide</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};