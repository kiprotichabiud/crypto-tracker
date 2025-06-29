import React from "react";
export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-lg  bg-gray-800 text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={`text-lg font-semibold font-primary leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}