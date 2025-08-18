import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Document } from "./DocumentCard";

interface PDFViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (doc: Document) => void;
}

// Set worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PDFViewer = ({ document, isOpen, onClose, onDownload }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  if (!document) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  
  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

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
        <div className="flex-1 p-6 bg-muted/20 overflow-auto">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="glass-card"
            >
              Previous
            </Button>
            <span className="text-sm font-medium">
              {pageNumber} / {numPages || 1}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1)}
              className="glass-card"
            >
              Next
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: "transform 0.3s ease"
            }}
          >
            <PDFDocument
              file={`/sample.pdf`} // Sample PDF for demo
              onLoadSuccess={onDocumentLoadSuccess}
              className="border rounded-lg shadow-card"
            >
              <Page 
                pageNumber={pageNumber} 
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="max-w-full"
              />
            </PDFDocument>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-gradient-card">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Page {pageNumber} of {numPages || 1}</span>
            <span>Last modified: {document.uploadDate}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};