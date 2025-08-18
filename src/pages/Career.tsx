import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, MapPin, Clock, Users, Star, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Career = () => {
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

  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      description: "Join our engineering team to build the next generation of educational technology platforms."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      description: "Create intuitive and engaging user experiences for millions of students worldwide."
    },
    {
      title: "Content Strategist",
      department: "Content",
      location: "Remote / Austin",
      type: "Full-time",
      experience: "2-3 years",
      skills: ["Content Writing", "SEO", "Educational Design", "Analytics"],
      description: "Develop comprehensive content strategies to enhance student learning outcomes."
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote / Boston",
      type: "Full-time",
      experience: "3-6 years",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      description: "Leverage data insights to improve educational experiences and student success rates."
    }
  ];

  const benefits = [
    {
      title: "Flexible Work Environment",
      description: "Work remotely or from our modern offices worldwide"
    },
    {
      title: "Professional Development",
      description: "$5,000 annual learning budget for courses and conferences"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      title: "Equity Package",
      description: "Stock options to share in our company's success"
    }
  ];

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `Redirecting to application form for ${jobTitle}`,
    });
  };

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
              Join Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Help us shape the future of education by creating innovative solutions 
              that empower students worldwide to achieve their dreams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">100+ Team Members</span>
              </div>
              <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">4.9/5 Employee Rating</span>
              </div>
              <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Remote First</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Work With <span className="gradient-text">Us?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where talented individuals can thrive 
              and make a meaningful impact on education.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
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
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find your next opportunity to make a difference in education
            </p>
          </motion.div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl group hover:shadow-hover transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{job.title}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {job.department}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="glass-card">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:ml-8">
                    <Button 
                      onClick={() => handleApply(job.title)}
                      className="bg-gradient-primary text-white hover:scale-105 transition-transform w-full lg:w-auto"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Don't See Your <span className="gradient-text">Dream Role?</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We're always looking for exceptional talent. Send us your resume and let's explore 
              how you can contribute to our mission of transforming education.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-white hover:scale-105 transition-transform"
              onClick={() => {
                toast({
                  title: "Contact Form",
                  description: "Redirecting to general application form",
                });
              }}
            >
              <Send className="w-5 h-5 mr-2" />
              Send Your Resume
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Career;