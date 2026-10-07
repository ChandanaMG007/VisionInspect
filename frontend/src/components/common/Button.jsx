import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#172A3A] hover:bg-[#203A4F] text-white border border-[#172A3A] shadow-xs focus:ring-[#172A3A]',
    secondary:
      'bg-[#176B68] hover:bg-[#1E7D7A] text-white border border-[#176B68] shadow-xs focus:ring-[#176B68]',
    outline:
      'bg-white hover:bg-[#F8FAFC] text-[#172A3A] border border-[#CBD5E1] shadow-xs focus:ring-[#64748B]',
    subtle:
      'bg-[#EDF2F7] hover:bg-[#E2E8F0] text-[#172A3A] border border-[#E2E8F0] focus:ring-[#94A3B8]',
    danger:
      'bg-[#B91C1C] hover:bg-[#991B1B] text-white border border-[#B91C1C] shadow-xs focus:ring-[#B91C1C]',
    ghost:
      'bg-transparent hover:bg-[#EDF2F7] text-[#475569] hover:text-[#172A3A] focus:ring-[#94A3B8]',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
