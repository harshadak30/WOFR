// import React from 'react';
// import { motion } from 'framer-motion';

// interface CardProps {
//   title?: string;
//   subtitle?: string;
//   children: React.ReactNode;
//   footer?: React.ReactNode;
//   className?: string;
//   hover?: boolean;
//   animated?: boolean;
// }

// const Card: React.FC<CardProps> = ({
//   title,
//   subtitle,
//   children,
//   footer,
//   className = '',
//   hover = false,
//   animated = false,
// }) => {
//   const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden';
//   const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-md' : '';

//   const cardContent = (
//     <div className={`${baseClasses} ${hoverClasses} ${className}`}>
//       {(title || subtitle) && (
//         <div className="px-6 py-4 border-b border-gray-100">
//           {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
//           {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
//         </div>
//       )}
//       <div className="px-6 py-5">{children}</div>
//       {footer && (
//         <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">{footer}</div>
//       )}
//     </div>
//   );

//   if (animated) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         {cardContent}
//       </motion.div>
//     );
//   }

//   return cardContent;
// };

// export default Card;

import * as React from "react";
import { cn } from "../../../lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg  bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
