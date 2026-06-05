import { UIProps } from "@/type/type";
import React from "react";

const FlexBox = ({ children, className = "", style, onClick }: UIProps) => {
  return (
    <div className={`flex border rounded-lg bg-white p-4 ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

const HStack = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`flex items-center flex-wrap ${className}`} style={style}>
      {children}
    </div>
  );
};

const Flex = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`flex items-center ${className}`} style={style}>
      {children}
    </div>
  );
};


const FlexCol = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`flex flex-col ${className}`} style={style}>
      {children}
    </div>
  );
};


const Grid = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`grid ${className}`} style={style}>
      {children}
    </div>
  );
};

const GridItem = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`grid border rounded-lg p-4 bg-white ${className}`} style={style}>
      {children}
    </div>
  );
};

export { FlexBox, HStack, Flex, Grid, FlexCol, GridItem };
