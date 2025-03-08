import { useState } from 'react';
import { FileText, X, Upload } from 'lucide-react';

interface AssignmentSubmissionProps {
  onSubmit: (files: File[], comment: string) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
}

export function AssignmentSubmission({
  onSubmit,
  onCancel,
  isSubmitting = false,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024 // 10MB default
}: AssignmentSubmissionProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Handle file input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  // Process selected files
  const handleFiles = (newFiles: File[]) => {
    // Check file count limit
    if (files.length + newFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`);
      return;
    }
    
    // Check file size limit
    const oversizedFiles = newFiles.filter(file => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the maximum size of ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    // Add files
    setError(null);
    setFiles([...files, ...newFiles]);
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Please upload at least one file');
      return;
    }
    
    try {
      await onSubmit(files, comment);
    } catch (error: any) {
      setError('Failed to submit assignment: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* File upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Maximum {maxFiles} files, up to {maxFileSize / (1024 * 1024)}MB each
        </p>
        <input
          type="file"
          className="hidden"
          onChange={handleFileInput}
          multiple
          id="file-upload"
          disabled={isSubmitting}
        />
        <label
          htmlFor="file-upload"
          className="mt-4 inline-block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Select Files
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  disabled={isSubmitting}
                >
                  <X className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comment textarea */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Add any comments about your submission..."
          disabled={isSubmitting}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </div>
    </form>
  );
} 