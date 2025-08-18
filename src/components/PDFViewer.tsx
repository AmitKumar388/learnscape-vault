import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Document } from "./DocumentCard";

interface PDFViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (doc: Document) => void;
}

export const PDFViewer = ({ document, isOpen, onClose, onDownload }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!document) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] glass border-border/50 p-0">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-border/50 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                {document.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {document.category.toUpperCase()} • {document.fileSize}
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleZoomOut}
                className="glass-card hover:bg-primary/10"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-medium px-3 py-1 bg-muted rounded-md min-w-[60px] text-center">
                {zoom}%
              </span>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleZoomIn}
                className="glass-card hover:bg-primary/10"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRotate}
                className="glass-card hover:bg-primary/10"
              >
                <RotateCw className="w-4 h-4" />
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => onDownload(document)}
                className="bg-gradient-primary hover:scale-105 transition-transform text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* PDF Viewer Area */}
        <div className="flex-1 p-6 bg-muted/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-white rounded-lg shadow-card flex items-center justify-center"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: "transform 0.3s ease"
            }}
          >
            {/* PDF Preview Placeholder */}
            <div className="text-center p-8">
              <div className="w-24 h-32 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-white text-2xl font-bold">PDF</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {document.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                PDF viewer would be embedded here
              </p>
              <p className="text-xs text-gray-400">
                In a real implementation, you would use a library like react-pdf or pdf.js
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-gradient-card">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Page 1 of 1</span>
            <span>Last modified: {document.uploadDate}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};