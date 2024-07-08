import React from 'react';

type Props = JSX.IntrinsicElements["svg"];

export const IconFilter = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="18px"
        width="18px"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
      </svg>
    </div>
  );
};



export const IconTrash = (props: Props) => {
  return (
    <div>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-id="DeleteIcon"
        {...props}
      >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
      </svg>
    </div>
  );
};

export const IconEdit = (props: Props) => {
  return (
    <div>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-id="EditIcon"
        {...props}
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
      </svg>
    </div>
  );
};
