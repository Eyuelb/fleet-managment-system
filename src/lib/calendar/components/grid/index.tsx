import React, { HTMLAttributes, ReactNode } from "react";

type GridDataProps = {
  children: ReactNode;
  chunkSize: number;
  weekendIndices?: number[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

const GridData: React.FC<GridDataProps> = ({
  children,
  chunkSize,
  weekendIndices = [0, 6],
  ...props
}) => {
  // Split children into chunks of specified size
  const chunks: ReactNode[][] = [];
  let chunk: ReactNode[] = [];
  React.Children.forEach(children, (child, index) => {
    if (index > 0 && index % chunkSize === 0) {
      chunks.push(chunk);
      chunk = [];
    }
    chunk.push(child);
  });
  if (chunk.length > 0) {
    chunks.push(chunk);
  }

  // Calculate grid-template-columns value
  const columnWidth = `minmax(0, 1fr)`;
  const gridTemplateColumns = `repeat(${chunkSize}, ${columnWidth})`;
  const isWeekend = (index:number) => {
    return weekendIndices.includes(index % 7);
  };
  // Map over the chunks and wrap each chunk in a div
  return (
    <div {...props}>
      {chunks.map((chunk, index) => (
        <div key={index} className="grid" style={{ gridTemplateColumns }}>
          {chunk.map((child, childIndex) => (
            <div
              key={childIndex}
              className={
                isWeekend(childIndex) ? "text-red-600" : ""
              }
            >
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridData;
