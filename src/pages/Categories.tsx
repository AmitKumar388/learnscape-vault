import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Briefcase, Download, Eye, GraduationCap } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SimplePDFViewer } from "@/components/SimplePDFViewer";
import { useState, useEffect } from "react";

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'notes' | 'pyqs' | 'placement';
  fileSize: string;
  downloadCount: number;
  pdfFile: string;
}

interface Semester {
  id: string;
  name: string;
  subjects: string[];
  materials: Material[];
}

const engineeringSemesters: Semester[] = [
  {
    id: "sem1",
    name: "1st Semester",
    subjects: ["Mathematics-I", "Physics", "Chemistry", "Basic Electrical Engineering", "Engineering Graphics"],
    materials: [
      {
        id: "s1-notes-1",
        title: "Mathematics-I Complete Notes",
        description: "Comprehensive notes covering Calculus, Differential Equations, and Linear Algebra",
        type: "notes",
        fileSize: "2.8 MB",
        downloadCount: 1250,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s1-pyq-1",
        title: "Mathematics-I Previous Year Questions",
        description: "Last 5 years question papers with solutions for Mathematics-I",
        type: "pyqs",
        fileSize: "1.5 MB",
        downloadCount: 890,
        pdfFile: "pyqs-sample.pdf"
      },
      {
        id: "s1-notes-2",
        title: "Physics Laboratory Manual",
        description: "Complete physics lab experiments with theory and observations",
        type: "notes",
        fileSize: "3.2 MB",
        downloadCount: 750,
        pdfFile: "notes-sample.pdf"
      }
    ]
  },
  {
    id: "sem2", 
    name: "2nd Semester",
    subjects: ["Mathematics-II", "Engineering Mechanics", "Basic Electronics", "Environmental Studies", "Workshop Technology"],
    materials: [
      {
        id: "s2-notes-1",
        title: "Engineering Mechanics Notes",
        description: "Statics, dynamics, and strength of materials comprehensive guide",
        type: "notes",
        fileSize: "2.1 MB",
        downloadCount: 980,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s2-pyq-1", 
        title: "Mathematics-II PYQs (2019-2023)",
        description: "Previous year questions with detailed solutions",
        type: "pyqs",
        fileSize: "1.8 MB",
        downloadCount: 660,
        pdfFile: "pyqs-sample.pdf"
      }
    ]
  },
  {
    id: "sem3",
    name: "3rd Semester", 
    subjects: ["Data Structures", "Digital Logic Design", "Computer Organization", "Discrete Mathematics", "Object Oriented Programming"],
    materials: [
      {
        id: "s3-notes-1",
        title: "Data Structures and Algorithms",
        description: "Complete DSA notes with implementations in C++",
        type: "notes",
        fileSize: "3.5 MB",
        downloadCount: 1800,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s3-pyq-1",
        title: "DSA Previous Year Questions",
        description: "Solved DSA questions from past 5 years with explanations",
        type: "pyqs",
        fileSize: "2.2 MB", 
        downloadCount: 1350,
        pdfFile: "pyqs-sample.pdf"
      },
      {
        id: "s3-placement-1",
        title: "DSA Interview Preparation",
        description: "Company-wise DSA questions asked in placements",
        type: "placement",
        fileSize: "2.8 MB",
        downloadCount: 2100,
        pdfFile: "placement-sample.pdf"
      }
    ]
  },
  {
    id: "sem4",
    name: "4th Semester",
    subjects: ["Database Management", "Operating Systems", "Computer Networks", "Software Engineering", "Web Technologies"],
    materials: [
      {
        id: "s4-notes-1",
        title: "Database Management Systems",
        description: "Complete DBMS notes with SQL queries and normalization",
        type: "notes",
        fileSize: "2.9 MB",
        downloadCount: 1650,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s4-pyq-1",
        title: "Operating Systems PYQs",
        description: "OS previous year questions with process scheduling examples",
        type: "pyqs",
        fileSize: "2.0 MB",
        downloadCount: 1100,
        pdfFile: "pyqs-sample.pdf"
      },
      {
        id: "s4-placement-1",
        title: "System Design Interview Guide",
        description: "Complete system design preparation for tech interviews",
        type: "placement",
        fileSize: "3.8 MB",
        downloadCount: 2500,
        pdfFile: "placement-sample.pdf"
      }
    ]
  },
  {
    id: "sem5",
    name: "5th Semester",
    subjects: ["Compiler Design", "Computer Graphics", "Artificial Intelligence", "Theory of Computation", "Software Testing"],
    materials: [
      {
        id: "s5-notes-1",
        title: "Compiler Design Complete Guide",
        description: "Lexical analysis, parsing, and code generation techniques",
        type: "notes",
        fileSize: "3.1 MB", 
        downloadCount: 920,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s5-pyq-1",
        title: "AI Previous Year Questions",
        description: "Machine learning and AI algorithms question bank",
        type: "pyqs",
        fileSize: "1.9 MB",
        downloadCount: 780,
        pdfFile: "pyqs-sample.pdf"
      }
    ]
  },
  {
    id: "sem6",
    name: "6th Semester",
    subjects: ["Machine Learning", "Information Security", "Mobile Computing", "Distributed Systems", "Human Computer Interaction"],
    materials: [
      {
        id: "s6-notes-1",
        title: "Machine Learning Handbook",
        description: "Complete ML algorithms with Python implementations",
        type: "notes",
        fileSize: "4.2 MB",
        downloadCount: 2200,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s6-placement-1",
        title: "ML Engineer Interview Kit",
        description: "Machine learning interview questions and case studies",
        type: "placement",
        fileSize: "3.5 MB",
        downloadCount: 1890,
        pdfFile: "placement-sample.pdf"
      }
    ]
  },
  {
    id: "sem7",
    name: "7th Semester", 
    subjects: ["Cloud Computing", "Big Data Analytics", "Internet of Things", "Blockchain Technology", "Project Management"],
    materials: [
      {
        id: "s7-notes-1",
        title: "Cloud Computing Architecture",
        description: "AWS, Azure, and GCP services comprehensive guide",
        type: "notes",
        fileSize: "3.8 MB",
        downloadCount: 1560,
        pdfFile: "notes-sample.pdf"
      },
      {
        id: "s7-placement-1",
        title: "Cloud Engineer Placement Guide",
        description: "DevOps and cloud engineering interview preparation",
        type: "placement",
        fileSize: "2.9 MB",
        downloadCount: 1320,
        pdfFile: "placement-sample.pdf"
      }
    ]
  },
  {
    id: "sem8",
    name: "8th Semester",
    subjects: ["Advanced Algorithms", "Research Methodology", "Industry Project", "Entrepreneurship", "Professional Ethics"],
    materials: [
      {
        id: "s8-placement-1",
        title: "Complete Placement Preparation",
        description: "All-in-one guide for technical interviews and HR rounds",
        type: "placement",
        fileSize: "5.2 MB",
        downloadCount: 3200,
        pdfFile: "placement-sample.pdf"
      },
      {
        id: "s8-notes-1",
        title: "Research Methodology Guide",
        description: "Complete guide for project work and research writing",
        type: "notes",
        fileSize: "2.5 MB",
        downloadCount: 890,
        pdfFile: "notes-sample.pdf"
      }
    ]
  }
];

const Categories = () => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemPreference);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleViewPDF = (pdfFile: string) => {
    setSelectedPDF(pdfFile);
  };

  const handleDownload = (pdfFile: string, title: string) => {
    const link = document.createElement('a');
    link.href = `/${pdfFile}`;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return <BookOpen className="h-4 w-4" />;
      case 'pyqs': return <FileText className="h-4 w-4" />;
      case 'placement': return <Briefcase className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes': return 'bg-primary/10 text-primary border-primary/20';
      case 'pyqs': return 'bg-secondary/10 text-secondary border-secondary/20';  
      case 'placement': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  if (selectedPDF) {
    return <SimplePDFViewer pdfUrl={`/${selectedPDF}`} onClose={() => setSelectedPDF(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onSearch={() => {}}
        onCategoryFilter={() => {}}
        activeCategory=""
        isDarkMode={false}
        toggleTheme={() => {}}
      />
      <main className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Engineering Resources</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete collection of engineering study materials, previous year questions, and placement preparation resources for all semesters.
          </p>
        </motion.div>

        <div className="space-y-12">
          {engineeringSemesters.map((semester, semesterIndex) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: semesterIndex * 0.1 }}
            >
              <Card className="border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {semester.name.charAt(0)}
                    </div>
                    {semester.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <span className="font-semibold">Subjects: </span>
                    {semester.subjects.join(" • ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {semester.materials.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {semester.materials.map((material, materialIndex) => (
                        <motion.div
                          key={material.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: materialIndex * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="group"
                        >
                          <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <Badge className={`${getTypeColor(material.type)} flex items-center gap-1 text-xs`}>
                                  {getTypeIcon(material.type)}
                                  {material.type.toUpperCase()}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{material.fileSize}</span>
                              </div>
                              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                {material.title}
                              </CardTitle>
                              <CardDescription className="text-sm line-clamp-2">
                                {material.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {material.downloadCount.toLocaleString()} downloads
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewPDF(material.pdfFile)}
                                  className="flex-1 group-hover:border-primary/50"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleDownload(material.pdfFile, material.title)}
                                  className="flex-1"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Materials will be updated soon for this semester.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Need More Resources?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Contact us for specific study materials or suggest new content.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Request Materials
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;