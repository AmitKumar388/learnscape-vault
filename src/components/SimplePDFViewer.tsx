import { useState } from "react";
import { motion } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.min?url";

interface SimplePDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

// Try to avoid CORS issues by using a CDN version that supports CORS
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const SimplePDFViewer = ({ pdfUrl, onClose }: SimplePDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
  };
  
  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] glass border-border/50 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogDescription>PDF Document Viewer with zoom and navigation controls</DialogDescription>
        </DialogHeader>
        {/* Header */}
        <div className="p-6 border-b border-border/50 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Document Viewer</h2>
              <p className="text-sm text-muted-foreground mt-1">PDF Document</p>
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
                onClick={handleDownload}
                className="bg-gradient-primary hover:scale-105 transition-transform text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="glass-card hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Viewer Area */}
        <div className="flex-1 p-6 bg-muted/20 overflow-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-destructive mb-2">Failed to load PDF</p>
                <p className="text-muted-foreground text-sm">{error}</p>
                <Button onClick={onClose} className="mt-4">Close</Button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="glass-card"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
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
                  <ChevronRight className="w-4 h-4 ml-1" />
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
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
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
            </>
          )}
        </div>

        {/* Footer */}
        {!isLoading && !error && (
          <div className="p-4 border-t border-border/50 bg-gradient-card">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Page {pageNumber} of {numPages || 1}</span>
              <span>PDF Document Viewer</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};