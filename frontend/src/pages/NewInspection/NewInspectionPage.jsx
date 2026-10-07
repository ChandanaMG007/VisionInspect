import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  FileCheck,
  Loader2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import { SAMPLE_IMAGES } from '../../data/mockData';
import { submitInspection } from '../../services/api';

export default function NewInspectionPage({
  onInspectionCompleted,
  onCancel,
}) {
  const [productId, setProductId] = useState('MNT-9042');
  const [category, setCategory] = useState('Metal Nut');
  const [imagePreview, setImagePreview] = useState(SAMPLE_IMAGES.original);
  const [imageFile, setImageFile] = useState(null);
  const [imageDetails, setImageDetails] = useState({
    name: 'sample_product_image.png',
    size: '256 x 256 px',
    format: 'PNG',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    'Metal Nut',
    'Bottle',
    'Transistor (PCB)',
    'Tile',
    'Capsule',
    'Cable',
    'Screw',
    'Wood',
  ];

  // Handle File Upload / Drop
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, TIFF, or SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImageFile(file);
      setImageDetails({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        format: file.type || 'Standard Image',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Simple frontend demo behavior: short preparation delay, then shows result
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const payload = {
        productId: productId.trim() || 'PRD-001',
        category,
        imageUri: imagePreview,
        imageFile: imageFile,
      };

      const result = await submitInspection(payload);

      if (onInspectionCompleted) {
        onInspectionCompleted(result);
      }
    } catch (err) {
      console.error('Inspection error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentDateTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs">
        <h2 className="text-xl font-bold text-[#172A3A] tracking-tight">
          New Product Inspection
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Provide inspection information and upload a product image for visual defect analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Inspection Information (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider pb-2 border-b border-[#F1F5F9]">
              Inspection Information
            </h3>

            {/* Product ID */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                Product ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="e.g. MNT-9042"
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#176B68] focus:border-[#176B68]"
              />
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#176B68] focus:border-[#176B68]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Inspection Date / Time */}
            <div>
              <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                Inspection Date / Time
              </label>
              <div className="px-3 py-2 text-xs text-[#172A3A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-md">
                {currentDateTime}
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Area & Preview (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
                Product Image Upload
              </h3>
              <span className="text-xs text-[#64748B]">
                Supported: PNG, JPG, BMP
              </span>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                dragOver
                  ? 'border-[#176B68] bg-[#EBF7EE]/40'
                  : 'border-[#CBD5E1] hover:border-[#94A3B8] bg-[#F8FAFC]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#176B68] shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#172A3A]">
                  <span className="text-[#176B68] font-semibold underline underline-offset-2">
                    Click to browse
                  </span>{' '}
                  or drag and drop product image
                </div>
                <p className="text-[11px] text-[#64748B]">
                  PNG, JPG, BMP format supported
                </p>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="p-4 rounded-lg border border-[#E2E8F0] bg-[#1C1E22]">
                <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 mb-3 border-b border-[#2D333B]">
                  <span className="text-[11px] text-[#A7F3D0] flex items-center gap-1.5 font-medium">
                    <FileCheck className="w-3.5 h-3.5" />
                    IMAGE PREVIEW
                  </span>
                  <span className="text-[11px]">
                    {imageDetails.name} ({imageDetails.size})
                  </span>
                </div>

                <div className="flex justify-center">
                  <div className="w-60 h-60 rounded border border-[#475569] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                loading={isAnalyzing}
                disabled={isAnalyzing || !imagePreview}
                onClick={handleAnalyze}
                className="w-full py-3 text-sm font-semibold"
              >
                {isAnalyzing ? 'Preparing inspection result...' : 'Analyze Product Image'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
