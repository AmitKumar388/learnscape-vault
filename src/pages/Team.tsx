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
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      location: "San Francisco, CA",
      bio: "Former Head of Education Technology at Google. PhD in Computer Science from Stanford. Passionate about democratizing access to quality education through innovative technology solutions.",
      achievements: ["Forbes 30 Under 30", "EdTech Pioneer Award 2023", "TED Speaker"],
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        email: "sarah@learnscape.edu"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      location: "Austin, TX",
      bio: "Full-stack engineer with 15+ years experience building scalable platforms. Former Principal Engineer at Spotify. Leads our technical vision and engineering excellence initiatives.",
      achievements: ["AWS Solutions Architect", "Open Source Contributor", "Tech Conference Speaker"],
      social: {
        linkedin: "https://linkedin.com/in/mrodriguez",
        github: "https://github.com/mrodriguez",
        email: "michael@learnscape.edu"
      }
    },
    {
      name: "Dr. Priya Patel",
      role: "Chief Learning Officer",
      location: "Boston, MA",
      bio: "Educational psychologist and former Dean of Digital Learning at MIT. Specializes in learning sciences and adaptive educational technologies. 20+ years in academic leadership.",
      achievements: ["MIT Excellence in Teaching", "Learning Sciences Research Award", "Author of 50+ Papers"],
      social: {
        linkedin: "https://linkedin.com/in/priyapatel",
        twitter: "https://twitter.com/drpriyapatel",
        email: "priya@learnscape.edu"
      }
    }
  ];

  const departments = [
    {
      name: "Engineering",
      count: 25,
      description: "Building robust, scalable platforms that serve millions of students worldwide",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Design",
      count: 12,
      description: "Creating intuitive, accessible, and beautiful learning experiences",
      color: "from-pink-500 to-red-500"
    },
    {
      name: "Content",
      count: 18,
      description: "Curating and creating high-quality educational materials and resources",
      color: "from-green-500 to-teal-500"
    },
    {
      name: "Data Science",
      count: 8,
      description: "Leveraging data insights to improve learning outcomes and platform performance",
      color: "from-orange-500 to-yellow-500"
    },
    {
      name: "Marketing",
      count: 15,
      description: "Connecting with students and educators to grow our global community",
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "Operations",
      count: 10,
      description: "Ensuring smooth operations and exceptional support for our users",
      color: "from-gray-500 to-gray-700"
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
                <div className="text-3xl font-bold gradient-text">88+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">6</div>
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
                  {leader.social.twitter && (
                    <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10">
                      <Twitter className="w-4 h-4" />
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

      {/* Departments */}
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
              Our <span className="gradient-text">Departments</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each team brings unique expertise to create exceptional educational experiences
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl group hover:scale-105 transition-all"
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:animate-glow`}>
                    {dept.count}
                  </div>
                  <h3 className="text-xl font-bold">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {dept.count} team members
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  {dept.description}
                </p>
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