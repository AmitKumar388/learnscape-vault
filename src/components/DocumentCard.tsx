import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  downloadCount: number;
  tags: string[];
  thumbnail?: string;
}

interface DocumentCardProps {
  document: Document;
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  index: number;
}

export const DocumentCard = ({ document, onView, onDownload, index }: DocumentCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      notes: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      pyqs: "bg-purple-500/10 text-purple-600 border-purple-500/20", 
      placement: "bg-green-500/10 text-green-600 border-green-500/20",
      resources: "bg-orange-500/10 text-orange-600 border-orange-500/20"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2 } 
      }}
      className="glass-card rounded-xl p-6 group cursor-pointer border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-glow">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <Badge className={getCategoryColor(document.category)}>
              {document.category.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="text-xs text-muted-foreground flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {document.uploadDate}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {document.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {document.description}
        </p>
      </div>

      {/* Tags */}
      {document.tags && document.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {document.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground"
            >
              <Tag className="w-2 h-2 mr-1" />
              {tag}
            </span>
          ))}
          {document.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{document.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>{document.fileSize}</span>
          <span>•</span>
          <span>{document.downloadCount} downloads</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onView(document);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(document);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};