import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Linkedin, Twitter, Mail, Github, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const leadership = [
    {
      name: "Alok Harsh",
      role: "Co-Founder",
      location: "Indore, Madhya Pradesh",
      bio: "Full-stack engineer with 3+ years experience building scalable platforms. Frontend Developer experience of at Spotify. Leads our technical vision and engineering excellence initiatives.",
      achievements: ["AWS Cloud Foundation Solutions Architect", "Open Source Contributor", "Tech Speaker"],
      social: {
        linkedin: "https://www.linkedin.com/in/alok-harsh-73b36425a/",
        github: "#",
        email: ""
      }
    },
    {
      name: "Amit Kumar",
      role: "Founder & Chief Executive Officer",
      location: "Indore, Madhya Pradesh",
      bio: "Former Head and Founder of Education Hub and SmartApply.AI. B.Tech in Computer Science and Engineering from IIST. Passionate about democratizing access to quality education through innovative technology solutions.",
      achievements: ["Problem Solver & Founder", "Internal Hacakathon Winner", "Speaker & Leadership"],
      social: {
        linkedin: "https://www.linkedin.com/in/amitkumar-developer/",
        github: "https://github.com/AmitKumar388",
        email: "amitkumarhzb75@gmail.com"
      }
    },
    
    {
      name: "Ansh Nimbhore",
      role: "CTO & Co-Founder",
      location: "Bhopal, Madhya Pradesh",
      bio: "Education from Computer Science and Engineering. Specializes in learning sciences and adaptive educational technologies. 20+ years in academic leadership.",
      achievements: ["Excellence in Learning", "UI/UX Designer", "Experience of 2+ years"],
      social: {
        linkedin: "https://www.linkedin.com/in/ansh-nimbhore-55aa55257/",
        github: "#",
        email: ""
      }
    }
  ];

  
  const values = [
    "Student-First Mindset",
    "Innovation & Excellence",
    "Diversity & Inclusion",
    "Transparency & Trust",
    "Continuous Learning",
    "Global Impact"
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation 
        onSearch={() => {}}
        onCategoryFilter={() => {}}
        activeCategory="all"
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're a diverse group of educators, engineers, designers, and dreamers 
              united by our mission to transform education for the better.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">8+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">1</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">3</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-muted-foreground">Remote-Friendly</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced leaders guiding our mission to revolutionize education through technology
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl group hover:scale-105 transition-all"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold">{leader.name}</h3>
                  <p className="text-primary font-medium">{leader.role}</p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{leader.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {leader.bio}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-primary" />
                    Achievements
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {leader.achievements.map((achievement) => (
                      <li key={achievement}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center space-x-3">
                  {leader.social.linkedin && (
                    <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {leader.social.github && (
                    <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="text-lg font-semibold">{value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto glass-card p-12 rounded-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Join Us?</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Be part of a team that's making education more accessible, engaging, 
              and effective for millions of students around the world.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-white hover:scale-105 transition-transform"
              onClick={() => {
                toast({
                  title: "Redirecting",
                  description: "Taking you to our careers page",
                });
                window.location.href = "/career";
              }}
            >
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;