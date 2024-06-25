import React from "react";

// Interface for Button props
export interface ButtonProps {
  children?: React.ReactNode; // The content of the button
  onClick?: () => void; // Function to handle button click
  disabled?: boolean; // Disables the button if true
  type?: 'button' | 'submit' | 'reset'; // Button type (default is "button")
  size?: 'small' | 'medium' | 'large'; // Button size
  isLoading?: boolean; // Shows a loading indicator if true
  leftIcon?: React.ReactNode; // Optional icon to display on the left
  rightIcon?: React.ReactNode; // Optional icon to display on the right
  className?: string; // Optional additional CSS class
  hidden?: boolean; //
  bg?:string; 
  color?: string;
  style?: React.CSSProperties | undefined
}
